import type { PrunePayload } from 'vite/types/hmrPayload'
import { defineComponent, type ExtractPropTypes, type ComponentObjectPropsOptions, type ComponentPropsOptions } from 'vue'

// 例子 4. 用对象定义props
const objectPropsComponent = defineComponent(
  {
    props: {
      name: String,
      age: {
        type: Number,
      },
      address: {
        default: 'shanghai'
      },
      booleanTypeTest: {
        type: Boolean
      }
    },
    setup(props) {
      return {
        name: props.name,
        age: props.age,
        address: props.address
      }
    }
  }
)

export interface ComponentOptionsBase<Props> {
  setup?: (
    props: Readonly<Props>,
  ) => void
}

export type ComponentOptionsWithObjectProps<
  PropsOptions = ComponentObjectPropsOptions,
  Props = Readonly<ExtractPropTypes<PropsOptions>>
> = ComponentOptionsBase<Props> & {
  props: PropsOptions
}

export function defineComponent1<PropsOptions extends Readonly<ComponentPropsOptions>>(
  options: ComponentOptionsWithObjectProps<PropsOptions>
){}

defineComponent1({
  props: {
    name: {default: 'tom'}
  },
  setup(props) {
    props.name
  }
})

export interface PropOptions<D> {
  default?: D 
}

type ComponentObjectPropsOptions1<P=any> = {
  [K in keyof P]: PropOptions<P[K]> | null
}

export function defineComponent2<PropsOptions extends ComponentObjectPropsOptions1>(
  prop1: PropsOptions,
){}

defineComponent2({
  name: {default: 'tom'}
},)

const obj = {default: 'tom'}

