<script setup>
import {useRouter , useRoute} from 'vue-router'
import {useHistoryStore} from "@/store/history.js";
import {ElMessage} from "element-plus";

const history = useHistoryStore();
const route = useRoute();
const router = useRouter();
const { show } = history;
const data = ref({});
const showHistory = async (id) => {
  try{
    const response = await show(id);
    data.value = response.data || {}
  }catch(error){
    ElMessage.error('Show history failed',error.message);
    console.log('Show history failed',error);
  }
}

//back home
const backTo = () => {
  router.push({name: 'history'})
}

//status highlight
const statusClass = (status) => {
  return {
    'status-completed': status === 'completed',
    'status-cancelled': status === 'cancelled',
  };
};
onMounted (() => {
  const id = route.params.id;
  showHistory(id);
})
</script>

<template>
    <div class="text-start p-3" @click="backTo()">

      <font-awesome-icon :icon="['fas', 'arrow-left']" /> History Detail
    </div>
  <!-- Package Information Section -->
  <div class="express-container">
    <div class="package-info" v-if="Object.keys(data).length">
      <!-- Package ID and Status -->
      <div class="d-flex justify-content-between align-items-center pb-3">
        <span class="label">Package No: {{ data.number }}</span>
        <span class="value" :class="statusClass(data.status)">{{ data.status }}</span>
      </div>

      <!-- Vendor and Customer Names -->
      <div class="d-flex justify-content-between align-items-center pb-3">
        <span class="label">{{ data.vendor.business_name }}</span>
        <font-awesome-icon :icon="['fas', 'greater-than']" class="arrow-icon" />
        <span class="label">{{ data.customer.first_name }} {{ data.customer.last_name }}</span>
      </div>

      <!-- Contact Numbers -->
      <div class="d-flex justify-content-between align-items-center pb-3">
        <div>
          <p class="label">Sender's Number</p>
          <p class="data">{{ data.vendor.contact_number }}</p>
        </div>
        <div>
          <p class="label">Receiver's Number</p>
          <p class="data">{{ data.customer.phone }}</p>
        </div>
      </div>

      <!-- Location -->
      <div class="info-row pb-3">
        <span class="label">Location: {{ data.location.location }}</span>
      </div>

      <!--Description-->
      <div class="bg-dark bg-opacity-25 p-3 rounded  mb-3">
        <div class="fw-bold">Description:</div>
        <div class="text-black-50 fe-bold">{{data.description}}</div>
      </div>

      <!-- Contact Numbers -->
      <div class="d-flex justify-content-between align-items-center pb-3">
        <div>
          <p class="label">Delivered at:</p>
          <p class="data">{{ data.delivered_at }}</p>
        </div>
        <div>
          <p class="label">Receiver's Number</p>
          <p class="data">{{ data.customer.phone }}</p>
        </div>
      </div>

      <!--Package price-->
      <div class="d-flex justify-content-between align-items-center pb-3 fw-bold">
        <div>
          Package price($)
        </div>
        <div>
          $ {{data.price}}
        </div>
      </div>
      <!--delivery fee-->
      <div class="d-flex justify-content-between align-items-center pb-3 fw-bold">
        <div>
          Delivery Fee
        </div>
        <div>
          $ {{data.shipment?.delivery_fee}}
        </div>
      </div>
      <!-- View Details Button -->
      <div class="details-button-container pb-3 ">
        <button class="details-button" @click="backTo()">Close</button>
      </div>
    </div>
  </div>
</template>

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
