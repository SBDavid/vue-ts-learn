<template>
  <p>child: {{ name }}</p>
  <p>count: {{ count }}</p>
  <slot></slot>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: '021_travel_vue_tree_child',
  props: {
    name: String
  },
  setup: (_, { expose }) => {
    const count = ref(0)
    const add = () => {
        count.value++
      }
    expose({
      'ExposeFrom021_travel_vue_tree_child': 11,
      add,
    })

    onMounted(() => {
      console.info('mounted 021_travel_vue_tree_child')
      add()
    })

    return {
      count
    }
  }
})


</script>

<style>

</style>