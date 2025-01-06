<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (page) => {
    if(page === 'login'){
      router.push({name: 'login'});
    }
    if(page === 'map'){
      router.push({name: 'map'});
    }
  }
</script>

<template>
  <div class="home-container">
    <div class="d-flex flex-column align-items-center gap-30">
      <img src="@/assets/images/speediz-logo.png" alt="logo" class="mb-5">
      <img src="@/assets/images/home-screen-icon.svg" alt="home screen icon" class="mt-5 pt-4">
    </div>
    <div class="d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
      <h1 class="text-center">
        <strong>Quick Delivery</strong>
      </h1>
      <p>Our intelligent route planning software guarantees the optimal path for each delivery.</p>
      <button @click="navigateTo('login')">
        Explore Now!
      </button>
      <button @click="navigateTo('map')">
        Explore Map!
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  gap: 50px;
  justify-content: center;
  align-items: center;
  font-family: Inter, sans-serif;
  background-color: #F2EEFF;

  @media (max-width: 768px) {
    padding: 30px;
    gap: 30px;
    text-align: center;

  }
}

.text-center{
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  padding-bottom: 10px;
}
p{
  color: gray;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 20px;
  border: none;
  background-color: #2A2E30;
  color: white;
  border-radius: 35px;
  width: 290px;
  height: 68px;
  cursor: pointer;


  &:hover {
    transition: background-color 0.3s ease, transform 0.3s;
    transform: scale(1.05);
  }
  &:active {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>


