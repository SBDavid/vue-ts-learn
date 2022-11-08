// https://blog.csdn.net/qq_36157085/article/details/109498473
import { keysOf } from 'element-plus/es/utils';
import { ftruncate } from 'fs';
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
type LooseRequired<T> = { [P in (string & keyof T)]: T[P] }
const loose: LooseRequired<{9: string}> = {
  9: 'fff'
}

type LooseRequired2<T> = { [P in keyof T]: T[P] }
const loose2: LooseRequired2<{[key: number]: string}> = {
  0: ''
}
function testLooseRequired<T>(props: LooseRequired<T>): LooseRequired<T> {
  return props
}
const returnValue = testLooseRequired({u: undefined})
// returnValue.u = 1

type Test5 = 'p1'|'p2'
type Test6 = number
type TestInterSectionString = string & Test5
let testInterSectionString: TestInterSectionString = 'p1'
testInterSectionString = 'p2'



// overload 1: direct setup function， 不定义 props 类型
export const TestListLoadMore1 = /*#__PURE__*/  defineComponent(
  (props, ctx) => {
    return () => {
      return (<div>{props}</div>)
    }
  }
)

// overload 1: direct setup function， 直接定义 props 类型
export const TestListLoadMore2 = /*#__PURE__*/  defineComponent<{name: string}>(
  (props, ctx) => {
    const name = props.name
    return {name}
  }
)

// overload 2: object format with no props
// (uses user defined props interface)
// return type is for Vetur and TSX support
export const TestListLoadMore3 = /*#__PURE__*/  defineComponent(
  {
    setup(props) {
      return {
        // name: props.name // 错误，并没有定义props的类型
      }
    }
  }
)

// overload 3: object format with array props declaration
// props inferred as { [key in PropNames]?: any }
// return type is for Vetur and TSX support
export const TestListLoadMore4 = /*#__PURE__*/  defineComponent(
  {
    props: ['name', 'dfsdf'],
    setup(props) {
      return {
        name: props.name
      }
    }
  }
)
// type MyKeyof<T> = {[P in keysOf T]: string}
function test7<T extends string, P extends Readonly<{ [key in T]?: any }>>(props: T[]): P 
function test7() {}
test7(['a', 'b'])

type Props = {}
type RawBindings = {}
type Data = {name: string}
type Computed = {}
type Methods = {}
type Eemits = {}
type EEemits = 'event1' | 'event2'
export const TestListLoadMoreN = /*#__PURE__*/  defineComponent<Props, RawBindings,Data, Methods, Computed, ComponentOptionsMixin, ComponentOptionsMixin, Eemits, EEemits>({
  setup() {

  },
  data() {
    return {
      name: ""
    }
  }
})
