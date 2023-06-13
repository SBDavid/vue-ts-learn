import {defineComponent, onMounted, h, type Ref, inject, provide, ref, watch} from 'vue'

function useProvider() {
  return inject<Ref<{title: string}>>('globalData', ref({
    title: ""
  }))
}

const Leaf = defineComponent({
  setup(props, { slots }: any) {

    const globalData = useProvider()

    console.info('setup Leaf', globalData.value.title)
    const title = ref(globalData.value.title)
    watch(globalData.value, (val) => {
      title.value = val.title
    })

    return () => {
      return [
        h('div', {}, ["Name of left: " + title.value]),
      ]
    }
  },

  mounted() {
    console.info('mounted', useProvider().value)
    setTimeout(() => {
      throw Error("setTimeout error")
    })
    throw Error("mounted error")
  },
})


const Container = defineComponent({
  setup(props, { slots }: any) {
    return () => {
      return h('div', {}, [slots.default()])
    }
  },

  mounted() {
    console.info('mounted')
  },

  errorCaptured(err) {
    console.info('errorCaptured', err)
    return false
  }
})

function renderChildren() {
  const leaf = h(Leaf)
  return h(Container, {}, {
    default: leaf
  })
}

function createAppContainerWrapper() {
  return defineComponent({
    name: 'createAppContainerWrapper',
    setup(_, {slots}) {
      // 定义全局数据集
      const globalData = ref({
        title: "defaultTitle",
        name: "defaultName"
      })

      provide('globalData', globalData)

      onMounted(() => {
        setTimeout(() => {
          globalData.value.title = 'change title'
          globalData.value.name = 'change name'
        }, 1000)
      })

      return () => {
        return slots.default ? slots.default() : h('div', {}, "empty")
      }
    }
  })
}

export default defineComponent({
  name: "app",
  setup() {
    const AppContainerWrapper = createAppContainerWrapper()
    const RenderChildren = renderChildren()

    return () => {
      return h(AppContainerWrapper, {}, {
        default: RenderChildren
      })
    }
  }
})
