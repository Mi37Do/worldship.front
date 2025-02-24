<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <span class="pixa-title">Shippments</span>
      </template>
    </top-app-bar>


    <div class="w-full flex-1 overflow-auto py-4">
      <div class="w-full h-[6000px]  bg-red-200"></div>
    </div>

  </div>
</template>

<script setup>
import topAppBar from '@/components/navigations/topAppBar.vue';

</script>

<style lang="scss" scoped></style>
