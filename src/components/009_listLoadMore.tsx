import { defineComponent, reactive, onMounted } from 'vue';

import './009_listLoadMoreStyle.css'

// 学习制作一个无线滚动列表
export const TestListLoadMore = /*#__PURE__*/  defineComponent({
  name: "TestListLoadMore",
  setup() {
    return () => {
      return (<div class='test-container'>
        <p>TestListLoadMore</p>
        <ListLoadMore />
      </div>)
    }
  }
})

const ListLoadMore = /*#__PURE__*/  defineComponent({
  name: 'ListLoadMore',
  setup() {

    // 列表数据
    const listData = reactive<{list: Array<number>}>({
      list: [0, 1, 2]
    })

    // 数据初始化
    onMounted(() => {
      listData.list.push(3)
    })

    // 对滚动的监听
    const  onscroll = (event: any) => {
      // console.info('onscroll', event);

      if (event.target.scrollHeight - event.target.scrollTop === event.target.offsetHeight) {
        console.info("到底了, 现在加载更多")
        setTimeout(() => {
          listData.list.push(listData.list.length)
          listData.list.push(listData.list.length)
          listData.list.push(listData.list.length)
        }, 200);
      }
    } 

    return () => {
      return (<div onScroll={onscroll} class='list'>
        {listData.list.map(name => {
          return renderItem(name.toString())
        })}
      </div>)
    }
  }
})

function renderItem(name: String) {
  return <div class='render-item'>{name}</div>
}
