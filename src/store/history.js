import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import HistoryService from '@/services/HistoryService.js';

// Export action name
export const useHistoryStore = defineStore('history', () => {
  const data = ref([]); // The state for storing fetched data

  // Fetch all express items
  const fetchHistory = async (params) => {
    try {
      const response = await HistoryService.index(params);
      data.value = response?.data || []; // Store fetched data in state
      return response;
    } catch (error) {
      console.error("Error fetching express data:", error);
      return null;
    }
  };

  // Show details of a specific express item
  const show = async (id) => {
    try {
      const response = await HistoryService.show(id);
      data.value = response?.data || [];
      return response;
    } catch (error) {
      console.error(`Error fetching express data for id ${id}:`, error);
      return null;
    }
  };

  // Expose the reactive data and methods
  return {
    data: computed(() => data),
    fetchHistory,
    show,
  };
});
