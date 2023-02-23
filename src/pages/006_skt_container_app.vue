<template>
  <Container>
    <template #floors>
      <Floor :data="floorData"></Floor>
      <Floor :data="floorData"></Floor>
    </template>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Container from './006_skt_container.vue'
import Floor from './006_skt_container_floor.vue'

export default defineComponent({
  mounted() {
  },
  setup() {
    // 模拟楼层数据
    const floorData = "floorData"
    return {
      floorData
    }
  },
  components: {
    Container,
    Floor
  }
})
</script>