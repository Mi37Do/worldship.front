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

      <router-link :to="{ name: 'login' }" class="btn btn-sm pixa-btn btn-primary">login</router-link>
    </div>
    <router-view></router-view>
    <div class="w-full h-fit bg-[#0e1d34] rounded-t-3xl grid grid-cols-2 gap-4 px-6 py-12 text-white">
      <div class="w-full h-full flex flex-col gap-4 max-w-[30vw] m-auto">
        <span class="text-2xl font-bold">worldship</span>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, animi autem! Cum architecto doloribus
          asperiores sed accusantium, accusamus dolor aut illo modi adipisci sint obcaecati, vitae minus quia ipsam
          nisi.</span>
      </div>

      <div class="w-full h-full flex flex-col gap-4 max-w-[30vw] m-auto">
        <span class="font-bold">Contact Us</span>
        <span>A108 Adam Street
          New York, NY 535022
          United States</span>

        <span class="font-bold">Contact Us</span>
        <span>+1 5589 55488 55</span>

        <span class="font-bold">email</span>
        <span>info@example.com</span>
      </div>
    </div>
  </main>
</template>
