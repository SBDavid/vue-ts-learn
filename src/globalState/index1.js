import { effectScope, markRaw, getCurrentInstance, inject,
isRef, isReactive, nextTick, ref, reactive, toRaw } from 'vue'

const __DEV__ = true

/**
 * Possible types for SubscriptionCallback
 */
export const MutationType = {
  /**
   * Direct mutation of the state:
   *
   * - `store.name = 'new name'`
   * - `store.$state.name = 'new name'`
   * - `store.list.push('new item')`
   */
  direct:'direct',

  /**
   * Mutated the state with `$patch` and an object
   *
   * - `store.$patch({ name: 'newName' })`
   */
  patchObject:'patch object',

  /**
   * Mutated the state with `$patch` and a function
   *
   * - `store.$patch(state => state.name = 'newName')`
   */
  patchFunction:'patch function',

  // maybe reset? for $state = {} and $reset
}

function isPlainObject(o) {
  return (
    o &&
    typeof o === 'object' &&
    Object.prototype.toString.call(o) === '[object Object]' &&
    typeof o.toJSON !== 'function'
  )
}

function mergeReactiveObjects(target, patchToApply) {
  // Handle Map instances
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value))
  }
  // Handle Set instances
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target)
  }

  // no need to go through symbols because they cannot be serialized anyway
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key)) continue
    const subPatch = patchToApply[key]
    const targetValue = target[key]
    if (
      isPlainObject(targetValue) &&
      isPlainObject(subPatch) &&
      target.hasOwnProperty(key) &&
      !isRef(subPatch) &&
      !isReactive(subPatch)
    ) {
      // NOTE: here I wanted to warn about inconsistent types but it's not possible because in setup stores one might
      // start the value of a property as a certain type e.g. a Map, and then for some reason, during SSR, change that
      // to `undefined`. When trying to hydrate, we want to override the Map with `undefined`.
      target[key] = mergeReactiveObjects(targetValue, subPatch)
    } else {
      // @ts-expect-error: subPatch is a valid value
      target[key] = subPatch
    }
  }

  return target
}

export const piniaSymbol = Symbol()
export let activePinia
export const setActivePinia = (pinia) => {
  activePinia = pinia
}
export const getActivePinia = () => {
  (getCurrentInstance() && inject(piniaSymbol)) || activePinia
}

// 创建实例并绑定到app
export function createPinia() {
  const scope = effectScope()

  const state = scope.run(() => ref({}))

  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia)
      pinia._a = app
      app.provide(piniaSymbol, pinia)
      app.config.globalProperties.$pinia = pinia
    },
    _a: null,
    _e: scope,
    _s: new Map(),
    state,
  })

  return pinia
}

// store
const skipHydrateSymbol = __DEV__
  ? Symbol('pinia:skipHydration')
  : /* istanbul ignore next */ Symbol()
const skipHydrateMap = /*#__PURE__*/ new WeakMap()
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol)
}

/**
 * Tells Pinia to skip the hydration process of a given object. This is useful in setup stores (only) when you return a
 * stateful object in the store but it isn't really state. e.g. returning a router instance in a setup store.
 *
 * @param obj - target object
 * @returns obj
 */
export function skipHydrate(obj) {
  return Object.defineProperty(obj, skipHydrateSymbol, {})
}

const { assign } = Object
function isComputed(o) {
  return !!(isRef(o) && o.effect)
}

function createSetupStore($id, setup, options, pinia, hot, isOptionsStore) {
  let scope

  if (__DEV__ && !pinia._e.active) {
    throw new Error('Pinia destroyed')
  }

  // watcher options for $subscribe
  const $subscribeOptions = {
    deep: true,
    // flush: 'post',
  }

  // internal state
  let isListening // set to true at the end
  let isSyncListening // set to true at the end
  let subscriptions = markRaw([])
  let actionSubscriptions = markRaw([])
  let debuggerEvents
  const initialState = pinia.state.value[$id]

  if (!initialState) {
    pinia.state.value[$id] = {}
  }

  // avoid triggering too many listeners
  let activeListener

  function $patch(partialStateOrMutator) {
    let subscriptionMutation
    isListening = isSyncListening = false

    if (__DEV__) {
      debuggerEvents = []
    }

    if (typeof partialStateOrMutator === 'function') {
      partialStateOrMutator(pinia.state.value[$id])
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents,
      }
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator)
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents,
      }
    }

    const myListenerId = (activeListener = Symbol())
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true
      }
    })
    isSyncListening = true

    // because we paused the watcher, we need to manually call the subscriptions
    triggerSubscriptions(
      subscriptions,
      subscriptionMutation,
      pinia.state.value[$id]
    )


  }

  const $reset = __DEV__
    ? () => {
        throw new Error(
          `🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`
        )
      }
    : noop

  function $dispose() {
    scope.stop()
    subscriptions = []
    actionSubscriptions = []
    pinia._s.get($id).$loadState = 'disposed'
    pinia._s.delete($id)
  }

  function wrapAction(name, action) {
    return function () {
      setActivePinia(pinia)
      const args = Array.from(arguments)

      const afterCallbackList = []
      const onErrorCallbackList = []
      function after(callback) {
        afterCallbackList.push(callback)
      }
      function onError(callback) {
        onErrorCallbackList.push(callback)
      }

      // @ts-expect-error
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError,
      })

      let ret
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args)
        // handle sync errors
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error)
        throw error
      }

      if (ret instanceof Promise) {
        return ret
          .then((value) => {
            triggerSubscriptions(afterCallbackList, value)
            return value
          })
          .catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error)
            return Promise.reject(error)
          })
      }

      // allow the afterCallback to override the return value
      triggerSubscriptions(afterCallbackList, ret)
      return ret
    }
  }

  let partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $loadState: ref('created'),
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options = {}) {
      const removeSubscription = addSubscription(
        subscriptions,
        callback,
        options.detached,
        () => stopWatcher()
      )
      const stopWatcher = scope.run(() =>
        watch(
          () => pinia.state.value[$id],
          (state) => {
            if (options.flush === 'sync' ? isSyncListening : isListening) {
              callback(
                {
                  storeId: $id,
                  type: MutationType.direct,
                  events: debuggerEvents,
                },
                state
              )
            }
          },
          assign({}, $subscribeOptions, options)
        )
      )

      return removeSubscription
    },
    $dispose,
  }

  if (pinia._s.has($id)) {
    const undefinedStore = pinia._s.get($id)
    undefinedStore.$loadState = 'created'
    undefinedStore._p = pinia
    undefinedStore.$onAction = addSubscription.bind(null, actionSubscriptions)
    undefinedStore.$patch = $patch
    undefinedStore.$reset = $reset
    undefinedStore.$subscribe = partialStore.$subscribe
    undefinedStore.$dispose = $dispose

    partialStore = undefinedStore
  }

  const store = reactive(partialStore)

  // store the partial store now so the setup of stores can instantiate each other before they are finished without
  // creating infinite loops.
  pinia._s.set($id, store)

  // 初始化成功回调
  const onLoaded = () => {
    pinia._s.get($id).$loadState = 'loaded'
  }

  // TODO: idea create skipSerialize that marks properties as non serializable and they are skipped
  const setupStore = pinia._e.run(() => {
    scope = effectScope()
    return scope.run(() => setup(onLoaded))
  })

  // overwrite existing actions to support $onAction
  for (const key in setupStore) {
    const prop = setupStore[key]

    if ((isRef(prop) && !isComputed(prop)) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key]
          } else {
            // probably a reactive object, lets recursively assign
            // @ts-expect-error: prop is unknown
            mergeReactiveObjects(prop, initialState[key])
          }
        }
      }
      pinia.state.value[$id][key] = prop
    } else if (typeof prop === 'function') {
      const actionValue = __DEV__ && hot ? prop : wrapAction(key, prop)
      setupStore[key] = actionValue
    }
  }

  assign(store, setupStore)
  // allows retrieving reactive objects with `storeToRefs()`. Must be called after assigning to the reactive object.
  // Make `storeToRefs()` work with `reactive()` #799
  assign(toRaw(store), setupStore)

  // use this instead of a computed with setter to be able to create it anywhere
  // without linking the computed lifespan to wherever the store is first
  // created.
  Object.defineProperty(store, '$state', {
    get: () => (__DEV__ && hot ? hotState.value : pinia.state.value[$id]),
    set: (state) => {
      /* istanbul ignore if */
      if (__DEV__ && hot) {
        throw new Error('cannot set hotState')
      }
      $patch(($state) => {
        assign($state, state)
      })
    },
  })

  if (
    __DEV__ &&
    store.$state &&
    typeof store.$state === 'object' &&
    typeof store.$state.constructor === 'function' &&
    !store.$state.constructor.toString().includes('[native code]')
  ) {
    console.warn(
      `[🍍]: The "state" must be a plain object. It cannot be\n` +
        `\tstate: () => new MyClass()\n` +
        `Found in store "${store.$id}".`
    )
  }

  isListening = true
  isSyncListening = true
  return store
}

function createUndefinedStore($id, pinia) {
  const undefinedStore = reactive({
    $id,
    $loadState: 'undefined',
  })

  pinia._s.set($id, undefinedStore)

  return undefinedStore
}

export function defineStore(id, setup, setupOptions) {

  function useStore(pinia) {
    const currentInstance = getCurrentInstance()
    pinia = (currentInstance && inject(piniaSymbol, null))
    if (pinia) setActivePinia(pinia)

    if (__DEV__ && !activePinia) {
      throw new Error(
        `[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?\n` +
          `\tconst pinia = createPinia()\n` +
          `\tapp.use(pinia)\n` +
          `This will fail in production.`
      )
    }

    pinia = activePinia

    if (!pinia._s.has(id) || pinia._s.get(id).$loadState === 'undefined') {
      createSetupStore(id, setup, setupOptions, pinia)
      if (__DEV__) {
        useStore._pinia = pinia
      }
    }

    const store = pinia._s.get(id)

    return store
  }

  useStore.$id = id
  return useStore
}

export function useStore(id) {
  const currentInstance = getCurrentInstance()
  const pinia = (currentInstance && inject(piniaSymbol, null))

  if (__DEV__ && !activePinia) {
    throw new Error(
      `[🍍]: useStore(id) was called with no active Pinia. Did you forget to install pinia?\n` +
        `\tconst pinia = createPinia()\n` +
        `\tapp.use(pinia)\n` +
        `This will fail in production.`
    )
  }

  if (!pinia._s.has(id)) {
    createUndefinedStore(id, pinia)
    if (__DEV__) {
      useStore._pinia = pinia
    }
  }

  const store = pinia._s.get(id)

  return store
}

// subscriptions
export const noop = () => {}

export function addSubscription(
  subscriptions,
  callback,
  detached,
  onCleanup = noop
) {
  subscriptions.push(callback)

  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback)
    if (idx > -1) {
      subscriptions.splice(idx, 1)
      onCleanup()
    }
  }

  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription)
  }

  return removeSubscription
}

export function triggerSubscriptions(
  subscriptions,
  ...args
) {
  subscriptions.slice().forEach((callback) => {
    callback(...args)
  })
}
