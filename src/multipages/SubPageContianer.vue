<template>
  <div><slot></slot></div>
  
</template>

<script lang="ts">
import { defineComponent, ref, onActivated, onDeactivated, type Ref, onMounted} from 'vue'
import { useSwiper, useSwiperSlide } from 'swiper/vue'
export default defineComponent({
  props: {
    name: {
      type: String
    },
    isInSwiper: {
      type: Boolean
    },
    swiperIndex: {
      type: Number
    }
  },
  setup: (props) => {
    const isVueActive = ref(false)
    const isSwiperActive = ref(false)
    const isPreActive: Ref<boolean|undefined> = ref(undefined)
    const activeCount = ref(0)

    let swiper: ReturnType<typeof useSwiper> | undefined = undefined
    let swiperSlider: ReturnType<typeof useSwiperSlide> | undefined = undefined
    if (props.isInSwiper) {
      swiper = useSwiper()
      swiperSlider = useSwiperSlide()
    } else {
      isSwiperActive.value = true
    }

    const isActive = (tag: string) => {
      const current = isVueActive.value && isSwiperActive.value
      if (isPreActive.value !== current) {
        isPreActive.value = current
        if (current) {
          activeCount.value++
        }
        console.info(`SubPageContainer is active ${props.name}, ${current}, count: ${activeCount.value}`)
      }
      
    }

    if (swiper) {
      swiper.value.on('slideChange', s => {
        // console.info('SubPageContainer slideChange isActive', s.activeIndex === props.swiperIndex)
        isSwiperActive.value = s.activeIndex === props.swiperIndex
        isActive('1')
      })
    }

    onMounted(() => {
      isVueActive.value = true
      // console.info(`SubPageContainer onMounted: ${props.name}`)
      // swiper && console.info(swiper.value.activeIndex)

      if (swiper) {
        if (swiper.value.activeIndex === props.swiperIndex) {
          // console.info(`SubPageContainer onMounted swiperSlider isActive ${props.name} : true`)
          isSwiperActive.value = true
        }
      }

      isActive('2')
    })

    onActivated(() => {
      isVueActive.value = true
      // console.info(`SubPageContainer onActivated: ${props.name}`)

      isActive('3')
    })

    onDeactivated(() => {
      isVueActive.value = false
      // console.info(`SubPageContainer onDeactivated: ${props.name}`)

      isActive('4')
    })

    // return () => {
    //   return () => {
    //     return h()
    //   }
    // }
  }
})
</script>