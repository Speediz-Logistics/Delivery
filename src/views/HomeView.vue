<script setup>
import { useMetaTag } from '@/composables/useMetaTag';
import HomeIndex from '@/views/pages/home/index.vue';
import Map from "@/components/Map.vue";

// Set meta tags for SEO
useMetaTag({
  title: 'Speediz',
  name: 'Speediz | Delivery',
  description: 'Delivery page',
  url: 'https://speediz-stage.netlify.app/',
  image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  type: 'article',
  siteName: 'Coming Soon',
  locale: 'en_US',
});

const prefix = import.meta.env.VITE_PREFIX;
const prefixClass = {
  [`${prefix}-wrapper`]: true,
};
</script>

<template>
  <div :class="prefixClass">
    <HomeIndex />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/layouts/home';
</style>
