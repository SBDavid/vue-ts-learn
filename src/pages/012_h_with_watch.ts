import { defineComponent, onMounted, h, ref, provide, type Ref, inject } from 'vue'
import HWithProps from './012_has_props'

const DataDispatch = defineComponent({
  name: 'DataDispatch',
  props: ['comp', 'needWatchProp'],
  setup(props, { slots }: any) {
    const globalData = inject<Ref<{[key: string]: string}>>('globalData')
    console.info('DataDispatch read globalData: ', globalData)

    return () => {
      return h(props.comp, {
        [props.needWatchProp]: globalData?.value[props.needWatchProp]
      }, slots)
    }
  },
})

export default defineComponent({
  name: "app-container",
  setup(props) {

    // 定义全局数据集
    const globalData = ref({
      title: "defaultTitle",
      name: "defaultName"
    })

    provide('globalData', globalData)

    onMounted(() => {
      console.info('onMounted 012_h_with_watch.ts')

      setTimeout(() => {
        globalData.value.title = 'change title'
      }, 1000)
    })

    return () => {
      return h('div', {}, {
        default: () => [
          h(HWithProps, {title: "title from app-container"}, {
            default: () => h('button', {} , "button")
          }),
          h(DataDispatch, {
            comp: HWithProps,
            needWatchProp: 'title'
          }, {
            default: () => h('button', {} , "button")
          })
        ]
      })
    }
  }
})


