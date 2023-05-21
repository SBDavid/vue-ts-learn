import {defineComponent, onMounted, h, type Ref, inject, provide, ref} from 'vue'

const Container = defineComponent({
  name: "Container",
  setup(props, { slots }) {
    return () => {
      return h('div', {}, [
        h('h1', {}, "This is a Container"),
        slots.default ? slots.default() : null
      ])
    }
  }
})

const DataDispatch = defineComponent({
  name: 'DataDispatch',
  props: ['comp', 'needWhichProp'],
  setup(props, { slots }: any) {
    const globalData = inject<Ref<{[key: string]: string}>>('globalData')
    console.info('DataDispatch read globalData: ', globalData)

    return () => {
      return h(props.comp, {
        [props.needWhichProp]: globalData?.value[props.needWhichProp]
      }, slots)
    }
  },
})

const Leaf = defineComponent({
  props: {
    name: String
  },
  setup(props, { slots }: any) {
    return () => {
      return [
        h('div', {}, ["Name of left: " + props.name]),
      ]
    }
  }
})

type Schema = {
  comp: typeof Container | typeof Leaf
  needWhichProp?: 'name'
  child: Schema | null
}
const rootSchema: Schema = {
  comp: Container,
  child: {
    comp: Container,
    needWhichProp: 'name',
    child: {
      comp: Leaf,
      needWhichProp: 'name',
      child: null
    }
  }
}

const render = (schema: Schema | null) => {
  if (schema === null) {
    return null
  }

  if (schema.needWhichProp) {
    return h(DataDispatch, {
      comp: schema.comp,
      needWhichProp: schema.needWhichProp
    }, {
      default: () => render(schema.child)
    })
  }

  return h(schema.comp, {}, {
    default: () => render(schema.child)
  })
}

export default defineComponent({
  name: "app",
  setup() {
    // 定义全局数据集
    const globalData = ref({
      title: "defaultTitle",
      name: "defaultName"
    })

    provide('globalData', globalData)

    onMounted(() => {
      console.info('onMounted 012_data_dispatch_recursive.ts')

      setTimeout(() => {
        globalData.value.title = 'change title'
        globalData.value.name = 'change name'
      }, 1000)
    })

    return () => {
      return render(rootSchema)
    }
  }
})
