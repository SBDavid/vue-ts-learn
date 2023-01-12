<template>
  <div @click="onClick">click me</div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['test'])
function onClick() {
  console.info('click for 004_inheritAttrs_comp')
  emit('test')
}
</script>

<script lang="ts">
// inheritAttrs=true ,会透传父级的事件，同时内部的事件绑定也会响应
// inheritAttrs=false，不透传父级的事件，也就不相应父级事件
export default {
  inheritAttrs: true
}
</script>