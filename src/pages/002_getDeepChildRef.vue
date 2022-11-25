<script lang="ts" setup>
  import { ref, onMounted, type Ref } from 'vue'
  import Comp from './002_getDeepChildRefChild.vue'

  const msg = ref('Hello World!')
  const blockRef = ref<{inputRef: Ref<HTMLInputElement>}|null>(null);

  onMounted(() => {
    blockRef.value?.inputRef.focus()
  })
</script>

<template>
  <h1>{{ msg }}</h1>
  <Comp ref="blockRef" />
</template>