import { defineComponent, reactive, onMounted, ref, type SetupContext, type ComponentOptionsMixin } from 'vue';

export const TestListLoadMore1 = /*#__PURE__*/  defineComponent<{name: string, name1: string}>(
  (props, ctx) => {
    return () => {
      return (<div>{props.name}</div>)
    }
  }
)

export const TestListLoadMore2 = /*#__PURE__*/  defineComponent<{name: string}>(
  (props, ctx) => {
    const refA = ref(0)
    return {refA}
  }
)
if (TestListLoadMore1.setup) {
  TestListLoadMore1.setup({name: '', name1: ''}, {} as SetupContext)
}

type Props = {}
type RawBindings = {}
type Data = {name: string}
type Computed = {}
type Methods = {}
type Eemits = {}
type EEemits = 'event1' | 'event2'
export const TestListLoadMore3 = /*#__PURE__*/  defineComponent<Props, RawBindings,Data, Methods, Computed, ComponentOptionsMixin, ComponentOptionsMixin, Eemits, EEemits>({
  setup() {

  },
  data() {
    return {
      name: ""
    }
  }
})
