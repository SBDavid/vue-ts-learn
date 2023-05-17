<template>
  <div>测试数组形式的slot</div>
  <comp>
    <swiperSlide>111</swiperSlide>
    <swiperSlide>222</swiperSlide>
    <swiperSlide>333</swiperSlide>
  </comp>
  <div>动态生成slot的名称</div>
  <compH>
    <template v-for="i in amount" #[`item${i}`] >
        <h1>{{i}}</h1>
    </template>
  </compH>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import comp from './011_slot_of_list_comp.vue'
import compH from './011_slot_of_list_comp_h'

export default defineComponent({
  setup() {
    const amount = ref([1,2,3])

    setTimeout(() => {
      // amount.value.push(4)
      // console.info('amount', amount)
    }, 100)

    return {
      amount
    }
  },
  components: {
    comp,
    compH,
    swiperSlide: SwiperSlide
  }
})
</script>
