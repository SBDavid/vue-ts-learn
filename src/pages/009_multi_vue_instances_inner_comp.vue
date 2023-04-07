<template>
  <div>我是第二个vue实例所渲染的组件</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.info('onMounted 009_multi_vue_instances_inner_comp')
    })
  }
})
</script>