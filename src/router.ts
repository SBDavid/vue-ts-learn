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
import GetDeepChildRef from './pages/002_getDeepChildRef.vue'
import GridDemo from './pages/003_grid.vue'
import InheritAttrs from './pages/004_inheritAttrs.vue'
import GlobalState from './pages/005_global_state.vue'
import GlobalState1 from './pages/005_global_state1.vue'
import SktContainer from './pages/006_skt_container_app.vue'
import ExtendVueApi from './pages/007_extend_vue_api.vue'
import DataService from './pages/008_data_service.vue'

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
  { path: '/002_getDeepChildRef', component: GetDeepChildRef},
  { path: '/003_gridDemo', component: GridDemo},
  { path: '/004_inheritAttrs', component: InheritAttrs},
  { path: '/005_global_state', component: GlobalState},
  { path: '/005_global_state1', component: GlobalState1},
  { path: '/006_skt_container', component: SktContainer},
  { path: '/007_extend_vue_api', component: ExtendVueApi},
  { path: '/008_data_service', component: DataService},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;