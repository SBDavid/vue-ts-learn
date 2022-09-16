import { defineComponent } from 'vue'

import { useCountStore } from '../store/defineCountStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'testPinia',
  setup() {

    const countStore = useCountStore();
    const countStoreRef = storeToRefs(countStore)

    return () => {
      return (<>
        <p>testPinia</p>
        <p>store.count {countStoreRef.count.value}</p>
        <p>store.count {countStoreRef.doubleCount.value}</p>
        <button onClick={() => {
          countStore.increment()
        }}>increment</button>
      </>)
    }
  }
})