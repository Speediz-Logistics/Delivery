<template>
  <header>
    <nav class="nav-bar">
      <div class="navigation">
        <span class="logo">
          <a class="navbar-brand" href="#">
            <img src="@/assets/icon/logo.svg" alt="Logo" class="logo">
          </a>
        </span>
        <ul class="navbar-nav">
          <li>
            <input type="text" placeholder="What are you looking for?">
          </li>
          <li>
            <a>
              <img src="@/assets/icon/notification.svg" alt="notification icon" class="notification">
            </a>
          </li>
          <li>
            <a @click="logout">
              <img src="@/assets/icon/profile.svg" alt="profile icon" class="profile">
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <div class="content-fade-in">
    <img src="@/assets/images/heroContent.png" alt="hero-content">
  </div>
  <div>
    <h1>Explore your service</h1>
  </div>
  <div class="content">
    <div class="content-1">
      <a>
        <img src="@/assets/icon/content1.svg" alt="icon content1">
      </a>
      <p> Packages<br></br>Management</p>
    </div>
    <div class="content-2">
      <a>
        <img src="@/assets/icon/content2.svg" alt="icon content1">
      </a>
      <p> Packages <br></br>Tracking</p>
    </div>
    <div class="content-3">
      <a>
        <img src="@/assets/icon/content3.svg" alt="icon content1">
      </a>
      <p> Packages <br></br>Invoices</p>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from "@/store/auth.js";

const router = useRouter()
const authStore = useAuthStore();

const logout = () => {
  authStore.logout()
  router.push({name: 'login'})
}
</script>

<style scoped lang="scss">

.nav-bar {
  background-color: #FFBD59;
  padding: 10px 10px;
  width: 100%;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: left;
  align-items: center;
  animation: content-fade-in 0.6s ease-out forwards;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: content-fade-in 0.6s ease-out forwards;
}

.logo {
  display: flex;
  align-items: center;

}

.logo img {
  height: 40px;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
}

.navbar-nav li {
  margin-left: 20px;
}

.navbar-nav input[type="text"] {
  margin-left: 10px;
  padding: 5px 10px;
  width: 800px;
  height: 40px;
  border: none;
  border-radius: 10px;
}

.navbar-nav .notification {
  margin-left: 150px;
  height: 40px;
  width: 40px;
  align-items: center;

}

.navbar-nav .profile {
  height: 40px;
  width: 40px;
  align-items: center;

}

.hero-content img {
  max-width: 100%;
  height: 30%;
}

h1 {
  padding-bottom: 40px;
  font-size: 2em;
  font-weight: bold;
  font-family: Inter, sans-serif;
  animation: content-fade-in 0.6s ease-out forwards;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-family: inter, sans-serif;
  animation: content-fade-in 0.6s ease-out forwards;

  .content-1,
  .content-2,
  .content-3 {
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 30%;
    height: 100px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Adding transition for animation */
  }

  .content-1:hover,
  .content-2:hover,
  .content-3:hover {
    transform: scale(1.05); /* Scale up on hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Darker shadow on hover */
  }

  .content-1 img,
  .content-2 img,
  .content-3 img {
    width: 150px;
    height: 150px;
    text-align: center;
  }
}

.content-1 p,
.content-2 p,
.content-3 p {
  font-size: 20px;
  text-align: center;
}


/* Apply the keyframes to content for a fade-in effect */
.content-1,
.content-2,
.content-3 {
  animation: content-fade-in 0.6s ease-out forwards;
}


</style>
