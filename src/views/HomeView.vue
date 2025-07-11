<script setup>
import { useProfileStore } from '@/stores/profile';
import sideMenu from '@/assets/icons/sideMenu.vue';
import signoutIcon from '@/assets/icons/signoutIcon.vue';
import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie';
import languageSwitcher from '@/components/navigations/languageSwitcher.vue';
import axios from 'axios';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const env = import.meta.env.VITE_WORLDSHIP_API
const useProfile = useProfileStore()
const useWidget = useWidgetStore()
const { t } = useI18n()
const route = useRoute()


const defaultMessage = ref('Hello! I have a question.');

const openWhatsApp = () => {
  const encodedMessage = encodeURIComponent(defaultMessage.value);

  window.open(`https://wa.me/${useProfile.webConfig.phone}?text=${encodedMessage}`, '_blank');
};

onMounted(async () => {
  await useProfile.getWebConfig()
})
</script>

<template>
  <div class="drawer">
    <input id="landing-drawer" type="checkbox" class="drawer-toggle" />
    <main class=" w-full min-h-screen flex flex-col items-center relative  uppercase drawer-content">
      <div :class="useWidget.userLanguage === 'en' ? ' pr-3' : 'pl-3'"
        class="w-full h-16 fixed top-4 bg-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-700/20 max-w-[750px] z-20 flex items-center justify-between gap-1.5">

        <label for="landing-drawer" class="btn btn-sm pixa-btn w-10  md:hidden ml-4 btn-ghost flex  p-0">
          <side-menu class="w-5 h-5" />
        </label>

        <img :src="env + useProfile.webConfig.images_logo" class="w-20" alt="">

        <nav class="gap-8 hidden md:flex items-center justify-between my-auto flex-1 px-3 relative">

          <router-link v-if="route.name !== 'home-view'" :to="{ name: 'home-view' }"
            class="w-full h-full absolute inset-0"></router-link>

          <a href="#home" class="btn btn-sm pixa-btn btn-ghost">{{ t('commun.home') }}</a>

          <a href="#about" class="btn btn-sm pixa-btn btn-ghost">{{ t('commun.about') }}</a>

          <a href="#services" class="btn btn-sm pixa-btn btn-ghost">{{ t('commun.services') }}</a>
          <a href="#pricing" class="btn btn-sm pixa-btn btn-ghost">{{ t('commun.pricing') }}</a>
          <router-link :to="{ name: 'faq-landing' }" class="btn btn-sm pixa-btn btn-ghost">{{ t('commun.faq')
            }}</router-link>
        </nav>

        <router-link :to="{
          name: useProfile.isAuth ? 'dashboard'
            : 'login'
        }" class="btn btn-sm pixa-btn btn-primary">{{ useProfile.isAuth ? t('navigation.links.dashboard')
          : t('commun.login') }} </router-link>


        <router-link v-if="!useProfile.isAuth" :to="{
          name: 'register'
        }" class="btn btn-sm pixa-btn pixa-btn-float">{{ t('commun.register') }} </router-link>

      </div>


      <div class="flex gap-3  absolute right-4 top-6  z-10">
        <language-switcher />
        <button v-if="Cookies.get('token')" @click="async () => {
          let response = await axios.get(`/logout_API`)
          Cookies.remove('token')
          window.location.reload()
        }" class="btn btn-sm pixa-btn hidden md:flex pixa-menu-btn-delete btn-ghost">
          <signoutIcon class="w-5 h-5" />
          <span>signout</span>
        </button>
      </div>

      <div @click="openWhatsApp" class="w-14 h-14 fixed bottom-6 right-6 rounded-full z-50">
        <img src="@/assets/pics/WhatsApp.svg" alt="">
      </div>

      <router-view></router-view>
      <div class="w-full h-fit bg-[#0e1d34] rounded-t-3xl grid md:grid-cols-2 gap-4 px-6 py-12 text-white relative">

        <div class="w-full h-full flex flex-col gap-4 md:max-w-[30vw] m-auto z-10">
          <span class="text-2xl font-bold">worldship</span>
          <span>{{ useProfile.webConfig.footer_disc }}</span>
          <div class="flex gap-1.5 items-center">
            <img src="@/assets/pics/mc_symbol.svg" class="w-8" alt="">
            <div class="bg-white h-6 flex items-center justify-center w-10 rounded-md">
              <img src="@/assets/pics/visa.png" class="w-8" alt="">
            </div>

            <div class="w-fit h-10 flex gap-4 items-center font-semibold ml-8">
              <img src="@/assets/pics/usa.svg" class="w-8" alt="">
              <span>USD - $</span>
            </div>
          </div>
        </div>

        <div class="w-full h-full flex flex-col gap-4 md:max-w-[30vw] m-auto z-10">
          <span class="font-bold">address</span>
          <span>{{ useProfile.webConfig.footer_adr }}</span>

          <span class="font-bold">phone</span>
          <span>{{ useProfile.webConfig.phone }}</span>

          <span class="font-bold">email</span>
          <span>{{ useProfile.webConfig.email }}</span>
        </div>

        <span class="w-80 h-px bg-slate-100 mx-auto md:col-span-2"></span>
        <div class="w-full md:col-span-2 text-center mt-4 z-10">
          Copyright © 2025 WoldShipUS <router-link :to="{ name: 'terms-and-conditions' }">terms and
            conditions</router-link> . All
          rights reserved.</div>
        <div class="w-full md:col-span-2 text-center mt-2 z-10"> powered by godaddy (1-480-366-3549)</div>

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

        <button v-if="Cookies.get('token')" @click="async () => {
          let response = await axios.get(`/logout_API`)
          Cookies.remove('token')
          window.location.reload()
        }" class="btn btn-sm pixa-btn mt-auto w-full pixa-menu-btn-delete btn-ghost">
          <signoutIcon class="w-5 h-5" />
          <span>signout</span>
        </button>
      </ul>
    </div>
  </div>

  <!--
   -->
</template>
