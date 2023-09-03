import App from './app.vue'
import { h, defineComponent } from 'vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import type { Router } from 'vue-router'

import FullScreen from './fullscrean.vue'

export class AppRender {
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
  getFullScreenRoute(name: string) {
    return defineComponent({
      setup: () => {
        return () => {
          return h(FullScreen, { name, push: this.push, goBack: this.goBack })
        }
      }
    })
  }

  getRouter() {
    const routes = [
      { path: '/', component: this.getFullScreenRoute('first'), alias: '/item0', name: 'item0'},
      { path: '/item1', component: this.getFullScreenRoute('second')}
    ]

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    this.router = router

    return router
  }

  renderApp() {
    return h(App)
  }
}