<template>
  <div>测试数组形式的slot</div>
  <comp>
    <swiperSlide>111</swiperSlide>
    <swiperSlide>222</swiperSlide>
    <swiperSlide>333</swiperSlide>
  </comp>
  <div>动态生成slot的名称</div>
  <compH>
    <template #item1>
      <h1>111</h1>
    </template>
    <template #item2>
      <h1>222</h1>
    </template>
    <template #item3>
      <h1>333</h1>
    </template>
  </compH>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import comp from './011_slot_of_list_comp.vue'
import compH from './011_slot_of_list_comp_h'

export default defineComponent({
  setup() {

  },
  components: {
    comp,
    compH,
    swiperSlide: SwiperSlide
  }
})
</script>
