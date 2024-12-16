<script setup>
import { useMetaTag } from '@/composables/useMetaTag';
import DeliveryIndex from '@/views/pages/delivery/index.vue';

// Set meta tags for SEO
useMetaTag({
  title: 'Speediz Delivery',
  name: 'Speediz | Delivery',
  description: 'Speediz Delivery',
  url: 'https://speediz-stage.netlify.app/',
  image: 'https://speediz-stage.netlify.app/speediz-logo/static/svg/logo-DukADXeK.svg',
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
    <DeliveryIndex />
  </div>
</template>
