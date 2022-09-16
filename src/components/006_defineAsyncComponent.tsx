import { defineAsyncComponent } from 'vue';

export default defineAsyncComponent(() => {
  return import('./004_slot')
})