<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2'
  ]"
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-6 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">
    <span class="h-8 my-auto flex items-center truncate">{{ item.name }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ formatPhoneNumber(item.phone) }} </span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.second_phone ? formatPhoneNumber(item.second_phone) :
      '------' }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.city_id.name }}</span>
    <span class="h-8 my-auto flex items-center truncate">-----</span>
    <div class="flex items-center justify-between my-auto ">
      <span class="h-8 my-auto flex items-center truncate">-----</span>
      <item-more :item="item" />
    </div>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import itemMore from './itemMore.vue';
import { useWidgetStore } from '@/stores/widget';
import { formatPhoneNumber } from '@/utils/phoneUtils';

const useWidget = useWidgetStore()
const props = defineProps(['item', 'index'])
</script>

<style lang="scss" scoped></style>
