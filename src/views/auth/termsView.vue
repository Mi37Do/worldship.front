<template>
  <div class="w-full min-h-screen bg-slate-100 flex flex-col items-center justify-center py-32">

    <span class="text-4xl font-bold text-primary">terms and conditions</span>

    <div v-html="useProfile.webConfig.terms_conditions" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';


const useProfile = useProfileStore()


</script>

<style lang="scss" scoped></style>
