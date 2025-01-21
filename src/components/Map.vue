<template>
  <div id="map-container">
    <button
      class="btn btn-primary offcanvas-btn"
      type="button"
      @click="toggleOffcanvas"
      style="position: absolute; bottom: 20px; left: 20px; z-index: 10"
    >
      +
    </button>

    <MapOffcanvas ref="offcanvasRef" />

    <div id="map" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import MapboxDirection from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import useEnv from '../composables/useEnv.js';
import MapOffcanvas from '@/components/MapOffcanvas.vue';
import { useTrackingStore } from '@/store/tracking.js';
import {useRoute} from "vue-router";

const { post } = useTrackingStore();

const offcanvasRef = ref(null); // Reference to MapOffcanvas
const route = useRoute();
const id = route.params.id;

const props = defineProps({
  lat: {
    type: Number,
    default: 0, // Default latitude
  },
  lng: {
    type: Number,
    default: 0, // Default longitude
  },
});

const { APP_MAP_BOX_TOKEN } = useEnv(); // Fetching the Mapbox token
const mapboxToken = APP_MAP_BOX_TOKEN; // Mapbox access token

const toggleOffcanvas = () => {
  offcanvasRef.value.show(); // Call showOffcanvas method
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
  mapboxgl.accessToken = mapboxToken;

  // Initialize Mapbox map
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [props.lng, props.lat], // Use default coordinates from props
    zoom: 14, // Zoom closer for better visibility
  });

  // Add navigation control
  map.addControl(new mapboxgl.NavigationControl());

  // Create a marker for the delivery man (initially positioned at the default coordinates)
  const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([props.lng, props.lat]) // Set the marker at the default coordinates
    .addTo(map);

  // Add Geolocation Control to track current location
  const geolocate = new mapboxgl.GeolocateControl({
    trackUserLocation: true, // Automatically tracks the user's location
    showUserLocation: true, // Display user's location on the map
  });

  map.addControl(geolocate);

  // Create MapboxDirections instance
  const directions = new MapboxDirection({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving-traffic',
    alternatives: true,
    geometries: false,
    controls: { instructions: false },
    flyTo: false,
  });

  map.addControl(directions, 'top-left');

  // Ensure directions are set after control is added to the map
  map.on('load', () => {
    // Set the destination (Point B) from props (default values)
    directions.setDestination([props.lng, props.lat]);

    // Use the current marker as Point A (Origin)
    directions.setOrigin([marker.getLngLat().lng, marker.getLngLat().lat]);

    // Modify the style of the route line after it's loaded
    const routeLayer = map.getLayer('directions-route');
    if (routeLayer) {
      map.setPaintProperty('directions-route', 'line-width', 2); // Set thinner line width (default is 5)
    }
  });

  // Listen for geolocation updates and move marker accordingly
  map.on('geolocate', (e) => {
    const { longitude, latitude } = e.coords;
    marker.setLngLat([longitude, latitude]); // Update marker position
    // Update the origin for directions after the marker position is updated
    directions.setOrigin([longitude, latitude]);
  });

  // Optional: If you want to get the user's location directly without geolocation control:
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
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
});
</script>

<style scoped></style>
