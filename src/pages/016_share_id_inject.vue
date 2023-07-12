<template>
  <div>
    <h2>inject</h2>
    <h2>props: {{ mid }}</h2>
    {{ midVal }}
  </div>
</template>

<script lang="ts">
import { inject, ref, defineComponent } from 'vue'
export default defineComponent({
  props: ['mid'],
  async setup() {
    const midVal = inject('mid')
    console.info('setup', midVal)

    return {
      midVal
    }
  },
  mounted() {
    const midVal = inject('mid')
    console.info('mounted', midVal)
  }
})

// const mid = ref()
// setTimeout(() => {
//   // mid.value = inject('mid')
// })
//
// const p = new Promise<void>((r) => {
//   r()
// })
// p.then(() => {
//   // mid.value = inject('mid')
// })

</script>

<style scoped>

</style>
