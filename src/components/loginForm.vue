<template>
  <div class="d-flex flex-column align-content-center gap-4 content-fade-in login-form-card">
    <h1 class="text-center color-gray">Login to access your best experience for delivery. </h1>
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="dynamicValidateForm"
      label-width="auto"
      class="demo-dynamic gap-4"
    >
      <label for="email">Email</label>
      <el-form-item class prop="email" :rules="rules.email">
        <el-input
          v-model="dynamicValidateForm.email"
          placeholder="Enter your email"
          size="large"
          autocomplete="on"
          clearable
          :prefix-icon="Message"
        />
      </el-form-item>
      <label for="password">Passoword</label>
      <el-form-item prop="password" :rules="rules.password">
        <el-input
          v-model="dynamicValidateForm.password"
          type="password"
          placeholder="Enter your password"
          show-password
          size="large"
          :prefix-icon="Key"
        />
      </el-form-item>
      <div class="d-flex justify-content-between">
        <el-checkbox v-model="remember" label="Remember me" size="large" />
        <el-form-item>
          <el-button @click="forgotPassword" class="forgot-password">Forgot Password?</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" v-on:click="handleLogin" class="input">Login</el-button>
      </el-form-item>
    </el-form>
    <div class="d-flex flex-column align-content-center justify-space-center text-center">
      <div>You don’t have an account yet ?,</div>
      <div class="bg-transparent ms-2 primary-color cursor-pointer" @click="handleSignUp({name: 'sign-up'})">
        Sign Up Now
      </div>
    </div>
  </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { Message, Key } from '@element-plus/icons-vue';
import useNavigate from '@/composables/useNavigate.js';
import { useAuthStore } from '@/store/auth'; // Import the auth store

const { navigateTo } = useNavigate();

// Define the router for navigation
const router = useRouter();
const remember = ref(false);

// Define the form data using reactive
const dynamicValidateForm = reactive({
  email: '',
  password: '',
});

// Define the rules for form validation
const rules = {
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: ['blur', 'change'] },
  ],
};

// Reference for form validation
const formRef = ref(null);

// Use the Auth Store
const authStore = useAuthStore();

// Handle login action
const handleLogin = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // Attempt to log in using the auth store
        await authStore.login({
          email: dynamicValidateForm.email,
          password: dynamicValidateForm.password,
        });
        // Redirect to the dashboard page after login
        router.push({ name: 'onboard-Screen' }); // Change 'dashboard' to your actual dashboard route name
      } catch (error) {
        // Show error message on login failure
        ElMessage.error(error.response?.data?.message || 'Login failed. Please try again.');
      }
    } else {
      ElMessage.error('Please fill in the form correctly');
    }
  });
};

// Function for forgot password navigation
const forgotPassword = () => {
  router.push({ name: 'forgot-password' });
};
const handleSignUp = () =>{
  router.push({name: 'sign-up'});
}
</script>

<style scoped>
.input {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-button {
  width: 100%;
}
h1{
  font-size: 12px;
  text-decoration: underline;
}
.el-button {
  background: #2A2E30;
  width: 290px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.el-button:active {
  opacity: 0.7;
}

.forgot-password {
  background-color: transparent;
  display: block;
  margin-top: 2px;
  cursor: pointer;
  color: #ffbd59; /* Element Plus default link color */

  &:hover {
    color: #000000;
    text-decoration: none;
  }
}

.login-form-card {
  background-color: #fff;
  border: none;
  padding: 20px;
}
label{
  color: darkgrey;
}
</style>
