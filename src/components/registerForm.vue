<template>
  <div class="register-form-card">
    <div class="container gap-4">
      <img class="logo-image" src="@/assets/icon/logo.svg" alt="logo"/>
      <h1><strong>Welcome to our page!</strong></h1>
      <span style="color: #a9a9a9; font-size: 15px; padding-bottom: 10px" class="pb-3"
      >Please fill your information to register with us.</span
      >
    </div>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
      <div class="d-flex gap-4">
        <el-form-item prop="first_name">
          <div class="d-flex flex-column w-100">
            <label for="first_name">First Name</label>
            <el-input v-model="form.first_name" placeholder="Enter your firstname"/>
          </div>
        </el-form-item>
        <el-form-item prop="last_name">
          <div class="d-flex flex-column w-100">
            <label for="last_name">Last Name</label>
            <el-input v-model="form.last_name" placeholder="Enter your lastname"/>
          </div>
        </el-form-item>
      </div>
      <el-form-item prop="business_name">
        <div class="d-flex flex-column w-100">
          <label for="businessName">Business name</label>
          <el-input v-model="form.business_name" placeholder="Enter your Business name"/>
        </div>
      </el-form-item>
      <el-form-item prop="email">
        <div class="d-flex flex-column w-100">
          <label for="email">Email</label>
          <el-input v-model="form.email" placeholder="Enter your email"/>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div class="d-flex flex-column w-100">
          <label for="password">password</label>
          <el-input v-model="form.password" placeholder="Enter your password"/>
        </div>
      </el-form-item>
      <div class="d-flex gap-4 w-100">
        <el-form-item prop="dob">
          <div class="d-flex flex-column w-100">
            <label for="dob">Date of Birth</label>
            <el-date-picker v-model="form.dob" type="date" placeholder="Pick a date" style="width: 100%"/>
          </div>
        </el-form-item>
        <el-form-item prop="gender">
          <div class="d-flex flex-column selection">
            <label for="gender">Gender</label>
            <el-select v-model="form.gender" placeholder="Select Gender">
              <el-option label="Male" value="male"/>
              <el-option label="Female" value="female"/>
              <el-option label="Prefer not to say" value="prefer not to say"/>
            </el-select>
          </div>
        </el-form-item>
      </div>

      <el-form-item prop="address">
        <div class="d-flex flex-column w-100">
          <label for="address">Address</label>
          <el-input v-model="form.address" placeholder="Enter your address"/>
        </div>
      </el-form-item>
      <el-form-item prop="contact_number">
        <div class="d-flex flex-column w-100">
          <label for="contact_number">Contact</label>
          <el-input v-model="form.contact_number" placeholder="Enter your contact"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="handleRegister" class="button-submit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>

import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/store/auth';

const form = reactive({
  first_name: '',
  last_name: '',
  business_name: '',
  email: '',
  password: '',
  dob: '',
  gender: '',
  address: '',
  contact_number: '',
});

const formRef = ref(null);

const rules = {
  first_name: [{required: true, message: 'First name is required', trigger: 'blur'}],
  last_name: [{required: true, message: 'Last name is required', trigger: 'blur'}],
  business_name: [{required: true, message: 'Business name is required', trigger: 'blur'}],
  email: [
    {required: true, message: 'Email is required', trigger: 'blur'},
    {type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change']}
  ],
  dob: [{required: true, message: 'Date of birth is required', trigger: 'change'}],
  gender: [{required: true, message: 'Gender is required', trigger: 'change'}],
  address: [{required: true, message: 'Address is required', trigger: 'blur'}],
  contact_number: [{required: true, message: 'Contact number is required', trigger: 'blur'}],
};

const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  console.log(form);
  await formRef.value.validate(async (valid) => {
    if (valid) {
      console.log('register now !')
      try {
        const response = await authStore.register({
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          business_name: form.business_name,
          dob: form.dob,
          gender: form.gender,
          address: form.address,
          contact_number: form.contact_number,
        });
        console.log('Form submitted!', response);
        router.push({name: 'default'});
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }


  });
};

</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button-submit {
  background: #ffbd59;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
}

.button-submit:active {
  opacity: 0.7;
}

.input {
  width: 100px;
}

.logo-image {
  width: 100px;
}

.register-form-card {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ffbd59;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: content-fade-in 0.6s;
}

.input {
  width: 100%;
}

.el-form-item .el-input,
.el-form-item .el-select,
.el-form-item .el-button {
  width: 100%;
}

.selection {
  width: 190px;
}
</style>
