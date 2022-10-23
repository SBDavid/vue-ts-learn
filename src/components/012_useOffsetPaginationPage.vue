<template>
  <div>
    <!-- 列表 -->
    <div>
      <span v-for="data in tableData">{{`${data}-`}}</span>
    </div>
    <!-- 简单分页按钮 -->
    <div>
      <button @click="prev" :disabled="isFirstPage">prev</button>
      <button
        v-for="item in pageCount"
        :key="item"
        :disabled="currentPage === item"
        @click="currentPage = item"
      >
        {{ item }}
      </button>
      <button @click="next" :disabled="isLastPage">next</button>
    </div>
    <!-- element-plus -->
    <div>
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="currentPageSize"
      :total="total"
      layout="prev, pager, next, jumper"
       />
    </div>
  </div>
</template>

<script lang="ts" setup>
/* 目标：
1. 可以分页
2. 跳转
3. 重置 */

import { ref, onMounted, watchEffect, watch } from 'vue';
import { useOffsetPagination } from '@vueuse/core';
import { ElPagination } from 'element-plus';

// mock接口
const loadDataMock = (currentPage: number, pageSize: number = 10): Promise<any> => {
  const total = 50;
  return new Promise((resolve, reject) => {
    if (currentPage >= 0 && currentPage <5) {
      resolve({
        list: [...Array(currentPage*pageSize+pageSize).keys()].slice(currentPage*pageSize),
        total
      });
    }
    else {
      reject("溢出");
    }
  });
}


// 表格数据
let tableData = ref([]);
let total = ref(0);

const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: total,
  page: 1,
  pageSize: 10,
  onPageChange: async (arg) => {
    tableData.value = (await loadDataMock(arg.currentPage-1)).list;
  }
});

watchEffect(() => {
  console.info('currentPage, watchEffect', currentPage.value, total.value, pageCount.value);
});

onMounted(async () => {
  const res = (await loadDataMock(0));
  tableData.value = res.list;
  total.value = res.total;
});



</script>

<style scoped>
</style>