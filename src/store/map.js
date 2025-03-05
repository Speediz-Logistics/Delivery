import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import MapService from '@/services/MapService.js';

// export action name
export const useMapStore = defineStore('map', () => {
  const data = ref();
  const all = async (id) => {
    const response = await MapService.show(id);
    data.value = response?.data || []; // Store fetched data in state
    return response;
  };

  return {
    all,
    data: computed(() => data),
  };
});
