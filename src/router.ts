import { createRouter, createWebHistory } from 'vue-router';

import App from './pages/App.vue';
import FormTable from './pages/formTable.vue';
import FormTableWithUse from './pages/formTableWithUse.vue';
import GenForm from './pages/genForm.vue';
import GenFormRef from './pages/genFormRef.vue';
import Test_stack from './pages/013_test_stack.vue';
import FormilyLogin from './pages/formilyLogin.vue';
import TestCarManage from './pages/testCarManage.vue';
import TestDefineComponent from './pages/001TestDefineComponent';

const routes = [
  { path: '/app', component: App },
  { path: '/formTable', component: FormTable },
  { path: '/formTableWithUse', component: FormTableWithUse },
  { path: '/genForm', component: GenForm },
  { path: '/genFormRef', component: GenFormRef },
  { path: '/013_test_stack', component: Test_stack },
  { path: '/formilyLogin', component: FormilyLogin },
  { path: '/testCarManage', component: TestCarManage },
  { path: '/001TestDefineComponent', component: TestDefineComponent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;