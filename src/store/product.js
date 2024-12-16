import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import ProductService from '@/services/ProductService.js';

// export action name
export const useProductStore = defineStore('product', () => {
  const data = ref([]);
  const all = async () => {
    const response = await ProductService.index();
    data.value = response?.data?.products || []; // Store fetched data in state
    return response;
  };

  return {
    all,
    data: computed(() => data),
  };
});
