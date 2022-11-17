import { defineComponent } from 'vue'

// 例子 3. 用数组定义 props
const arrayPropsComponent = defineComponent(
  {
    props: ['name', 'age'],
    setup(props) {
      return {
        name: props.name
      }
    }
  }
)

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

// 涉及 ts 语法：范型约束
type TestExtend = 'name'|'age' extends string ? 1 : 2
function testGenericConstraints<T extends string>(input: T): void
function testGenericConstraints<T extends number>(input: T): void
function testGenericConstraints() {}
testGenericConstraints(10)
testGenericConstraints('10')

// ts 语法：索引签名
type PropKeys<T> = T[] 
type InferType = ['name', 'age'] extends PropKeys<infer InferedType> ?  InferedType : never
type PropsType = { [key in InferType]?: any }


