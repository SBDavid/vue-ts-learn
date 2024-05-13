<template>
  <h1>Function</h1>
</template>
<script lang="js">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: '023_function',
  setup: () => {
    // 公共的全局对象
    window.x = 10;
    console.info('x in setup: ', x);

    // 定义一个私有的全局对象
    const myWindow = {
      x: 20
    }
    window.myWindow = myWindow;

    onMounted(() => {
      const funA = new Function("console.info('x in new Funcation A: ', this.x)");
      funA.call(window);

      const funB = new Function("console.info('x in new Funcation B: ', this.x)");
      funB.call(myWindow);

      // 通过增加 window 参数，替换全局作用于
      const funC = new Function("window", "console.info('x in new Funcation C: ', window.x)");
      funC(myWindow);

      // 在函数中隐式申明全局变量
      const funD = new Function("window", `
      add = (a, b) => {
        return a + b
      }
      add(1, 2)
      
      x = 30;
      console.info('x in new Funcation D: ', x);
      `);
      funD.bind(myWindow)(myWindow);
    })
  },
})

</script>

<style scoped>
</style>