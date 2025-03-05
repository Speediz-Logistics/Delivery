<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxDirection from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import useEnv from '../composables/useEnv.js';
import { useTrackingStore } from '@/store/tracking.js';
import { useRoute } from 'vue-router';
import MapDetailOffcanvas from '@/components/MapDetailOffcanvas.vue';
import { Search, InfoFilled } from '@element-plus/icons-vue';
import { useMapStore } from '@/store/map.js';

const { post } = useTrackingStore();

const offcanvasRef = ref(null); // Reference to MapOffcanvas
const route = useRoute();
const id = route.params.id;
const { all } = useMapStore();
const search = ref('');
const res = ref(null);
const location = ref({
    lat: 11.550330240451537,
    lng: 104.94225625451682,
  });
const props = defineProps({
  lat: {
    type: Number,
    default: 11.550330240451537, // Default latitude
  },
  lng: {
    type: Number,
    default: 104.94225625451682, // Default longitude
  },
});

const handleSubmitSearch = async () => {
  if (!search.value) return;

  const { data } = await all(search.value);
  res.value = data;
  offcanvasRef.value.updateContent(search.value);

  console.log('Search data:', data);
  //11.559081393433932, 104.89722362091914
  location.value.lng = data.customer.lng;
  location.value.lat = data.customer.lat;
  handleMap();
};

const { APP_MAP_BOX_TOKEN } = useEnv(); // Fetching the Mapbox token
const mapboxToken = APP_MAP_BOX_TOKEN; // Mapbox access token

const toggleOffcanvas = () => {
  offcanvasRef.value.show(); // Call showOffcanvas method
};

const handleMap = () => {
  mapboxgl.accessToken = mapboxToken;

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [location.value.lng, location.value.lat],
    zoom: 14,
  });

  map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  const marker = new mapboxgl.Marker({ color: 'red' }).setLngLat([location.value.lng, location.value.lat]).addTo(map);

  const geolocate = new mapboxgl.GeolocateControl({
    trackUserLocation: true,
    showUserLocation: true,
  });

  map.addControl(geolocate, 'bottom-right');

  const directions = new MapboxDirection({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving-traffic',
    alternatives: true,
    geometries: false,
    controls: { instructions: false },
    flyTo: false,
  });

  map.addControl(directions, 'bottom-left');

  map.on('load', () => {
    directions.setDestination([location.value.lng, location.value.lat]); // Fixed Destination
    directions.setOrigin([marker.getLngLat().lng, marker.getLngLat().lat]);
  });

  map.on('geolocate', (e) => {
    const { longitude, latitude } = e.coords;
    marker.setLngLat([longitude, latitude]);
    directions.setOrigin([longitude, latitude]);
  });

  // **Prevent any click on the map from changing destination**
  map.on('click', (e) => {
    e.preventDefault();
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        marker.setLngLat([longitude, latitude]);
        map.setCenter([longitude, latitude]);
        map.setZoom(14);

        await postTracking({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Failed to get location. Please enable GPS.');
      },
    );
  }
};

const postTracking = async (data) => {
  try {
    const param = {
      package_id: id,
      lat: data.lat ?? 0,
      lng: data.lng ?? 0,
    };
    console.log('Tracking data:', param);
    const response = await post(param);
    return response;
  } catch (error) {
    console.error('Error fetching location:', error);
  }
};

onMounted(async () => {
  handleMap();
});
</script>

<template>
  <div id="map-container">
    <button
      v-if="res"
      class="btn btn-primary offcanvas-btn d-flex align-items-center gap-1"
      type="button"
      @click="toggleOffcanvas"
      style="position: absolute; top: 100px; left: 20px; z-index: 10"
    >
      <el-icon><InfoFilled /></el-icon>
      <span>info</span>
    </button>
    <div
      class="d-flex flex-column position-absolute gap-2 align-items-center"
      style="top: 20px; left: 20px; right: 20px; z-index: 10"
    >
      <h1>Map</h1>
      <div class="d-flex align-items-center">
        <el-input v-model="search" placeholder="Search Package number" class="search-input">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="handleSubmitSearch">Search</el-button>
      </div>
    </div>

    <MapDetailOffcanvas ref="offcanvasRef" />

    <div id="map" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<style scoped>
.search-input {
  width: 300px;
  padding: 10px;
  border-radius: 8px;
}
</style>
