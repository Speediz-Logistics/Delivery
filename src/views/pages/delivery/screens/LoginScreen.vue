<template>
    <div class="login">
      <div>
        <h1>
          Welcome to <br>
          Speediz
        </h1>
      </div>
      <loginForm></loginForm>
    </div>
</template>

<script setup>
import loginForm from '@/components/loginForm.vue';

</script>

<style scoped lang="scss">
.login {
  width: 500px;
  font-family: Inter, sans-serif;
  display: flex;
  padding-left: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media(max-width: 800px) {
    width: 90%;
    padding-left: 10%;
  }
}
h1{
  color: #FFBD59;
  font-weight: bold;
  font-size: 60px;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 50px;
}
</style>
