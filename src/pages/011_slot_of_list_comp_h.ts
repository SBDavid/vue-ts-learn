import { defineComponent, h } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';

export default defineComponent({
  setup(props, { slots }) {
    return () => {
      const slides = []
      for(let i=1; i<4; i++) {
        // @ts-ignore
        slides.push(h(SwiperSlide, null, slots[`item${i}`]()))
      }
      // @ts-ignore
      return h(Swiper, null, slides)
    }
  }
})

