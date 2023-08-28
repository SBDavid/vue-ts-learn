import App from './app.vue'
import { h, defineComponent } from 'vue'
import { createRouter, createWebHashHistory, type Router } from 'vue-router'

import FullScreen from './fullscrean.vue'
import Swiper from './swiper.vue'
import Audio from './Audio.vue'

export class AppRrender {
  router?: Router

  constructor() {
    this.push = this.push.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  // 页面跳转
  push(index: number) {
    this.router?.push({ path: '/item'+index })
  }
  goBack() {
    this.router?.go(-1)
  }

  // 传入 floor
  getFullScreenRoute(name: string, color: string) {
    return defineComponent({
      setup: () => {
        return () => {
          return h(FullScreen, { name, push: this.push, goBack: this.goBack, color })
        }
      }
    })
  }

  getSwiper() {
    return defineComponent({
      setup: () => {
        return () => {
          return h(Swiper, {
            slideComponentAmount: 2
          }, {
            'slider0': () => h(FullScreen, { name: 'slider0', push: this.push, goBack: this.goBack, color: 'red' }),
            'slider1': () => h(FullScreen, { name: 'slider1', push: this.push, goBack: this.goBack, color: 'blue' })
          })
        }
      }
    })
  }

  getRouter() {
    const routes = [
      { path: '/', component: this.getFullScreenRoute('first', 'aquamarine'), alias: '/item0'},
      { path: '/item1', component: this.getFullScreenRoute('second', '#2196f3')},
      { path: '/item2', component: this.getSwiper()},
    ]

    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    });

    this.router = router

    return router
  }

  renderApp() {
    return h(App, {
      globalComponentAmount: 1
    }, {
      'globalComponent0': () => h(Audio, { push: this.push, goBack: this.goBack })
    })
  }
}