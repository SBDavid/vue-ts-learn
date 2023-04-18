import { defineComponent, onMounted, h, ref } from 'vue'

export default defineComponent({
  setup(props) {
    console.info('setup')

    onMounted(() => {
      console.info('onMounted 010_h_func_update.ts')
    })

    const count = ref<number>(0)
    const add = () => {
      count.value++
      console.info('count.value', count.value)
    }

    return () => {
      console.info('return')

      return [
        h('h2', [count.value]),
        h('button', {
          onClick: add
        },['add'])
      ]
    }
  }
})
