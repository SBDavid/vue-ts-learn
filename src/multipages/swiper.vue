<template>
  <swiper class="fs" :direction="direction" :virtual="false" :modules="[Virtual]">
    <SwiperSlide 
      v-for="index of Array.from(Array(slideComponentAmount).keys())"
      :key="index"
      :virtualIndex="index">
      <slot :name="'slider'+(index)"></slot>
    </SwiperSlide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default defineComponent({
  props: {
    slideComponentAmount: {
      type: Number
    },
    direction: {
      type: String as PropType<'horizontal'|'vertical'>
    }
  },
  setup: () => {
    return {
      Virtual
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