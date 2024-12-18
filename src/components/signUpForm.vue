<template>
    <div class="signUp-form-card">
      <div class="gap-4 d-flex justify-content-center align-items-center">
        <div>
          <font-awesome-icon :icon="['far', 'arrow-left']" />
        </div>
        <h1><strong>Sign Up</strong></h1>
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

        <el-form-item prop="email">
          <div class="d-flex flex-column w-100">
            <label for="email">Email</label>
            <el-input v-model="form.email" placeholder="Enter your email"/>
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <div class="d-flex flex-column w-100">
            <label for="password">Password</label>
            <el-input type="password" v-model="form.password" placeholder="Enter your password"/>
          </div>
        </el-form-item>

        <el-form-item prop="password_confirmation">
          <div class="d-flex flex-column w-100">
            <label for="password_confirmation">Confirm Password</label>
            <el-input type="password" v-model="form.password_confirmation" placeholder="Confirm your password"/>
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

        <el-form-item prop="zone">
          <div class="d-flex flex-column w-100">
            <label for="zone">Zone</label>
            <el-input v-model="form.zone" placeholder="Enter your zone"/>
          </div>
        </el-form-item>

        <el-form-item prop="contact_number">
          <div class="d-flex flex-column w-100">
            <label for="contact_number">Contact Number</label>
            <el-input v-model="form.contact_number" placeholder="Enter your contact"/>
          </div>
        </el-form-item>

        <el-form-item prop="telegram_contact">
          <div class="d-flex flex-column w-100">
            <label for="telegram_contact">Telegram Contact</label>
            <el-input v-model="form.telegram_contact" placeholder="Enter your bank name"/>
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
  email: '',
  password: '',
  password_confirmation: '',
  dob: '',
  gender: '',
  zone: '',
  contact_number: '',
  telegram_contact: '',
  driver_type: 'motorcycle'
});

const formRef = ref(null);

const rules = {
  first_name: [{ required: true, message: 'First name is required', trigger: 'blur' }],
  last_name: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }],
  password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
  password_confirmation: [{ required: true, message: 'Please confirm your password', trigger: 'blur' }],
  dob: [{ required: true, message: 'Date of birth is required', trigger: 'change' }],
  gender: [{ required: true, message: 'Please select gender', trigger: 'change' }],
  driver_type: [{ required: true, message: 'Driver type is required', trigger: 'blur' }],
  zone: [{ required: true, message: 'Zone is required', trigger: 'blur' }],
  contact_number: [{ required: true, message: 'Contact number is required', trigger: 'blur' }],
  telegram_contact: [{ required: true, message: 'Telegram contact is required', trigger: 'blur' }],
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
          password_confirmation: form.password_confirmation,
          first_name: form.first_name,
          last_name: form.last_name,
          dob: form.dob,
          gender: form.gender,
          driver_type: form.driver_type,
          zone: form.zone,
          contact_number: form.contact_number,
          telegram_contact: form.telegram_contact,
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
.signUp-form-card {

  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Inter, sans-serif;

}

.button-submit {
  background: #2A2E30;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  height: 50px;
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
h1{
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
}
el-input{
  height: 40px;
}
</style>
