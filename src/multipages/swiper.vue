<template>
  <swiper class="fs" 
  :direction="direction" 
  :virtual="false" 
  :modules="[Virtual, Controller]" 
  :effect="effect"
  @swiper="setControlledSwiper" 
  @afterInit="setSwiper">
    <SwiperSlide 
      v-for="index of Array.from(Array(slideComponentAmount).keys())"
      :key="index"
      :virtualIndex="index">
      <slot :name="'slider'+(index)"></slot>
    </SwiperSlide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, type Ref } from 'vue'
import { Virtual, Controller, type Swiper as SwiperType } from 'swiper'
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
    const controlledSwiper: Ref<SwiperType|undefined> = ref();
    const setControlledSwiper = (swiper: SwiperType) => {
      controlledSwiper.value = swiper;
    };
    const effect = ref('slide')

    const setSwiper = (swiper: SwiperType) => {
      // swiper.allowSlideNext = true
      // swiper.allowSlidePrev = true
      swiper.allowTouchMove = true


      setTimeout(() => {
        // effect.value = 'slide'
        swiper.slideTo(2, 0)
      }, 2000);
    }

    return {
      Virtual,
      Controller,
      effect,
      setSwiper,
      setControlledSwiper,
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