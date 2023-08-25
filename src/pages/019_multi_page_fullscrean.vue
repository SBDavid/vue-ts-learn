<template>
  FullScreen: {{ name }}

  <div @click="change">2222</div>
</template>
<script lang="ts">
import { defineComponent, type PropType, type Ref} from 'vue'

export default defineComponent({
  name: 'FullScreen',
  props: {
    name: String,
    change: Function,
  },
  setup: (props) => {
    return {
      change: () => {
        if (props.change)
          props.change(1)
      }
    }
  },
  mounted: () => {
    // 查看父容器expose的对象
    // console.info('getCurrentInstance.parent', getCurrentInstance()?.parent?.exposed)


  }
})
</script>

<style>
</style>