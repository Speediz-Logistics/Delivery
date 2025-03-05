<script setup>
import Map from "@/components/Map.vue";
import { onMounted, ref } from 'vue';
import axios from 'axios';

const currentLocation = ref({ lat: null, lng: null, address: 'Fetching location...' });

const getCurrentLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error('Error fetching location:', error);
        currentLocation.value.address = 'Location access denied';
      },
    );
  } else {
    currentLocation.value.address = 'Geolocation not supported';
  }
};

const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    currentLocation.value = {
      lat,
      lng: lon,
      address: response.data.display_name || 'Unknown location',
    };
  } catch (error) {
    console.error('Error with reverse geocoding:', error);
    currentLocation.value.address = 'Failed to retrieve location';
  }
};

onMounted(() => {
  getCurrentLocation();
});
</script>

<template>
  <Map :lat="currentLocation.lat" :lng="currentLocation.lng" />
</template>

<style scoped lang="scss"></style>
