<template>
  <div>放置 swiper slot</div>
  <swiper>
    <slot></slot>
  </swiper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Swiper } from 'swiper/vue';

export default defineComponent({
  setup() {

  },
  components: {
    swiper: Swiper
  }
})
</script>
