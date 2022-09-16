import { defineComponent, ref, watch, watchEffect } from 'vue'

export default defineComponent({
  setup() {

    const count = ref(0)
    const anotherCount = ref(0)

    watch(count, (val, oldVal, onCleanup) => {
      console.info('watch count', val, oldVal);
      onCleanup(() => {
        console.info('watch count onCleanup', val, oldVal);
      })
    })

    watchEffect((onCleanup) => {
      console.info('watchEffect count', anotherCount.value);
      onCleanup(() => {
        console.info('watchEffect count onCleanup', anotherCount.value);
      })
    })

    return () => {
      return (<div>
        <span>010_watchVsWatchEffect: {count.value}</span>
        <button
          style={{float: 'right'}}
          onClick={() => {
            count.value += 1
          }}
          >add</button>
      </div>)
    }
  }
})