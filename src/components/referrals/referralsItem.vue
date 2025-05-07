<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2']"
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-4 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">


    <span class="h-8 my-auto flex items-center truncate">{{ item.first_name }} {{ item.last_name }}</span>
    <span class="h-8 my-auto flex items-center truncate">need customer account code</span>

    <span class="h-8 my-auto flex items-center truncate">{{ item.code }}</span>

    <span class="h-8 my-auto flex items-center truncate">need date</span>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import { useWidgetStore } from '@/stores/widget';

const useWidget = useWidgetStore()
const props = defineProps(['item'])
</script>

<style lang="scss" scoped></style>
