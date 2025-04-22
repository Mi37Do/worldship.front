<template>
  <div class="w-full h-full flex items-center justify-center" :style="{
    backgroundImage: `url(${env + useProfile.profile.config_web.backgroud_dash_image})`, backgroundSize: 'cover',
    backgroundPosition: 'center'
  }">
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';

const useProfile = useProfileStore()
const env = import.meta.env.VITE_WORLDSHIP_API
</script>

<style lang="scss" scoped></style>
