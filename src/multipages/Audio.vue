<template>
  <div style="position: fixed; top: 100px; right: 0; background-color: khaki;">
    <p>audio</p>
    <div @click="push && push(0)">打开第一页</div>
    <div @click="push && push(1)">打开第二页</div>
    <div @click="push && push(2)">打开第三页</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Audio',
  props: {
    push: Function,
    goBack: Function
  },

})
</script>