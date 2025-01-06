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

const offcanvasRef = ref(null); // Reference to MapOffcanvas

const props = defineProps({
  lat: {
    type: Number,
    default: 0, // Default latitude
  },
  lng: {
    type: Number,
    default: 0, // Default longitude
  },
  title: {
    type: String,
    default: 'Delivery Details', // Default title
  },
  content: {
    type: String,
    default: 'Your order is on the way!', // Default content
  },
});

const { APP_MAP_BOX_TOKEN } = useEnv(); // Fetching the Mapbox token
const mapboxToken = APP_MAP_BOX_TOKEN; // Mapbox access token

const toggleOffcanvas = () => {
  offcanvasRef.value.show(); // Call showOffcanvas method
  offcanvasRef.value.updateContent({
    title: props.title,
    content: props.content,
  }); // Update the title
};

onMounted(() => {
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

  map.on('click', (e) => {
    // Update the destination (Point B) when the user clicks on the map
    directions.setDestination([e.lngLat.lng, e.lngLat.lat]);
  });

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
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      marker.setLngLat([longitude, latitude]); // Set the marker at the current location
      map.setCenter([longitude, latitude]); // Optionally, center the map on the user's location
      map.setZoom(14); // Optionally, zoom in for a closer view

      // Set the origin for directions after the marker position is updated
      directions.setOrigin([longitude, latitude]);
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
});
</script>

<style scoped></style>
