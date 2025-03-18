<script setup>
import { useProfileStore } from '@/stores/profile';
import sideMenu from '@/assets/icons/sideMenu.vue';
import { onMounted } from 'vue';

const env = import.meta.env.VITE_WORLDSHIP_API
const useProfile = useProfileStore()

onMounted(async () => {
  await useProfile.getWebConfig()
})
</script>

<template>
  <div class="drawer">
    <input id="landing-drawer" type="checkbox" class="drawer-toggle" />
    <main class=" w-full min-h-screen flex flex-col items-center relative  uppercase drawer-content">
      <div
        class="w-full h-16 fixed top-4 bg-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-700/20 max-w-[560px] z-20 flex items-center justify-between pr-3">

        <label for="landing-drawer" class="btn btn-sm pixa-btn w-10  md:hidden ml-4 btn-ghost flex  p-0">
          <side-menu class="w-5 h-5" />
        </label>

        <img :src="env + useProfile.webConfig.images_logo" class="w-20" alt="">

        <nav class="gap-8 hidden md:flex items-center justify-between my-auto">
          <a href="#home" class="btn btn-sm pixa-btn btn-ghost">home</a>

          <a href="#about" class="btn btn-sm pixa-btn btn-ghost">about</a>

          <a href="#services" class="btn btn-sm pixa-btn btn-ghost">services</a>
          <a href="#pricing" class="btn btn-sm pixa-btn btn-ghost">pricing</a>
        </nav>

        <router-link :to="{
          name: useProfile.isAuth ? 'dashboard'
            : 'login'
        }" class="btn btn-sm pixa-btn btn-primary">{{ useProfile.isAuth ? 'dashboard'
            : 'login' }} </router-link>
      </div>
      <router-view></router-view>
      <div class="w-full h-fit bg-[#0e1d34] rounded-t-3xl grid md:grid-cols-2 gap-4 px-6 py-12 text-white relative">

        <div class="w-full h-full flex flex-col gap-4 md:max-w-[30vw] m-auto z-10">
          <span class="text-2xl font-bold">worldship</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, animi autem! Cum architecto
            doloribus
            asperiores sed accusantium, accusamus dolor aut illo modi adipisci sint obcaecati, vitae minus quia ipsam
            nisi.</span>
        </div>

        <div class="w-full h-full flex flex-col gap-4 md:max-w-[30vw] m-auto z-10">
          <span class="font-bold">Contact Us</span>
          <span>A108 Adam Street
            New York, NY 535022
            United States</span>

          <span class="font-bold">Contact Us</span>
          <span>+1 5589 55488 55</span>

          <span class="font-bold">email</span>
          <span>info@example.com</span>
        </div>

        <div class="w-full h-full absolute inset-0 overflow-hidden">
          <div class="w-full h-full relative flex justify-center">
            <div
              class="w-[60vw] h-[60vw] -top-[45vw] rounded-full blur-3xl bg-gradient-to-b from-blue-900 from-80% absolute">
            </div>
          </div>
        </div>

      </div>
    </main>
    <div class="drawer-side z-50">
      <label for="landing-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-white text-base-content min-h-full flex flex-col items-center w-80 p-4">

        <img :src="env + useProfile.webConfig.images_logo" class="w-40" alt="">
        <!-- Sidebar content here -->
        <nav class="flex flex-col items-center justify-between mt-10">
          <a href="#home" class="btn btn-sm pixa-btn btn-ghost w-full">home</a>

          <a href="#about" class="btn btn-sm pixa-btn btn-ghost w-full">about</a>

          <a href="#services" class="btn btn-sm pixa-btn btn-ghost w-full">services</a>
          <a href="#pricing" class="btn btn-sm pixa-btn btn-ghost w-full">pricing</a>
        </nav>
      </ul>
    </div>
  </div>

  <!--
   -->
</template>
