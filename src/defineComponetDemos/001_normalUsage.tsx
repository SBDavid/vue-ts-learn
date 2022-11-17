import { defineComponent } from 'vue'

export const MyComponent =  /*#__PURE__*/ defineComponent(
  {
    props: {
      name: String, // 并没有制定类型，这里是值
      age: {default: 18}, // 如何知道类型是 number，如何知道是非必选
      address: { required: true }, // 如何知道是必选
    },
    setup(props) {
      return () => {
        return <div>
          <div>{props.name}</div>
          <div>{props.age}</div>
          <div>{props.address}</div>
        </div>
      }
    }
  }
)

defineComponent(
  () => {
    return () => {
      return (<div>
        <MyComponent name='name' age={18} address='shanghai' />
      </div>)
    }
  }
)