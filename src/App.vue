<script setup>
import { RouterView } from 'vue-router'
import { useWidgetStore } from './stores/widget';
const useWidget = useWidgetStore()
</script>

<template>
  <div :dir="useWidget.userLanguage === 'en' ? 'ltr' : 'rtl'" class="w-full h-screen"
    :style="{ fontFamily: useWidget.userLanguage === 'en' ? 'inter' : 'cairo' }">
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
