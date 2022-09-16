import { defineComponent, ref, onUpdated } from 'vue';
import type { Ref } from 'vue';

import './009_listLoadMoreStyle.css'

// 学习制作一个无线滚动列表
export const TestListLoadMoreComposable = /*#__PURE__*/  defineComponent({
  name: "TestListLoadMoreComposable",
  setup() {
    return () => {
      return (<div class='test-container'>
        <p>TestListLoadMoreComposable</p>
        <ListLoadMoreComposable />
      </div>)
    }
  }
})

function useLoadMore() {
  // 列表数据
  const listData = ref<{list: Array<number>}>({
    list: [0,1,2]
  })
  // 当前页数
  const index = ref(0)

  // 加载下一页
  const next = () => {
    setTimeout(() => {
      if (index.value < 10) {
        listData.value.list.push(listData.value.list.length)
        listData.value.list.push(listData.value.list.length)
        listData.value.list.push(listData.value.list.length)
        index.value += 1;
      }
    }, 200);
  }

  return [listData, index, next]
}

const ListLoadMoreComposable = /*#__PURE__*/  defineComponent({
  name: "ListLoadMoreComposable",
  setup() {
    const [listData, index, next] = useLoadMore()

    onUpdated(() => {
      console.info('onUpdated', index)
    });

    const  onscroll = (event: any) => {
      // 在这里出发加载更多
      if (event.target.scrollHeight - event.target.scrollTop === event.target.offsetHeight) {
        (next as ()=> void)()
      }
    }

    return () => {
      return (<div onScroll={onscroll} class='list'>
      {(listData as Ref<{list: Array<number>}>).value.list.map(name => {
        return renderItem(name.toString())
      })}
    </div>)
    }
  }
})

function renderItem(name: String) {
  return <div class='render-item'>{name}</div>
}