import { ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: String
  },
  setup(props, { slots }: any) {
  
  const title = ref('myTitle')

  const callback = () => {
    title.value = 'myTitle onClick';
  }

  return () => {
    return (
      <div style={{backgroundColor: props.color}}>
        {slots.default(title.value, callback)}
      </div>)
    }
  }
})