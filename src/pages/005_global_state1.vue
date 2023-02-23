<template>
  {{ store.$loadState }}
  <template v-if="store.$loadState === 'created'">
    created: {{ store.count }}
  </template>
  <template v-if="store.$loadState === 'loaded'">
    loaded: {{ store.count }}
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { defineStore, useStore } from '../globalState/index1'

const useTestStore = defineStore('testStore', (onLoaded: () => void) => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  increment()
  onLoaded()

  return { count, increment }
})

export default defineComponent({
  mounted() {
    const store = useStore('testStore')
    watch(store, () => {
      console.info('watch store mounted', store)
    })
  },
  setup() {
    const store = useStore('testStore')

    const cancel = watch(store, () => {
      console.info('watch store setup', store)
      if (store.$loadState === 'loaded') {
        cancel()
        store.increment()
      }
    })

    const testSotre = useTestStore()

    return {
      // @ts-ignore
      store: store
    }
  }
})
</script>