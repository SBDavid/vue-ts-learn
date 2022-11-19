import type { PrunePayload } from 'vite/types/hmrPayload'
import { defineComponent } from 'vue'

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

// 简化版本，非常复杂

// 需要理解的部分1，他是如何找到必选的属性的
// {
//   name: {required: true},
//   address: {required: true},
//   age: Number,
// }
// => 'name' | 'address'
type RequiredKeys<T> = {
  [K in keyof T]: T[K] extends
    | { required: true }
    | { default: any }
    // don't mark Boolean props as undefined
    | BooleanConstructor
    | { type: BooleanConstructor }
    ? T[K] extends { default: undefined | (() => undefined) }
      ? never
      : K
    : never
}[keyof T]

type Props = {
  name: {required: true},
  address: {required: true},
  age: Number
}
type TestRequiredKeys = RequiredKeys<Props>

// ts语法 1. 通过 索引签名 构建一个新的对象类型
type SimpleRequiredKeys<Props> = {
  [PropsKey in keyof Props]: Props[PropsKey] extends
    | { required: true }
    ? PropsKey
    : never
}
// 新定义的类型中 key 为原类型的 key，而 key 的类型为属性名
type testSimpleRequiredKeys = SimpleRequiredKeys<Props>

// 2. ts语法 通过 Indexed Access Types，获取必选的属性值
type res1 = {
  name: 'name',
  address: 'address',
  age: never
}['address'|'name'|'age']
type res2 = SimpleRequiredKeys<Props>[keyof Props]

// 需要理解的部分2，如何找到属性的类型
// {type: String} => string
// {default: 'str'} => string
type InferPropType<T> = T extends null
  ? any
  : T extends BooleanConstructor | { type: BooleanConstructor }
  ? boolean
  : T extends PropOptions<infer V>
    ? V
  : T
export interface PropOptions<D> {
  default?: D
}

const inferTest1 = {type: Boolean}
const inferTest2 = {default: 'str'}
type inferTest1Type = typeof inferTest1
type inferTest2Type = typeof inferTest2

type TestInferPropType1 = InferPropType<inferTest1Type>
type TestInferPropType2 = InferPropType<inferTest2Type>