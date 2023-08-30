import App from './app.vue'
import { h, defineComponent, type DefineComponent } from 'vue'
import { createRouter, createWebHashHistory, type Router } from 'vue-router'

import SubPageContainer from './SubPageContianer.vue'
import FullScreen from './fullscrean.vue'
import Swiper from './swiper.vue'
import Audio from './Audio.vue'

export class AppRrender {
  router?: Router

  constructor() {
    this.pushIndex = this.pushIndex.bind(this)
    this.pushName = this.pushName.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  // 页面跳转
  pushIndex(index: number) {
    this.router?.push({ path: '/item'+index })
  }
  pushName(name: string) {
    this.router?.push({ name })
  }
  goBack() {
    this.router?.go(-1)
  }

  // 传入 floor
  getFullScreenRoute(comp: DefineComponent<any> ,name: string, color: string) {
    return defineComponent({
      setup: () => {
        return () => {
          return h(SubPageContainer, {
            name,
            isInSwiper: false
          } , {
            default: () => h(comp, { name, pushIndex: this.pushIndex, pushName: this.pushName, goBack: this.goBack, color })
          })
        }
      }
    })
  }

  getSwiper(pageList: any[], swiperDirection?: string) {
    return defineComponent({
      setup: () => {
        return () => {

          const sliders: { [key: string]: Function } = {}
          pageList.forEach((page, index) => {
            sliders[`slider${index}`] = () => h(SubPageContainer, {
              name: page.subPageconfig.name,
              isInSwiper: true,
              swiperIndex: index
            } , {
              default: () => h(
                page.componentsTree.comp, { 
                  name: page.subPageconfig.name, 
                  pushIndex: this.pushIndex,
                  pushName: this.pushName, 
                  goBack: this.goBack, 
                  color: page.componentsTree.color })
            })
          })

          return h(Swiper, {
            slideComponentAmount: 2,
            direction: swiperDirection as any
          }, sliders)
        }
      }
    })
  }

  getRouterSchema() {
    const routes: any[] = []
    this.getMockSchema().pageSchemaList.forEach((route, index) => {
      if (route.pageList.length === 1) {
        routes.push({
          path: index === 0 ? '/' : `/item${index}`,
          alias: `/item${index}`,
          name: route.routeConfig.name,
          component: this.getFullScreenRoute(
            FullScreen as any,
            route.pageList[0].subPageconfig.name,
            route.pageList[0].componentsTree.color)
        })
      } else if (route.pageList.length > 1) {
        routes.push({
          path: index === 0 ? '/' : `/item${index}`,
          alias: `/item${index}`,
          name: route.routeConfig.name,
          component: this.getSwiper(route.pageList, route.routeConfig.swiperDirection)
        })
      }
    })

    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    });

    this.router = router

    return router
  }

  getMockSchema() {
    return {
      pageSchemaList: [
        {
          routeConfig: {
            name: 'route0',
            swiperDirection: undefined
          },
          pageList: [
            {
              subPageconfig: {
                name: '首页'
              },
              componentsTree: {
                comp: FullScreen,
                color: 'aquamarine'
              }
            }
          ]
        },
        {
          routeConfig: {
            name: 'route1',
            swiperDirection: 'vertical'
            // swiperDirection: 'horizontal'
          },
          pageList: [
            {
              subPageconfig: {
                name: 'swiper1'
              },
              componentsTree: {
                comp: FullScreen,
                color: 'red'
              }
            },
            {
              subPageconfig: {
                name: 'swiper2'
              },
              componentsTree: {
                comp: FullScreen,
                color: 'blue'
              }
            }
          ]
        },
        {
          routeConfig: {
            name: 'route2',
            swiperDirection: undefined
          },
          pageList: [
            {
              subPageconfig: {
                name: '总结页'
              },
              componentsTree: {
                comp: FullScreen,
                color: '#bd8e38'
              }
            }
          ]
        },
      ],
      globalComponentList: [
        {
          comp: Audio
        }
      ]
    }
  }

  renderApp() {
    const globalComponents: { [key: string]: Function } = {}
    this.getMockSchema().globalComponentList.forEach((comp, index) => {
      globalComponents[`globalComponent${index}`] = () => h(
        comp.comp, { pushIndex: this.pushIndex, goBack: this.goBack })
    })

    return h(App, {
      globalComponentAmount: this.getMockSchema().globalComponentList.length
    }, globalComponents)
  }
}