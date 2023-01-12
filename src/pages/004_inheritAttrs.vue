<template>
  <Middle @click="onClick" @test="onTest"></Middle>
</template>

<script lang="ts" setup>
import Middle from './004_inheritAttrsCompMiddle.vue'

function onClick() {
  console.info('click for 004_inheritAttrs')
}
function onTest() {
  console.info('click for 004_inheritAttrs test')
}
</script>