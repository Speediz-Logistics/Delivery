<script setup>
import Map from "@/components/Map.vue";
const title = 'Seavyong Cute Delivery';
const content = 'Seavyong Fly on the way!';
</script>

<template>
  <Map
    :lat="11.57128"
    :lng="104.91239"
    :title="title"
    :content="content"
  />
</template>

<style scoped lang="scss">

</style>
