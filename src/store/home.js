import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import HomeService from '@/services/HomeService.js';

// export action name
export const useHomeStore = defineStore('home', () => {
  const data = ref([]);
  const fetchPackage = async (params) => {
    const response = await HomeService.index(params);
    data.value = response?.data || []; // Store fetched data in state
    return response;
  };

  return {
    data: computed(() => data),
    fetchPackage,
  };
});
