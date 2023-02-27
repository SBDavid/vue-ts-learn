<template>
  <div v-if="loading">loading</div>
  <slot name="floors" v-if="!loading"></slot>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import OptionApi from './007_extend_vue_api_option.vue'

export default defineComponent({
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  },
  setup() {
    console.info('OptionApi', OptionApi.asyncData())
    const loading = ref(true)
    return {
      loading
    }
  }
})
</script>