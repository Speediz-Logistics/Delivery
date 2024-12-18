<script setup>
import {reactive, ref} from "vue";

const form = reactive({
  email: '',
});

const formRef = ref(null);

const rules = {
  email: [{ required: true, type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }],
};

</script>

<template>
<div class="forgot-password">
  <div class="gap-4 d-flex flex-column justify-content-center align-items-center">
    <div >
      <font-awesome-icon :icon="['far', 'arrow-left']" />
    </div>
    <h1><strong>Forgot Password</strong></h1>
    <div>
      <p>
        We’ll send you a link that will sign you into the app instantly.
      </p>
    </div>
  </div>
  <div>
    <el-form-item prop="email">
      <div class="d-flex flex-column w-100">
        <label for="email">Email</label>
        <el-input v-model="form.email" placeholder="Enter your email" class="email"/>
      </div>
    </el-form-item>

    <el-form-item class="d-flex flex-column justify-content-center align-items-center">
      <el-button type="primary" v-on:click="handleForgotPassword" class="button-submit">Send</el-button>
    </el-form-item>
  </div>

</div>
</template>

<style scoped lang="scss">
.forgot-password{
  font-family: Inter, sans-serif;
  padding: 10px;
}
h1{
  font-weight: bold;
  font-size: 30px;
  padding-bottom: 20px;
}
p{
  font-size: 20px;
  color: #6C6C6C;
  padding-bottom: 50px;
}
.button-submit{
  background-color: #2A2E30;
  border-radius: 20px;
  border: none;
  height: 50px;
  width: 200px;
  margin-top: 50px;
}
.email{
  height: 50px;
}
</style>
