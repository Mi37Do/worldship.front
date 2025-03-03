<script setup>
import { useProfileStore } from '@/stores/profile';
import { onMounted } from 'vue';

const env = import.meta.env.VITE_WORLDSHIP_API
const useProfile = useProfileStore()

onMounted(async () => {
  await useProfile.getWebConfig()
})
</script>

<template>
  <main class=" w-full min-h-screen flex flex-col items-center relative  uppercase">
    <div
      class="w-full h-16 fixed top-4 bg-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-700/20 max-w-[560px] z-20 flex items-center justify-between pr-3">
      <img :src="env + useProfile.webConfig.images_logo" class="w-20" alt="">

      <nav class="gap-8 flex items-center justify-between my-auto">
        <button class="btn btn-sm pixa-btn btn-ghost">home</button>

        <button class="btn btn-sm pixa-btn btn-ghost">about</button>

        <button class="btn btn-sm pixa-btn btn-ghost">services</button>
      </nav>

      <button class="btn btn-sm pixa-btn btn-primary">login</button>
    </div>
    <router-view></router-view>
    <div class="w-full h-80 bg-red-200"></div>
  </main>
</template>
