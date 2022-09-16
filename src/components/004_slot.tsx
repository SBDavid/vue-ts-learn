import { defineComponent, onMounted } from 'vue';
import CompWithASlot from './005_CompWithASlot';

export default defineComponent({
  setup() {

    onMounted(() => {
      console.info('004_slot is mounted 1')
    });

    return () => {
      return (<CompWithASlot color="grey">
        {{default: AComp}}
      </CompWithASlot>)
    }
  },
  mounted() {
    console.info('004_slot is mounted')
  }
})

// 函数组件
const AComp = (title: any, callback: any) => {
  return (<div onClick={callback}>{title}</div>)
}