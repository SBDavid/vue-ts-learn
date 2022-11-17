import { defineComponent } from 'vue'

// defineComponent 是如何推断类型的？

// 例子1. 直接定义 setup 方法，有用户指定props类型
// 无法推断 props 的类型，必须手动指定
const directSetupFunction1 = defineComponent(
  (props, ctx) => {
    return () => {
      return (<div>{props}</div>)
    }
  }
)
// 手动指定 props 的类型
const directSetupFunction2 = defineComponent<{name: string}>(
  (props, ctx) => {
    return () => {
      return (<div>{props.name}</div>)
    }
  }
)
// 涉及的 ts 语法：范型方法、范型变量
// 常见的例子，Array
function genericFunction<T extends any[]>(input: T ) {
  return input.length
}

// 例子 2. 没有 props 的组件
export const noPropsComponent = defineComponent(
  {
    props: undefined, // 或者没有这一行
    emits: ['click'],
    setup(props) {
      return () => {
        return (
          // 会产生错误，因为 props.onClick 是给IDE看的 {}
          <div onClick={props.onClick}></div>
          // 错误，因为 props 的类型为 {}
          // <div>{props.name}</div>
        )
      }
    }
  }
)
// setup 的类型定义是通过 ComponentOptionsWithoutProps 完成的
// 涉及的 ts 语法：通过一个已存在的 type 定义新的 type
// 例如
type OldType<T> = {
  setup: (props: T[]) => void
}
type NewType<T = string> = OldType<T>
const newType: NewType = {
  setup(props) {}
}
// 涉及的 ts 语法：交叉类型，通过交叉类型构建新的类型
type IntersectionTypeA = { age: number }
type IntersectionTypeB = { gender: string }
type People = IntersectionTypeA & IntersectionTypeB
const people: People = {
  age: 14,
  gender: 'male'
}
// 涉及的 ts 语法：ThisType，指定 option 对象上的方法的 this 的类型
interface HelperThisValue {
  logError: (error: string) => void;
}
let helperFunctions: { hello: Function } & ThisType<HelperThisValue> = {
  hello: function() {
      this.logError("Error: Something went wrong!"); // 
      // 错误 TS2339: Property 'update' does not exist on HelperThisValue.
      // this.update(); 
  }
}
// 回答一个问题：setup 中的 props 是如何确定类型的？
// 制作一个简化版本
interface ComponentOptionsBase1<Props> {
  setup: (props: Readonly<Props>) => void
}
type ComponentOptionsWithoutProps<
Props = {}
> = ComponentOptionsBase1<Props> & {
  props?: undefined
}
function defineComponent1<Props = {}>(
  options: ComponentOptionsWithoutProps<Props>
): void {}

defineComponent1({
  props: undefined,
  setup(props) {
    props
    return () => {
      
    }
  }
})

// 例子 3. 用数组定义 props
const arrayPropsComponent = defineComponent(
  {
    emits: ['click'],
    props: ['name', 'age'],
    setup(props) {
      props.onClick
      return {
        name: props.name
      }
    }
  }
)
// 涉及 ts 语法：范型约束
type TestExtend = 'name'|'age' extends string ? 1 : 2
function testGenericConstraints<T extends string>(input: T): void
function testGenericConstraints<T extends number>(input: T): void
function testGenericConstraints() {}
testGenericConstraints(10)
testGenericConstraints('10')
// 涉及 ts 语法：映射类型（Mapped Types），通过遍历一个联合（union）来构造一个新的类型
type TestUnion = 'name' | 'age'
type Props = TestUnion[]
const props: Props = ['name', 'age',]
type TestMappedType1 = { [key in TestUnion]?: any }
// 映射类型的三个例子
export type LooseRequired<T> = { [P in string & keyof T]: T[P] }
export type LooseRequired1<T> = { [P in keyof T]: T[P] }
export type LooseRequired2<T> = { [P in keyof T]-?: T[P] }
type TestLooseRequired = LooseRequired<{name?: number}>
type TestLooseRequired1 = LooseRequired1<{name?: number}>
type TestLooseRequired2 = LooseRequired2<{name?: number}>
const testLooseRequired: TestLooseRequired = {
  name: undefined
}
const testLooseRequired1: TestLooseRequired1 = {}
const testLooseRequired2: TestLooseRequired2 = {
  name: 10
}
// 实现一个完整的props类型推断
function defineComponent2<PropNames extends string> (
  options: ComponentOptionsWithArrayProps<PropNames>
): void {}
type ComponentOptionsWithArrayProps<
  PropNames extends string = string,
  Props = Readonly<{ [key in PropNames]?: any }>
> = ComponentOptionsBase2<Props> & {
  props: PropNames[]
}
type ComponentOptionsBase2<Props> = {
  setup?: (props: Readonly<Props>) => void
}

defineComponent2({
  props: ['pa'],
  setup(props) {
    console.info(props.pa)
  }
})

// 例子 4. 用对象定义props
const objectPropsComponent = defineComponent(
  {
    props: {
      name: String,
      age: {
        type: Number,
        required: true,
      },
      address: {
        type: String
      },
      booleanTest: Boolean,
      booleanTypeTest: {
        type: Boolean
      }
    },
    setup(props) {
      return {
        name: props.name,
        age: props.age
      }
    }
  }
)

// 核心的属性提取来自于 ExtractPropTypes RequiredKeys InferPropType
// RequiredKeys
type RequiredKeys1<T> = {
  [K in keyof T]: T[K] extends
    | { required: true }
    | { default: any }
    // don't mark Boolean props as undefined
    | BooleanConstructor
    | { type: BooleanConstructor }
    ? T[K] extends { default: undefined | (() => undefined) }
      ? never
      : K // k 是索引，也是字面量类型
    : never
}
type TestProps = {
  age1: {
    type: Number,
    required: true,
  },
  age2: {
    type: Number,
  },
  age3: {
    default: 11,
  },
  age4: BooleanConstructor
}
type TestRequiredKeys1 = RequiredKeys1<TestProps>
type TestRequiredKeys2 = TestRequiredKeys1[keyof TestProps] // 索引签名


// 涉及 ts 语法，通过类型约束进行三元表达式判断
type MyString = string
type StringUnion = 's1' | 's2'
type MyNumber = number
type Tester = StringUnion extends MyString ? string : number
type Tester2 = MyNumber extends MyString ? string : number

// InferPropType
