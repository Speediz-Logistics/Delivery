<template>
    <div class="sign-up">
      <signUpForm/>
    </div>
</template>
<script setup>
import signUpForm from "@/components/signUpForm.vue";
</script>
<style scoped lang="scss">
.sign-up {
@media(max-width: 800px) {
  padding: 10px
}
}
</style>
