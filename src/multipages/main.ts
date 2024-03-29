import { createApp } from 'vue'
import { AppRrender } from './apprender'

const apprender = new AppRrender()
const router = apprender.getRouterSchema()

const app = createApp(apprender.renderApp())
app.use(router)
app.mount('#app')