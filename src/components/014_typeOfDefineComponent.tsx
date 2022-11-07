import { defineComponent, reactive, onMounted, ref, type SetupContext, type ComponentOptionsMixin } from 'vue';

// 1. 范型方法，自动推断出范型变量的类型
function myDefineComponent<TypeToInfer>(setup: () => TypeToInfer): TypeToInfer
// 接口类型兼容，参数少的可以兼容参数多的
function myDefineComponent() {}
// 类型不能兼容，参数不可以更多
// function myDefineComponent(setup: any, setup1: any) {}
const returnString = myDefineComponent(() => "returnString")

// 2. 范型约束，使得类型更加具体
function myDefineComponent2<TypeToInfer extends any[]>(setup: () => TypeToInfer): TypeToInfer
function myDefineComponent2() {}
// 错误，string 与 array 是不兼容的
// const returnString2 = myDefineComponent2(() => "returnString")
const returnString2 = myDefineComponent2(() =>["returnString"])

// 3. 什么是 EE extends string = string？以及泛型的三元表达式条件判断
type MyString = string
type StringUnion = 's1' | 's2'
type MyNumber = number
type StringArray = ['ff', '11']
type Tester = StringUnion extends MyString ? string : number
type Tester2 = MyNumber extends MyString ? string : number
type Tester3 = string extends MyString ? string : number
type Tester4 = StringArray extends MyString ? string : number

interface MyComponentOptionsBase<EE extends string = string>{
  emits: EE[] // 为什么不直接使用 string[]
}
const myComponentOptionsBase: MyComponentOptionsBase = {
  emits: ['s1', 's2']
}
const myComponentOptionsBase1: MyComponentOptionsBase<'s2'|'s3'> = {
  // 错误
  // emits: ['s1']
  emits: ['s2', 's3']
}

// 4. 交叉类型
type IntersectionTypeA = { age: number }
type IntersectionTypeB = { gender: string }
type People = IntersectionTypeA & IntersectionTypeB
const people: People = {
  age: 14,
  gender: 'male'
}

// 5. ThisType, 制定 this 的类型，对象中的方法
interface HelperThisValue {
  logError: (error: string) => void;
}
let helperFunctions: { [name: string]: Function } & ThisType<HelperThisValue> = {
  hello: function() {
      this.logError("Error: Something went wrong!"); // 
      // 错误 TS2339: Property 'update' does not exist on HelperThisValue.
      // this.update(); 
  }
}

// 6. LooseRequired
type LooseRequired<T> = { [P in string & keyof T]: T[P] }
const loose: LooseRequired<undefined> = {
  u: '',
  ddd: ''
}
type LooseRequired2<T> = { [P in keyof T]: T[P] }
const loose2: LooseRequired2<unknown> = {
  u: '',
  ddd: ''
}
function testLooseRequired<T>(props: LooseRequired<T>): LooseRequired<T> {
  return props
}
const returnValue = testLooseRequired({u: undefined})
returnValue.u = 1


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
