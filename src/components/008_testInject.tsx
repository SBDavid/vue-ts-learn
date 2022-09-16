import { defineComponent,inject } from 'vue';
import { key } from './007_testSetup'

export default defineComponent({
  inject: {},
  setup(props) {

    const count = inject(key);

    return () => {
      return (<div>
        inject val: {count?.value}
      </div>)
    }
  }
})