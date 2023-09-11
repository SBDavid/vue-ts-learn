<template>
  <Child name="c1"></Child>
  <Child name="c2">
    <div>test slot</div>
  </Child>
  <div>c3</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, Fragment, type VNode,  } from 'vue'
import Child from './021_travel_vue_tree_child.vue'
export default defineComponent({
  name: '021_travel_vue_tree',
  setup: (_, { expose }) => {
    onMounted(() => {
      console.info('mounted 021_travel_vue_tree')
      const ins = getCurrentInstance()
      console.info(ins)

      // 查找第一个孩子
      if (ins?.subTree.children) {
        const comp = (ins.subTree.children as Array<VNode>)[0].component
        
        console.info(comp?.exposed)
        comp?.exposed?.add()
      }
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