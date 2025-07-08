<script setup>
import { RouterView } from 'vue-router'
import { useWidgetStore } from './stores/widget';

import { ref } from 'vue';
import { useProfileStore } from './stores/profile';
import commingSoonModal from './components/commun/commingSoonModal.vue';
import confirmShippmentModal from './components/shippement/confirmShippmentModal.vue';



const useWidget = useWidgetStore()
const useProfile = useProfileStore()
localStorage.setItem('user-language', 'en')

const phoneNumber = ref('1234567890'); // Make this reactive
const defaultMessage = ref('Hello! I have a question.');

const openWhatsApp = () => {
  const formattedNumber = phoneNumber.value.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(defaultMessage.value);

  window.open(`https://wa.me/${useProfile.webConfig.phone}?text=${encodedMessage}`, '_blank');
};
</script>

<template>
  <div :dir="useWidget.userLanguage === 'en' ? 'ltr' : 'rtl'" class="w-full h-screen relative"
    :style="{ fontFamily: useWidget.userLanguage === 'en' ? 'inter' : 'cairo' }">

    <comming-soon-modal />
    <confirm-shippment-modal />
    <!--
    <div @click="openWhatsApp" class="w-14 h-14 fixed bottom-6 right-6 rounded-full z-50">
      <img src="@/assets/pics/WhatsApp.svg" alt="">
    </div>-->

    <RouterView />
  </div>
</template>

<style>
@font-face {
  font-family: 'inter';
  src: url('@/assets/fonts/Inter.ttf');
}


@font-face {
  font-family: 'cairo';
  src: url('@/assets/fonts/Cairo.ttf');
}

/* Global scrollbar styles */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background: #577399;
  border-radius: 8px;
  border: 2px solid #f3f4f6;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #577399 #f3f4f6;
}
</style>
