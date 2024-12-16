<template>
  <div class="background">
    <i class="speediz-image speediz-image-vendor-register-bg"></i>
  </div>
  <div class="container">
    <div class="register-item">
      <img src="@/assets/icon/loginScreenIcon.svg" alt="register item"></img>
    </div>
    <div class="register-form mx-auto">
      <RegisterForm/>
    </div>
  </div>
</template>
<script setup>
import RegisterForm from "@/components/registerForm.vue";
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  animation: content-fade-in 0.6s;
  height: 100vh;
  max-width: 100%;
  align-items: center;
  .register-item {
    z-index: 2;
    left: 0;
    padding: 20px;
    width: 590px;
    animation: reigster-item-animation 4s infinite;
  }

  .register-form {
    z-index: 3;
  }
}

@keyframes reigster-item-animation {
  0% {
    opacity: 1;
    transform: scale(0.8) translateY(-50px);
  }
  50% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(0.8) translateY(-50px);
  }
}


</style>
