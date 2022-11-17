import { defineComponent } from 'vue'

// 例子 4. 用对象定义props
const objectPropsComponent = defineComponent(
  {
    props: {
      name: String,
      age: {
        type: Number,
        required: true,
      },
      address: {
        type: String
      },
      booleanTest: Boolean,
      booleanTypeTest: {
        type: Boolean
      }
    },
    setup(props) {
      return {
        name: props.name,
        age: props.age
      }
    }
  }
)