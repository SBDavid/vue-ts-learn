<template>
  <p>something</p>
  <div class="layout">
    <!-- <div style="background-image: url('https://picsum.photos/200/300'); height: 300px; width: 200px;">
      <div>test slot</div>
    </div> -->
    <img src="https://picsum.photos/200/300" />
    <div class="cld">c3</div>
  </div>
</template>
<script lang="ts">
import { defineComponent  } from 'vue'
export default defineComponent({
  name: '022_image_as_bg',
  setup: () => {
    
  },
})


</script>

<style scoped>
  .layout {
    width: 100%;
    background-color: beige;
    position: relative;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  .cld {
    background-color: rgba(254, 42, 42, 0.212);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>