<script lang="ts" setup>
  import { onMounted } from 'vue';

  const props = defineProps<{
    id: number
    title: string
    giveANum: number
  }>()

  // 9. 测试发送事件
  const emit = defineEmits(['enlarge-text'])

  // 10. 传递数字
  onMounted(() => {
    console.info("typeof giveANum", typeof props.giveANum)
  })
</script>

<template>
  <div>
    {{props.id}} - {{props.title}} 
    <button @click="emit('enlarge-text')">Enlarge text</button>
  </div>
</template>