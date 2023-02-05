<template>
  {{ store.count }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { defineStore } from '../globalState/index1'

const useStore = defineStore('testStore', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})

export default defineComponent({
  mounted() {
    const store = useStore()
    store.increment()
  },
  setup() {

    const store = useStore()

    return {
      // @ts-ignore
      store: store
    }
  }
})
</script>