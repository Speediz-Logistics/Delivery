<template>
  <div class="screen d-flex flex-column">
    <div class="text-start" @click="backTo()">

      <font-awesome-icon :icon="['fas', 'arrow-left']" /> History
    </div>
    <div>
      <input v-model="searchQuery" placeholder="Enter package number" @keyup.enter="handleSearch"/>
    </div>
    <div class="d-flex justify-content-center align-items-center gap-3">
      <button @click="filterByStatus('all')">All</button>
      <button @click="filterByStatus('cancelled')">Cancelled</button>
      <button @click="filterByStatus('completed')">Completed</button>
    </div>
    <div>
      <p>Amount: {{ totalItems}}</p>
    </div>
    <!-- Package Information Section -->
    <div class="express-container">
      <div class="package-info" v-for="(info, index) in filteredData" :key="index">
        <!-- Package ID and Status -->
        <div class="d-flex justify-content-between align-items-center pb-3">
          <span class="label">Package No:{{ info.number }}</span>
          <span class="value" :class="statusClass(info.status)">{{ info.status }}</span>
        </div>

        <!-- Vendor and Customer Names -->
        <div class="d-flex justify-content-between align-items-center pb-3">
          <span class="label">{{info.vendor?.business_name}}</span>
          <font-awesome-icon :icon="['fas', 'greater-than']" class="arrow-icon" />
          <span class="label">{{info.customer?.first_name}}  {{info.customer?.first_name}}</span>
        </div>

        <!-- Contact Numbers -->
        <div class="d-flex justify-content-between align-items-center pb-3">
          <div>
            <p class="label">Sender's Number</p>
            <p class="data">{{info.vendor?.contact_number}}</p>
          </div>
          <div>
            <p class="label">Receiver's Number</p>
            <p class="data">{{info.customer?.phone}}</p>
          </div>
        </div>

        <!-- Location -->
        <div class="info-row pb-3">
          <span class="label">Location: {{info.location.location}}</span>
        </div>

        <!-- View Details Button -->
        <div class="details-button-container pb-3">
          <button class="details-button"  @click="handleTracking(info.id)">View Details</button>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div class="pagination mt-3 d-flex justify-content-center">
      <button v-if="!isLastPage" @click="loadMore">See more</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useHistoryStore } from "@/store/history.js";
import { ref, onMounted, computed } from "vue";

const router = useRouter();
const searchQuery = ref("");
const dataList = ref([]);
const filteredData = ref([]); // Filtered data to display
const historyStore = useHistoryStore();
const currentStatus = ref("all");
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(5); // Number of items per page
const isLastPage = ref(false);


// Fetch package data from API with optional search query
const fetchPackage = async (page = 1, search = "") => {
  try {
    const params = { page, search: search || searchQuery.value, per_page: pageSize.value };
    const response = await historyStore.fetchHistory(params);

    const newPackages = response.data?.data || [];
    totalItems.value = response.data?.total || 0;

    // Append new data
    dataList.value = page === 1 ? newPackages : [...dataList.value, ...newPackages];
    filteredData.value = [...dataList.value];

    // Check if this is the last page
    isLastPage.value = newPackages.length < pageSize.value;
  } catch (error) {
    console.error("Failed to fetch package data:", error);
  }
};

// Load more data
const loadMore = () => {
  if (!isLastPage.value) {
    currentPage.value += 1;
    fetchPackage(currentPage.value, searchQuery.value);
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
//backhome
const backTo = () => {
  router.push({name: 'onboard-Screen'})
}

//viewDetail
const handleTracking = (id) => {
  router.push({name: 'history-detail', params: { id }})
}

//status highlight
const statusClass = (status) => {
  return {
    'status-completed': status === 'completed',
    'status-cancelled': status === 'cancelled',
  };
};

// Initialize data on mount
onMounted(() => {
  fetchPackage();
});

</script>

<style scoped lang="scss">
.status-completed {
  background-color: rgba(0, 128, 0, 0.3);
  color: green;
  font-weight: bold;
  padding: 0.3em;
  border-radius: 0.3em;
}

.status-cancelled {
  background-color: rgba(255, 0, 0, 0.45);
  color: red;
  font-weight: bold;
  padding: 0.3em;
  border-radius: 0.3em;
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

/* Package Info Styling */
.package-info {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .info-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;

    .label {
      font-size: 1rem;
      color: #555;
      word-wrap: break-word;
    }

    .value {
      font-size: 1rem;
      font-weight: bold;
      color: #333;
    }

    .arrow-icon {
      justify-self: center;
      font-size: 1rem;
      color: #999;
    }
  }

  .details-button-container {
    text-align: center;

    .details-button {
      background-color: #007bff;
      color: #fff;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #0056b3;
      }
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
