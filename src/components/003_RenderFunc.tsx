import { ref } from 'vue'
import HelloWorld from './HelloWorld.vue'

export default {
  setup() {

    const count = ref(1)
    const ok = ref(true)

    // return () => [
    //   h('div', ['hello']),
    //   h('div', ['world']),
    //   h('div', count.value)
    // ]

    // return () => <div>hello</div>

    return () => {
      return (<div>
        <button onClickOnce={() => {
          ok.value = !ok.value;
        }}>ok: {String(ok.value)}</button>
        {ok.value ? <Render /> : <HelloWorld msg={"my-msg"} />}
      </div>)
    }
  }
}


function Render() {
  return (
    <div>在同一个文件内创建另一个组件</div>
  )
}