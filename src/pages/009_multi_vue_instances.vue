<template>
  <div id="multi-vue"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, createApp } from 'vue'
import InnerComp from './009_multi_vue_instances_inner_comp.vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      console.info('onMounted 009_multi_vue_instances.vue')

      const app = createApp(InnerComp)

      app.mount('#multi-vue')
    })
  }
})
</script>