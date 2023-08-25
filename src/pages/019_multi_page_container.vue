<template>
  <div v-for="index of Array.from(Array(amount).keys())">
    <div class="fs" v-show="index === currentPageIndex">
      <slot :name="'item'+(index)"></slot>
    </div> 
  </div>
</template>
<script lang="ts">
import { defineComponent, ref} from 'vue'

export default defineComponent({
  name: '019_multi_page_container',
  props: {
    amount: {
      type: Number
    },
    types: {
      type: Array<'FullScreen'|'Swiper'>
    }
  },
  setup: (props, { expose }) => {
    const currentPageIndex = ref(0)

    const change = (index: number) => {
        currentPageIndex.value = index
      }

    expose({
      change
    })

    return {
      currentPageIndex,
      change
    }
  }
})
</script>

<style>
html,
body {
  position: relative;
  height: 100%;
  width: 100%;
}

.fs{
  background-color: aqua;
  height: 100vh;
  width: 100vw;
}

</style>