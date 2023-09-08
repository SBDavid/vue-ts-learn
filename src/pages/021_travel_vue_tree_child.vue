<template>
  <p>child: {{ name }}</p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '021_travel_vue_tree_child',
  props: {
    name: String
  },
  setup: (_, { expose }) => {
    expose({
      'ExposeFrom021_travel_vue_tree_child': 11
    })
    _.name
  }
})


</script>

<style>

</style>