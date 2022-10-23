import { reactive, ref, watchEffect, watch, onMounted, type Ref } from 'vue';
import { useOffsetPagination } from '@vueuse/core';

interface Option {
  page: number,
  pageSize: number,
  loadDataApi: () => Promise<{list: Array<any>, total: number}>
}

export const useFormData = (option: Option) => {
  const tableData = ref([]) as Ref<Array<any>>;
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
    page: option.page,
    pageSize: option.pageSize,
    onPageChange: async () => {
      await fetch()
    }
  });

  const fetch = async () => {
    const res = await option.loadDataApi();
    tableData.value = res.list;
    total.value = res.total;
  }

  onMounted(async () => {
    await fetch()
  });

  return {
    tableData,
    total,
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next,
    fetch,
  }
}