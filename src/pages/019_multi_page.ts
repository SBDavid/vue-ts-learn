import { defineComponent, onMounted, h, ref, provide, type Ref, inject } from 'vue'

import MultiPageContainer from './019_multi_page_container.vue'
import FullScrean from './019_multi_page_fullscrean.vue'

function createAppContainerWrapper() {
  return defineComponent({
    name: 'AppContainerWrapper',
    setup: (_: any, { slots }: any) => {
      onMounted(() => {
        console.info('AppContainerWrapper onMounted')
      })

      return () => {
        return slots.default()
      }
    }
  })
}

function createMultiPageContainer() {
  return defineComponent({
    name: 'createMultiPageContainer',
    setup: (_: any, {  }) => {
      const multiPageContainerEl = ref<InstanceType<typeof MultiPageContainer> | null>(null)

      onMounted(() => {
        console.info('createMultiPageContainer onMounted', multiPageContainerEl.value?.change)
      })


      return () => {
        const multiPageContainer = h(MultiPageContainer, {
          amount: 2,
          types: ['FullScreen'],
          ref: multiPageContainerEl
        }, {
          item0: () => h(FullScrean, { 
            name: 'first',
            change: multiPageContainerEl.value?.change
          }),
          item1: () => h(FullScrean, {
            name: 'second',
            change: multiPageContainerEl.value?.change
          })
        })
        return multiPageContainer
      }
    }
  })
}

export default defineComponent({
  name: "019_multi_page",
  setup(props) {
    const AppContainerWrapper = createAppContainerWrapper()
    const MultiPageContainer = createMultiPageContainer()

    return () => {
      return h(AppContainerWrapper, {}, {
        default: () => h(MultiPageContainer)
      })
    }
  }
})


