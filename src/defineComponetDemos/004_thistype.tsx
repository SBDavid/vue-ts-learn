import { defineComponent } from 'vue'

// 例子 2. 没有 props 的组件
export const noPropsComponent = defineComponent(
  {
    mounted() {
      console.log(this.$props.name)
    },
    props: ['name'],
  }
)

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

// 可以查看源代码，理解 this 的定义
// componentOptions :243