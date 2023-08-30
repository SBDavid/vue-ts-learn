<template>
  <div class="fs" :style="{ backgroundColor: color}">
    <div v-if="name !== '首页'" @click="goBack && goBack()">返回上一页</div>
    <h2>页面名称: {{ name }} , {{ count }}</h2>
    <!-- <div @click="pushIndex && pushIndex(0)">跳转到第一页</div>
    <div @click="pushIndex && pushIndex(1)">跳转到第二页</div>
    <div @click="pushIndex && pushIndex(2)">跳转到第三页</div> -->
    <div v-if="name?.startsWith('swiper')" @click="pushName && pushName('route0')">跳转到 route0</div>
    <div v-if="name?.startsWith('swiper')" @click="pushName && pushName('route1')">跳转到 route1</div>
    <div v-if="name?.startsWith('swiper')" @click="pushName && pushName('route2')">跳转到 route2</div>
    <div v-if="name === '首页'" @click="pushName && pushName('route1')" style="position: absolute; bottom: 20px; left: 20px; right: 20px; text-align: center; font-size: 32px;">进入 Swiper</div>
    <div v-if="name === 'swiper2'" @click="pushName && pushName('route2')" style="position: absolute; bottom: 20px; left: 20px; right: 20px; text-align: center; font-size: 32px;">进入总结页</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType, type Ref, ref, onDeactivated} from 'vue'
import { useSwiperSlide } from 'swiper/vue';

export default defineComponent({
  name: 'FullScreen',
  props: {
    name: String,
    pushIndex: Function,
    pushName: Function,
    goBack: Function,
    color: String
  },
  setup: (props) => {
    const count = ref(0)

    setInterval(() => {count.value++}, 1000)

    onDeactivated(() => {
      console.info('FullScreen onDeactivated')
    })

    const swiperSlide = useSwiperSlide()
    console.info('swiperSlide', swiperSlide)


    return {
      count
    }
  },
  mounted: () => {
    // 查看父容器expose的对象
    // console.info('getCurrentInstance.parent', getCurrentInstance()?.parent?.exposed)
  }
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