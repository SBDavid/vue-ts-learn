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
let helperObject: { hello: Function } & ThisType<HelperThisValue> = {
  hello: function() {
      this.logError("Error: Something went wrong!"); // 
  }
}
let helperObject1: { hello: Function } = {
  hello: function(this: HelperThisValue) {
      this.logError("Error: Something went wrong!"); // 
  }
}

// 可以查看源代码，理解 this 的定义
// componentOptions :243