<template>
  <swiper class="fs" direction="vertical">
    <SwiperSlide v-for="index of Array.from(Array(slideComponentAmount).keys())">
      <slot :name="'slider'+(index)"></slot>
    </SwiperSlide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default defineComponent({
  props: {
    slideComponentAmount: {
      type: Number
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
})
</script>

<style>
.fs {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 0;
}
</style>