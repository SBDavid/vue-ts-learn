import { defineComponent, ref, watch, watchEffect } from 'vue'

export default defineComponent({
  setup() {

    return () => {
      return (<div>
        <NoPropsComponent onMyEvent={(val) => {console.info(val)}} />
      </div>)
    }
  }
})

const NoPropsComponent = defineComponent(
  {
    name: 'NoPropsComponent',
    emits: {
      myEvent: (val: string) => {}
    },
    setup(props, {emit}) {

      const click = () => {
        console.info(props.onMyEvent)
      }

      return () => {
        return (
          <div onClick={click}>点击</div>
        )
      }
    }
  }
)