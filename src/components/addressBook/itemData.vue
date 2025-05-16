<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2', item.type === 'from' ? 'lg:grid-cols-8' : 'lg:grid-cols-7'
  ]"
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2  gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">
    <span class="h-8 my-auto flex items-center truncate">{{ item.name }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ formatPhoneNumber(item.phone) }} </span>
    <span v-if="item.type !== 'b'" class="h-8 my-auto flex items-center truncate">{{ item.company_name }} </span>
    <span v-if="item.type !== 'to'" class="h-8 my-auto flex items-center truncate">{{ item.zip_code }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.type === 'to' ? item.city_id.name :
      item.city_c }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.adr }} </span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.adr_l2 }} </span>
    <div class="flex items-center justify-between my-auto ">
      <span class="h-8 my-auto flex items-center truncate">{{ item.instruction || '-----' }}</span>
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
import { useRoute } from 'vue-router';

const useWidget = useWidgetStore()
const props = defineProps(['item', 'index'])
const route = useRoute()
</script>

<style lang="scss" scoped></style>
