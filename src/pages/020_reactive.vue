<template>
  {{ refValue }}
  testInRefValue2: {{ testInRefValue2 }}
  refValueChangeValueInFun: {{ refValueChangeValueInFun }}
</template>
<script>
import { defineComponent, ref, toDisplayString } from 'vue'
export default defineComponent({
  setup: () => {
    const refValue = ref({})
    const refValue2 = ref({test: 1})
    const { test: testInRefValue2 } = refValue2.value
    const refValueChangeValueInFun = ref({test: {
      test: 1
    }})

    const inner = ref({inner: 1})
    const outter = ref({inner, array: [inner]})

    function change(test) {
      test.test++
    }

    setTimeout(() => {
      refValue.value.test = 1
      let test = refValue.value.test
      refValue.value.test++
      refValue2.value.test++
      change(refValueChangeValueInFun.value.test)

      console.info(outter.value.inner.inner)
      console.info(outter.value.array[0].value.inner)
    })




    return {
      refValue,
      testInRefValue2,
      refValueChangeValueInFun
    }
  }
})


</script>

<style>

</style>