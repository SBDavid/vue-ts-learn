import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import 'element-plus/dist/index.css'

const pinia = createPinia()
const app = createApp(App);

app.use(pinia)

app.mount('#app')


// test reactive
// import { reactive, watchEffect } from 'vue';

// const test = reactive({test: 1});
// debugger;
// watchEffect(() => {
//     console.info('test.test', test.test);
// }, 
// {
//     onTrack: (e) => {
//         console.info('onTrack', e);
//     },
//     onTrigger: (e) => {
//         console.info('onTrigger', e);
//     }
// }
// )
// debugger;
// test.test = 2;


// test Reflect
// export const testObj = {
//     print: () => {
//         console.info("this.attr");
//     },
//     attr: "attr"
// }

// var target = {
//     get a() { 
//         return this.c
//     },
//     b: 7,
//     c: 3,
// }

// const res = Reflect.get(target, 'b', { c: 4, b: 19 }) // 4

// console.info(res)

// // @ts-ignore
// const a = { get foo() { return this.bar; } };
// const aProxy = new Proxy(a, {
//     get(target, p, receiver) {
//         // @ts-ignore
//         // console.info('receiver', receiver.bar)
//         return Reflect.get(target, p, receiver)
//     }
// });

// const b = { bar: 42 };

// console.info(Reflect.get(a, 'foo', b)); // 42
// console.info(Reflect.get(aProxy, 'foo', b))// undefined
// console.info(aProxy.foo)