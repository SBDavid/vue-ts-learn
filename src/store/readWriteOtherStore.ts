import { defineStore, storeToRefs } from 'pinia'
import { useCountStore } from './defineCountStore'

export const readWriteOtherStore = defineStore('readWriteOtherStore', () => {
  
  const countStore = useCountStore()

  const {count, doubleCount, name} = storeToRefs(countStore)

  function increment() {
    countStore.increment()
  }

  return { count, name, doubleCount, increment }
})