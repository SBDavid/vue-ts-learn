<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
// 通过 defineExpose 导出ref
defineExpose({inputRef})

onMounted(() => {
  // inputRef.value?.focus()
})

</script>

<template>
  <input ref="inputRef" />
</template>