<template>
  <div>
    <h2>provider</h2>
    <Suspense>
        <ShareIdInject mid="111"></ShareIdInject>
    </Suspense>

  </div>
</template>

<script lang="ts" setup>
import ShareIdInject from './016_share_id_inject.vue'
import { provide } from 'vue'

provide('mid', '1233')

</script>

<style scoped>

</style>
