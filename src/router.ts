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
import MultiVueInstances from './pages/009_multi_vue_instances.vue'
import HFuncUpdate from './pages/010_h_func_update'
import SlotOfList from './pages/011_slot_of_list.vue'
import HWithWatch from './pages/012_h_with_watch'
import DataDispatchRecursive from './pages/012_data_dispatch_recursive'
import Provider from './pages/014_provider'
import Cssvar from './pages/015_css_var.vue'
import ShareIdProvider from './pages/016_share_id_provider.vue'
import Iframe from './pages/017_iframe.vue'
import IframeChild from './pages/017_iframe_child.vue'
import Swiper from './pages/018_swiper.vue'
import MultiPage from './pages/019_multi_page'
import Reactive from './pages/020_reactive.vue'
import TravelVueTree from './pages/021_travel_vue_tree.vue'
import ImageAsBg from './pages/022_image_as_bg.vue'

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
  { path: '/009_multi_vue_instances', component: MultiVueInstances},
  { path: '/010_h_func_update', component: HFuncUpdate},
  { path: '/011_slot_of_list', component: SlotOfList},
  { path: '/012_h_with_watch', component: HWithWatch},
  { path: '/012_data_dispatch_recursive', component: DataDispatchRecursive},
  { path: '/014_provider', component: Provider},
  { path: '/015_css_var', component: Cssvar},
  { path: '/016_share_id_provider', component: ShareIdProvider},
  { path: '/017_iframe', component: Iframe},
  { path: '/017_iframe_child', component: IframeChild},
  { path: '/018_swiper', component: Swiper},
  { path: '/019_multi_page', component: MultiPage},
  { path: '/020_reactive', component: Reactive},
  { path: '/021_travel_vue_tree', component: TravelVueTree},
  { path: '/022_image_as_bg', component: ImageAsBg},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
