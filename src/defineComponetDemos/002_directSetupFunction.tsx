import { defineComponent } from 'vue'

// 例子1. 直接定义 setup 方法，有用户指定props类型
// 无法推断 props 的类型，必须手动指定
export const directSetupFunction1 =  /*#__PURE__*/ defineComponent(
  (props, ctx) => {
    return () => {
      return (<div>{props}</div>)
    }
  }
)

// 手动指定 props 的类型
export const directSetupFunction2 = /*#__PURE__*/ defineComponent<{name: string}>(
  (props, ctx) => {
    return () => {
      return (<div>{props.name}</div>)
    }
  }
)
export const directSetupFunction3 = /*#__PURE__*/ defineComponent(
  (props: {name: string}, ctx) => {
    return () => {
      return (<div>{props.name}</div>)
    }
  }
)

// 涉及的 ts 语法：范型方法
function genericFunction<T>(setup: (props: T) => T[]) {  }
genericFunction((props: string) => {
  return [props]
})
genericFunction<string>((props) => {
  return [props]
})

