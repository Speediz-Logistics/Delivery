<script setup>
import { ref } from 'vue';

const isOffcanvasOpen = ref(false);

const toggleOffcanvas = () => {
  isOffcanvasOpen.value = !isOffcanvasOpen.value;
};
</script>

<template>
  <!-- Button to trigger offcanvas -->
  <button
    class="btn btn-primary mt-auto"
    type="button"
    @click="toggleOffcanvas"
    aria-controls="offcanvasBottom"
  >
    <font-awesome-icon :icon="['fas', 'bars']" />
  </button>

  <!-- Offcanvas -->
  <div
    class="offcanvas offcanvas-bottom"
    tabindex="-1"
    id="offcanvasBottom"
    aria-labelledby="offcanvasBottomLabel"
    :class="{ show: isOffcanvasOpen }"
    v-if="isOffcanvasOpen"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">Information Detail</h5>
      <button
        type="button"
        class="btn-close text-reset"
        @click="toggleOffcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body small">
      <!-- Package Information Section -->
        <div class="package-info">
          <!-- Package ID and Status -->
          <div class="d-flex justify-content-between align-items-center pb-3">
            <span class="label">number:</span>
            <span class="value">status</span>
          </div>

          <!-- Vendor and Customer Names -->
          <div class="d-flex justify-content-between align-items-center pb-3">
            <span class="label">vendor's name</span>
            <font-awesome-icon :icon="['fas', 'greater-than']" class="arrow-icon" />
            <span class="label">Customer name</span>
          </div>

          <!-- Contact Numbers -->
          <div class="d-flex justify-content-between align-items-center pb-3">
            <div>
              <p class="label">Sender's Number</p>
              <p class="data"></p>
            </div>
            <div>
              <p class="label">Receiver's Number</p>
              <p class="data"></p>
            </div>
          </div>

          <!-- Location -->
          <div class="info-row pb-3">
            <span class="label">Location:</span>
          </div>
          <div class="pb-3">
            Payment Status:
            <el-select
              v-model="value"
              clearable
              placeholder="Select"
              class="w-25"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="pb-3">
            Package cost:
          </div>
          <div class="pb-3">
            Delivery Fee:
          </div>
          <!-- View Details Button -->
          <div class="details-button-container pb-3 d-flex justify-content-between align-items-center gap-3">
            <button class="details-button">Cancel</button>
            <button class="details-button">Pick up</button>
          </div>
        </div>
      </div>
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
