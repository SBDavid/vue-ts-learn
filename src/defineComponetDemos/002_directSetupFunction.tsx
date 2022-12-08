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

// 源码
// export function defineComponent<Props, RawBindings = object>(
//   setup: (
//     props: Readonly<Props>,
//     ctx: SetupContext
//   ) => RawBindings | RenderFunction
// ): DefineComponent<Props, RawBindings>

// 涉及的 ts 语法：范型方法，范型接口，范型类
function genericFunction<T>(setup: (props?: T) => (T|undefined)[], arg?: T) { 
  return setup(arg)
}

// 直接制定 T 的类型
genericFunction<string>((props) => {
  return [props]
})

// 通过参数 arg 推断 T 类型
genericFunction((props) => {
  return [props]
}, "arg")

// 通过制定 props 的类型 推断 T 类型
genericFunction((props?: string) => {
  return [props]
})

// 设置 T 的默认值 <T = string>