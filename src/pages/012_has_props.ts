import { defineComponent, onMounted, h, type Ref, inject } from 'vue'

export default defineComponent({
  props: {
    title: String
  },
  setup(props, { slots }: any) {

    // 测试获取全局数据，可以直接读取到 provide 的数据
    const globalData = inject<Ref<{title: string}>>('globalData')

    return () => {
      return [
        h('div', {}, ["read title from props: " + props.title]),
        h('div', {}, ["read globalData.title: " + globalData?.value.title]),
        h('div', {}, slots.default())
      ]
    }
  }
})
