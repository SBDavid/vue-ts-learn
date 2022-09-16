import { defineComponent, defineProps, ref, onMounted, provide } from 'vue';
import type { InjectionKey, Ref } from 'vue'
export const key = Symbol() as InjectionKey<Ref<number>>

import TestInject from './008_testInject'

export default defineComponent({
  props: {
    title: String
  },
  render() {

  },
  setup(props) {

    // 这是错误的，不能使用defineProps
    // const props = defineProps({
    //   title: String
    // })

    const count = ref(0);

    onMounted(() => {
      console.info('onMounted')
    });
  
    provide(key, count)

    return () => {
      return (<div>
        <Render title={props.title} count={count.value} />
        <TestInject />
      </div>)
    }
  }
})

function Render(props: {title: string|undefined, count: number}) {
  return (
    <>{props.title} - {props.count}</>
  )
}