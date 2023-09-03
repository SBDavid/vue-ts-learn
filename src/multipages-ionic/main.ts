import { createApp } from 'vue'
import { AppRender } from './apprender'

const apprender = new AppRender()
const router = apprender.getRouter()

const app = createApp(apprender.renderApp())
app.use(router)
app.mount('#app')