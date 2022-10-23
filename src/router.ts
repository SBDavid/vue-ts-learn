import { createRouter, createWebHistory } from 'vue-router';

import App from './pages/App.vue';
import FormTable from './pages/formTable.vue';
import FormTableWithUse from './pages/formTableWithUse.vue';
import GenForm from './pages/genForm.vue';
import GenFormRef from './pages/genFormRef.vue';

const routes = [
  { path: '/app', component: App },
  { path: '/formTable', component: FormTable },
  { path: '/formTableWithUse', component: FormTableWithUse },
  { path: '/genForm', component: GenForm },
  { path: '/genFormRef', component: GenFormRef },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;