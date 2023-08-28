<template>
  <div class="fs" :style="{ backgroundColor: color}">
    <h2>FullScreen: {{ name }} , {{ count }}</h2>
    <div @click="push && push(0)">跳转到第一页</div>
    <div @click="push && push(1)">跳转到第二页</div>
    <div @click="push && push(2)">跳转到第三页</div>
    <div @click="goBack">goBack</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, type PropType, type Ref, ref} from 'vue'

export default defineComponent({
  name: 'FullScreen',
  props: {
    name: String,
    push: Function,
    goBack: Function,
    color: String
  },
  setup: (props) => {
    const count = ref(0)

    setInterval(() => {count.value++}, 1000)


    return {
      change: () => {
        if (props.push)
          props.push(1)
      },
      goBack: () => {
        if (props.goBack)
          props.goBack()
      },
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