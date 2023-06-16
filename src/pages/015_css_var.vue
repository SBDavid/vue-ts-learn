<template>
  <div>123</div>
</template>

<script lang="ts" setup>
const root = document.documentElement;
root.style.setProperty('--blue', '#3f1a6a');
root.style.setProperty('--second-color', 'blue');
</script>

<style scoped>

  :root {
    --blue: #9fea26;
  }

  div{
    --blue: #1e90ff;

    color: var(--blue);
  }
</style>