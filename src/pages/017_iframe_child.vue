<template>
  <div>IFrame test child</div>
</template>

<script lang="ts" setup>

// @ts-ignore
console.info((window.top))

try {
  const test = window?.top?.alert
} catch (e) {
  console.info(e)
}
// console.info(test?.location.pathname)


</script>

<style scoped>
</style>
