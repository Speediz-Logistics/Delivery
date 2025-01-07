import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import ExpressService from '@/services/ExpressService.js';

// export action name
export const useExpressStore = defineStore('express', () => {
  const data = ref([]);
  const fetchExpress = async () => {
    const response = await ExpressService.index();
    data.value = response?.data || []; // Store fetched data in state
    return response;
  };

  return {
    data: computed(() => data),
    fetchExpress,
  };
});
