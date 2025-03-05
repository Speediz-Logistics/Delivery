<template>
 <div class="screen d-flex flex-column">
   <div class="d-flex gap-3 align-items-center justify-content-between">
     <div class="d-flex flex-row align-items-center justify-content-between gap-3">
       <img src="@/assets/images/speediz-logo.png" alt="profile">
       <div>
         <div>Name: {{ data.driver_name }}</div>
         <div class="address-text my-2">Address: {{ currentLocation }}</div>
       </div>
     </div>
     <div>
       <font-awesome-icon :icon="['fas', 'bell']" />
     </div>
   </div>
   <div>
     <input v-model="searchQuery" placeholder="Enter package number" @keyup.enter="handleSearch"/>
   </div>
   <div class="navigate d-flex justify-content-center align-items-center gap-3">
     <Button class="text-center w-25" @click="handleExpress">
       <font-awesome-icon :icon="['fas', 'cube']" class="icon" />
       <br></br>Express
     </Button>
     <Button class="text-center w-25" @click="handleHistory">
       <font-awesome-icon :icon="['fas', 'file']" class="icon"/>
       <br></br>Report
     </Button>
     <Button class="text-center w-25 " @click="handleMap">
       <font-awesome-icon :icon="['fas', 'location-dot']" class="icon"/>
       <br></br>Map
     </Button>
   </div>
   <div class="text-start">
     Package List
   </div>
   <div class="d-flex justify-content-center align-items-center gap-3">
     <button @click="filterByStatus('all')">All</button>
     <button @click="filterByStatus('pending')">Pending</button>
     <button @click="filterByStatus('cancelled')">Cancelled</button>
     <button @click="filterByStatus('completed')">Completed</button>
   </div>
   <div>
     <p>Amount: {{ filteredTotal}}</p>
   </div>
   <div class="table-package">
     <el-table :data="filteredData" class="w-100">
       <el-table-column prop="number" label="Package ID" />
       <el-table-column prop="name" label="Name" />
       <el-table-column prop="created_at" label="Date" />
       <el-table-column prop="status" label="Status" />
     </el-table>
   </div>

   <!-- Pagination -->
   <div class="pagination mt-3 d-flex justify-content-center">
     <el-pagination
       background
       layout="prev, pager, next"
       :total="filteredTotal"
       :page-size="pageSize"
       :current-page="currentPage"
       @current-change="handlePageChange"
     />
   </div>
 </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useHomeStore } from "@/store/home.js";
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const router = useRouter();
const searchQuery = ref("");
const dataList = ref([]);
const filteredData = ref([]); // Filtered data to display
const homeStore = useHomeStore();
const currentStatus = ref("all");
const currentPage = ref(1);
const data = ref([]);
const currentLocation = ref("Fetching location...");

// Navigation handlers
const handleExpress = () => {
  router.push({ name: 'express' });
};
const handleHistory = () => {
  router.push({ name: 'history' });
};
const handleMap = () => {
  router.push({ name: 'map-index' });
};

// Fetch package data from API with optional search query
const fetchPackage = async (page = 1, search = "") => {
  try {
    const params = {
      page,
      search: search || searchQuery.value, // Pass the search query
    };

    const response = await homeStore.fetchPackage(params); // Ensure fetchPackage accepts params
    dataList.value = response.data?.packages?.data || []; // Extract the array of packages
    data.value = response.data; // Set data for offcanvas
    filteredData.value = [...dataList.value]; // Reset filtered data
  } catch (error) {
    console.error("Failed to fetch package data:", error);
  }
};

// Compute the total count dynamically
const filteredTotal = computed(() => {
  return filteredData.value.length;
});

// Filter data by status
const filterByStatus = (status) => {
  currentStatus.value = status;
  if (status === "all") {
    filteredData.value = [...dataList.value];
  } else {
    filteredData.value = dataList.value.filter((item) => item.status === status);
  }
};

// Search handler
const handleSearch = () => {
  fetchPackage(1, searchQuery.value); // Fetch data with search query starting at page 1
};

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchPackage(page, searchQuery.value); // Fetch data for the selected page with the current search query
};

const getCurrentLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
        currentLocation.value = "Location access denied";
      }
    );
  } else {
    currentLocation.value = "Geolocation not supported";
  }
};

const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    currentLocation.value = response.data.display_name || "Unknown location";
  } catch (error) {
    console.error("Error with reverse geocoding:", error);
    currentLocation.value = "Failed to retrieve location";
  }
};


// Initialize data on mount
onMounted(() => {
  fetchPackage();
  getCurrentLocation();
});

</script>

<style scoped lang="scss">
.address-text {
  font-size: 12px;
  color: #555;
}
.screen {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;

  @media (max-width: 400px) {
    padding: 10px;
  }
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ccc;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

.text-center {
  text-align: center;

  p {
    font-size: 12px;
    margin: 5px 0 0;
    color: #555;
  }
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  background-color: #f0f0f0;
  color: #555;

  &:hover {
    background-color: #e0e0e0;
  }

  &.active {
    background-color: #007aff;
    color: #fff;
  }
}

.el-table {
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .el-table-column {
    text-align: left;
    font-size: 14px;
  }
}

.text-start {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.font-awesome-icon {
  font-size: 24px;
}

.navigate {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    width: 25%; /* Matches w-25 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    background-color: #f5f5f5;
    color: #333;
    transition: all 0.3s ease;

    &:hover {
      background-color: #FFBD59; /* Light yellow */
      opacity: 0.7;
    }

    &:active {
      background-color: #FFBD59;
      opacity: 1;
    }

    .icon {
      font-size: 20px;
      color: #FFBD59;
      transition: color 0.3s ease;
    }

    &:hover .icon {
      color: white; /* Icon color changes on hover */
    }
  }
}

.table-package {
  margin-top: 20px;

  @media (max-width: 400px) {
    padding: 10px;
  }
}
</style>

