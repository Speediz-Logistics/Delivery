import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import ExpressService from '@/services/ExpressService.js';
import CompletedService from "@/services/CompletedService.js";
import PickupService from "@/services/PickupService.js";

// Export action name
export const useExpressStore = defineStore('express', () => {
  const data = ref([]); // The state for storing fetched data

  // Fetch all express items
  const fetchExpress = async (params) => {
    try {
      const response = await ExpressService.index(params);
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
      const response = await ExpressService.show(id);
      data.value = response?.data || [];
      return response;
    } catch (error) {
      console.error(`Error fetching express data for id ${id}:`, error);
      return null;
    }
  };

  // Mark an express item as picked up
  const pickup = async (params) => {
    try {
      const response = await PickupService.store(params);
      data.value = response?.data || [];
      return response;
    } catch (error) {
     console.log(error);
    }
  };

  // Mark an express item as completed
  const completed = async (params) => {
    try {
      const response = await CompletedService.store(params);
      data.value = response?.data || [];
      return response;
    } catch (error) {
      console.error( error);
    }
  };

  // Expose the reactive data and methods
  return {
    data: computed(() => data),
    fetchExpress,
    show,
    pickup,
    completed,
  };
});
