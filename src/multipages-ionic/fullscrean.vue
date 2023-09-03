<template>
  <div class="fs">
    <h2>FullScreen: {{ name }} , {{ count }}</h2>
    <div @click="change">跳转到第二页</div>
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
    goBack: Function
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
}
</style>