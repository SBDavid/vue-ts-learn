<template>
  <Child name="c1"></Child>
  <Child name="c2"></Child>
  <div>c3</div>
</template>
<script>
import { defineComponent, onMounted, getCurrentInstance } from 'vue'
import Child from './021_travel_vue_tree_child.vue'
export default defineComponent({
  name: '021_travel_vue_tree',
  setup: (_, { expose }) => {
    onMounted(() => {
      const ins = getCurrentInstance()
      console.info(ins)
    })
    expose({
      'ExposeFrom021_travel_vue_tree': 1
    })
    return {
      
    }
  },
  components: {
    Child
  }
})


</script>

<style>

</style>