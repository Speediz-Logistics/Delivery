<script setup>
import { Offcanvas } from 'bootstrap';
import { onMounted, onUnmounted, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMapStore } from '@/store/map.js';
import { useExpressStore } from '@/store/expresss.js';
const store = useMapStore();
const data = ref({});
const route = useRoute();
const router = useRouter();
const offcanvasRef = ref();
let bsOffcanvas = null;
const expressStore = useExpressStore();

const props = defineProps({
  id: { type: String, default: 'offcanvas' }, // Default id as 'offcanvas'
});

const isPickedUp = ref(false);
const { pickup, completed } = expressStore;

const pickupBtn = async () => {
  isPickedUp.value = true; // Disable "Pick up" and show "Complete"
  await pickup({ id: id });
  showTracking();
};

const completeBtn = async () => {
  await completed({ id: id });
  showTracking();
  alert('Task Completed!');
  router.push({ name: 'express' });
};

const show = () => {
  showTracking();
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).show();
};

const hide = () => {
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).hide();
};

const toggle = () => {
  Offcanvas.getOrCreateInstance(document.querySelector('#' + props.id)).toggle();
};

//update content
const updateContent = async (number) => {
  id.value = number;
  console.log('Update content:', number);
};

const showTracking = async () => {
  const response = await store.all(id.value);
  console.log('Tracking data:', response.data);
  data.value = response.data || [];
};

const isShow = () => {
  if (!document.querySelector('#' + props.id)) {
    return false;
  }
  return Offcanvas.getInstance(document.querySelector('#' + props.id))._isShown;
};

onMounted(() => {
  bsOffcanvas = new Offcanvas(offcanvasRef.value, {
    backdrop: false,
    scroll: true,
  });
});

onUnmounted(() => {
  bsOffcanvas = null;
});

defineExpose({
  show,
  hide,
  toggle,
  updateContent,
});
</script>

<template>
  <div
    id="offcanvas"
    ref="offcanvasRef"
    class="offcanvas offcanvas-bottom"
    tabindex="-1"
    aria-labelledby="offcanvasLabel"
  >
    <div class="offcanvas-body small">
      <!-- Package Information Section -->
      <div class="package-info">
        <!-- Package ID and Status -->
        <div class="d-flex justify-content-between align-items-center pb-3">
          <span class="label"><strong>Package's number:</strong><br />{{ data.number }}</span>
          <span class="value">{{ data.status }}</span>
        </div>

        <!-- Vendor and Customer Names -->
        <div class="d-flex justify-content-between align-items-center pb-3">
          <span class="label">{{ data.vendor?.business_name }}</span>
          <font-awesome-icon :icon="['fas', 'greater-than']" class="arrow-icon" />
          <span class="label">{{ data.customer?.last_name }} {{ data.customer?.last_name }}</span>
        </div>

        <!-- Contact Numbers -->
        <div class="d-flex justify-content-between align-items-center pb-3">
          <div>
            <p class="label">Sender's Number</p>
            <p class="data">{{ data.vendor?.contact_number }}</p>
          </div>
          <div>
            <p class="label">Receiver's Number</p>
            <p class="data">{{ data.customer?.phone }}</p>
          </div>
        </div>

        <!-- Location -->
        <div class="info-row pb-3">
          <span class="label">Location: {{ data.customer?.address }}</span>
        </div>
        <!--
        <div class="pb-3">
          Payment Status:
          <el-select
            v-model="value"
            clearable
            placeholder="Select"
            class="w-25"
          >
            <el-option
              :key
              :label="Unpaid"
              :value="uunpaid"
            />
            <el-option
              :key
              :label="Paid"
              :value="paid"
            />
          </el-select>
        </div>
        -->
        <div class="pb-3">Package cost: {{ data.package?.price }}</div>
        <div class="pb-3">Delivery Fee: {{ data.package?.delivery_fee }}</div>

        <!-- View Details Button -->
        <div class="details-button-container pb-3 d-flex justify-content-between align-items-center gap-3">
          <button class="cancel" @click="hide">Cancel</button>
          <button v-if="!isPickedUp" class="details-button" @click="pickupBtn">Pick up</button>
          <button v-if="isPickedUp" class="details-button" @click="completeBtn">Complete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional custom styles for bottom-offcanvas */
.offcanvas-bottom {
  top: auto;
  bottom: 0;
}

/* Package Info Styling */
.package-info {
  padding: 1rem;

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
    .details-button,
    .cancel {
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
      .cancel {
        width: 100%;
        font-size: 0.9rem;
        background-color: #6c6c6c;
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
      .details-button,
      .cancel {
        padding: 0.4rem;
      }
    }
  }
}
.data {
  color: #6c6c6c;
  padding: 5px;
}
.value {
  padding: 0.5rem;
  color: rgba(255, 189, 100, 1);
  background-color: rgba(255, 190, 100, 0.1);
  border-radius: 5px;
}
</style>
