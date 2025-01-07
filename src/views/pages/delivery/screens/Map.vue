<script setup>
import Map from "@/components/Map.vue";
import { useExpressStore} from "@/store/expresss.js";
import { useRoute } from "vue-router";
const store = useExpressStore();
const data = ref({})
const route = useRoute();
const show = async () => {
  const id = route.params.id;
  const response = await store.show(id);
  data.value = response.data || [];
}
onMounted(async () => {
  await show();  // Wait for the data before continuing
});
</script>

<template>
  <Map
    :lat="data.location?.lat"
    :lng="data.location?.lng"
  />
</template>

<style scoped lang="scss">

</style>
