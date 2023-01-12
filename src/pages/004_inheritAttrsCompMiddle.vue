<template>
  <Comp @test="onTest" />
</template>

<script lang="ts" setup>
import Comp from './004_inheritAttrsComp.vue'
function onTest() {
  console.info('click for 004_inheritAttrsCompMiddle test')
}
</script>

<script lang="ts">
export default {
  inheritAttrs: true
}
</script>