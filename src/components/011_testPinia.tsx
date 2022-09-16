import { defineComponent } from 'vue'

import { useCountStore } from '../store/defineCountStore'
import { readWriteOtherStore } from '@/store/readWriteOtherStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'testPinia',
  setup() {

    const countStore = useCountStore();
    const countStoreRef = storeToRefs(countStore)

    const otherCountStore = readWriteOtherStore();
    const otherCountStoreRef = storeToRefs(otherCountStore)

    return () => {
      return (<>
        <p>testPinia</p>
        <p>store.count {countStoreRef.count.value} other: {otherCountStoreRef.count.value}</p>
        <p>store.count {countStoreRef.doubleCount.value} other: {otherCountStoreRef.doubleCount.value}</p>
        <button onClick={() => {
          countStore.increment()
        }}>increment</button>
        <button onClick={() => {
          otherCountStore.increment()
        }}>incrementOther</button>
      </>)
    }
  }
})