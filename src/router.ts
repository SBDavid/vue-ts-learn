import { createRouter, createWebHistory } from 'vue-router';

import App from './pages/App.vue';

const routes = [
  { path: '/app', component: App },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;