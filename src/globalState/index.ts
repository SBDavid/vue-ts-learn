import { inject, ref } from 'vue'
import type { App, Ref } from 'vue'

export type StateTree = Record<string | number | symbol, any>
export type GlobalState = Ref<Record<string, StateTree>>
export const globalSymbol = Symbol.for('globalSymbol')

export function createGlobalStore() {
  const state: GlobalState = ref({})

  const globalStoreInstance = {
    install(app: App) {
      console.info('install globalStore')
      app.provide(globalSymbol, globalStoreInstance)
      app.config.globalProperties.$globalStore = globalStoreInstance
    },
    state

  }

  return globalStoreInstance
}

export type DefineStoreOption = {
  state: any
  actions: Record<string, Function>
}

export function defineStore(id: string, option: DefineStoreOption) {
  const globalStore: ReturnType<typeof createGlobalStore>|undefined = inject(globalSymbol)
  if (!globalStore) {
    throw Error('需要安装 globalStore 插件')
  }

  if (globalStore.state.value[id]) {
    console.warn(`store ${id} 已经被定义`)
  } else {
    console.log(`defineStore ${id}`)
  }

  const state = ref(option.state)
  const actions: Record<string, Function> = {}
  Object.keys(option.actions).forEach(key => {
    actions[key] = option.actions[key].bind(state)
  })

  const store = {
    state,
    actions
  }

  globalStore.state.value[id] = store
}

export function useState() {
  
}