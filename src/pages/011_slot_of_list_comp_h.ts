import { defineComponent, h } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';

export default defineComponent({
  setup(props, { slots }) {
    return () => {
      return h(Swiper, null, {
        // @ts-ignore
        default: () => {
          const slides = []
          for(let i=1; i<4; i++) {
            // @ts-ignore
            slides.push(h(SwiperSlide, null, slots[`item${i}`]()))
          }
          return slides
        }
      })
    }
  }
})

