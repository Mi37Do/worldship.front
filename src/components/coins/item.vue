<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2']"
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-5 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">
    <span class="h-8 my-auto flex items-center truncate">{{ item.name }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.type_c === '+' ? 'add' : 'delete' }}</span>

    <span class="h-8 my-auto flex items-center truncate">c {{ item.value }}</span>

    <span class="h-8 my-auto flex items-center truncate">{{ item.details }}</span>


    <span class="h-8 my-auto flex items-center truncate gap-2">
      <span class="w-20">{{ format(item.created_at, 'dd-MM-yyyy') }}</span>
      <span class="w-20">{{ format(item.created_at, ' HH:mm') }}</span>
    </span>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import { useWidgetStore } from '@/stores/widget';

const useWidget = useWidgetStore()
const props = defineProps(['item', 'index'])
</script>

<style lang="scss" scoped></style>
