<script setup>
import { ref, onMounted } from 'vue';
import { useExpressStore } from '@/store/expresss.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useExpressStore();
const data = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref("")

const fetchExpress = async (page=1, search)     => {
  try {
    const params = {
      page,
      search: search?? searchQuery.value,
    };
    const response = await store.fetchExpress(params);
    if (response && response.data) {
      data.value = response.data.data[Object.keys(response.data.data)[0]]; // Access data dynamically
      totalPages.value = response.data.last_page; // Set the total number of pages
    } else {
      console.error("No data found");
    }
  } catch (error) {
    console.error("Error fetching express data:", error);
  }
};
// Search handler
const handleSearch = () => {
  fetchExpress(1, searchQuery.value); // Fetch data with search query starting at page 1
};
//backhome
const backTo = () => {
  router.push({name: 'onboard-Screen'})
}

//viewDetail
const handleTracking = (id) => {
  router.push({name: 'map', params: { id }})
}

onMounted(() => {
  fetchExpress();
});
</script>

<template>
  <!-- Header Section -->
  <div class="header">
    <p class="cursor-pointer" @click="backTo">
      <font-awesome-icon :icon="['fas', 'arrow-left']" class="icon" />
    </p>
    <p class="title">Express</p>
  </div>
  <!-- Input Section -->
  <div class="input-section">
    <input v-model="searchQuery" placeholder="Enter package number" class="input-field" @keyup.enter="handleSearch"/>
  </div>
  <!-- Package Information Section -->
  <div class="express-container">
    <div class="package-info" v-for="(info, index) in data" :key="index">
      <!-- Package ID and Status -->
      <div class="d-flex justify-content-between align-items-center pb-3">
        <span class="label">{{ info.number }}</span>
        <span class="value">{{ info.status }}</span>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="filteredTotal"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<style scoped lang="scss">
/* General Container Styling */
.express-container {
  padding: 1rem;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

/* Header Styling */
.header {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  .icon {
    font-size: 1.2rem;
    color: #333;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
}

/* Input Section Styling */
.input-section {
  margin-bottom: 1.5rem;

  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: #007bff;
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

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    grid-template-columns: auto auto;
    gap: 0.5rem;

    .title {
      font-size: 1.2rem;
    }
  }

  .input-section {
    padding: 10px;
    .input-field {
      font-size: 1rem;
      padding: 0.5rem;
      height: 40px;
    }
  }

  .package-info {
    .info-row {
      grid-template-columns: 1fr;
      gap: 0.5rem;

      .label,
      .value {
        font-size: 0.9rem;
      }

      .arrow-icon {
        display: none;
      }
    }

    .details-button-container {
      .details-button {
        width: 100%;
        font-size: 0.9rem;
      }
    }
  }
}

@media (max-width: 480px) {
  .header {
    grid-template-columns: auto 1fr;

    .title {
      font-size: 1rem;
    }
  }

  .input-section {
    .input-field {
      font-size: 0.8rem;
      padding: 0.4rem;
    }
  }

  .package-info {
    .info-row {
      .label,
      .value {
        font-size: 0.8rem;
      }
    }

    .details-button-container {
      .details-button {
        padding: 0.4rem;
      }
    }
  }
}
.data{
  color: #6C6C6C;
  padding: 5px;
}
.value{
  padding: 0.5rem;
  color: rgba(255, 189, 100, 1);
  background-color: rgba(255, 190, 100, 0.1);
  border-radius: 5px;
}
</style>
