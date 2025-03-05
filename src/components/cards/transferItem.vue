<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2']"
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-5 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">

    <span class="h-8 my-auto flex items-center truncate"> {{ format(item.created_at, 'dd-MM-yyyy0') }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.card_id.name }} {{ item.card_id.last_4 }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.type_p === 'w' ? 'warehouse' : '---' }}</span>

    <span class="h-8 my-auto flex items-center truncate"> $ {{ numberFormat(parseFloat(item.amount)) }} </span>

    <span :class="[
      item.status === 'COMPLETED' ?
        'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600',
      'h-8 my-auto flex items-center truncate rounded-md px-2 w-fit']">{{ item.status }}</span>


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
