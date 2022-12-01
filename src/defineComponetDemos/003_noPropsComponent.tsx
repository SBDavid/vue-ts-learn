import { defineComponent } from 'vue'

// 例子 2. 没有 props 的组件
export const noPropsComponent = defineComponent(
  {
    // props 是有类型的，类型为空对象
    setup(props) {
      return () => {
        return (
          <template>
            <div></div>
            // 错误，因为 props 的类型为 {}
            {/* <div>{props.name}</div> */}
          </template>
        )
      }
    }
  }
)

// 错误的用法，onClick 属性的类型是在 tsx 中引用该组件所使用的
export const NoPropsComponentError = defineComponent(
  {
    emits: ['click'],
    setup(props) {
      return () => {
        return (
          // 会产生错误，因为 props.onClick 是给IDE看的 {}
          <div onClick={props.onClick}></div>
        )
      }
    }
  }
)
defineComponent(
  {
    setup() {
      return () => {
        return (
          <NoPropsComponentError onClick={() => {}} />
        )
      }
    }
  }
)

// 回答一个问题：setup 中的 props 是如何确定类型的？
// 制作一个简化版本
function defineComponent1<Props = {}>(
  options: ComponentOptionsWithoutProps<Props>
): void {}

type ComponentOptionsWithoutProps<
Props = {}
> = ComponentOptionsBase1<Props> & {
  // 为什么要定义 props 为 undefined?
  // 因为 defineComponent 有 4 重载版本，可以通过 ts 类型兼容来推断当前的调用参数属于哪一种重载
  props?: undefined
}

interface ComponentOptionsBase1<Props> {
  setup: (
    this: void, // 这个下个例子在看
    props: Readonly<Props>) => void
}

// 测试用例
defineComponent1({ // 可以在这里指定props的类型 <{name: any}>
  props: undefined,
  setup(props) {
    props
    return () => {
      
    }
  }
})

// ts 语法：通过一个已存在的 type 定义新的 type
type OldType<T> = {
  setup: (props: T) => void
}
type NewType<T = {}> = OldType<T>
const newType: NewType = {
  setup(props) {}
}

// ts 语法：交叉类型，通过交叉类型构建新的类型
type IntersectionTypeA = { age: number }
type IntersectionTypeB = { gender: string }
type People = IntersectionTypeA & IntersectionTypeB
const people: People = {
  age: 14,
  gender: 'male'
}

// 问题：为什么 props 中会出现 emit 中的属性？
// EmitsToProps 到源码中查看
// componentOptions :228