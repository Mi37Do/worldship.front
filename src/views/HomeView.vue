<script setup>
</script>

<template>
  <main class=" w-full min-h-screen flex flex-col items-center relative  uppercase">
    <div class="w-full h-16 fixed top-4 bg-glass-effect max-w-[700px] z-20"></div>
    <router-view></router-view>
    <div class="w-full h-80 bg-red-200"></div>
  </main>
</template>
