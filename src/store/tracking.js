import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import TrackingService from '@/services/TrackingService.js';

// export action name
export const useTrackingStore = defineStore('tracking', () => {
  const data = ref([]);
  const post = async (params) => {
    const response = await TrackingService.store(params);
    data.value = response?.data || []; // Store fetched data in state
    return response;
  };

  return {
    data: computed(() => data),
    post,
  };
});
