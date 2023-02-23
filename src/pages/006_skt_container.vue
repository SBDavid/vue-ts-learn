<template>
  <div v-if="loading">loading</div>
  <slot name="floors" v-if="!loading"></slot>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  },
  setup() {
    const loading = ref(true)
    return {
      loading
    }
  }
})
</script>