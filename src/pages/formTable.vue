<template>
  <el-form :model="filterData">
    <el-form-item label="城市省份">
      <el-col :span="12">
        <el-select clearable v-model="filterData.province" placeholder="please select your province">
          <el-option v-for="province in provinces" :label="province" :value="province" />
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select clearable v-model="filterData.city" placeholder="please select your city">
          <el-option v-for="city in cities" :label="city" :value="city" />
        </el-select>
      </el-col>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
    
  </el-form>
  <!-- 列表 -->
  <div>
    <span v-for="data in tableData">{{`${data}-`}}</span>
  </div>
  <div>
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="currentPageSize"
      :total="total"
      layout="prev, pager, next, jumper"
       />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect, watch, onMounted } from 'vue';
import { useOffsetPagination } from '@vueuse/core';
import { ElPagination } from 'element-plus';

const filterData = reactive<{province?: string, city?: string,}>({
  province: undefined,
  city: undefined,
});
watch(() => filterData.province, () => {
  // 重制城市
  filterData.city = undefined;
}, {deep: false})
const tableData = ref([]);
const total = ref(0);

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
  onPageChange: async () => {
    await fetch();
  }
});

// 获取数据
const fetch = async () => {
  const res = await loadDataMock(currentPage.value-1, filterData.city);
  tableData.value = res.list;
  total.value = res.total;
}

const search = async () => {
  currentPage.value = 1;
  await fetch();
}

onMounted(async () => {
  await fetch();
});


// mock数据
const provinces = ref(['provinces1', 'provinces2', 'provinces3']);
const cities = ref(['city1', 'city2', 'city3']);
const loadDataMock = (currentPage: number, city?: string, pageSize: number = 10): Promise<any> => {
  const total = 50;
  return new Promise((resolve, reject) => {
    if (currentPage >= 0 && currentPage <5) {
      resolve({
        list: [...Array(currentPage*pageSize+pageSize).keys()]
        .slice(currentPage*pageSize).map(i => city? city+i : i),
        total
      });
    }
    else {
      reject("溢出");
    }
  });
}
</script>

<style>
</style>