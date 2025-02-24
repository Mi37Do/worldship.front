<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2'
  ]"
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-7 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">
    <span class="h-8 my-auto flex items-center truncate">{{ item.name }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.name }}</span>

    <span class="h-8 my-auto flex items-center truncate">{{ item.type_w === '-' ? 'payments' : 'add' }}</span>

    <span class="h-8 my-auto flex items-center truncate"> $ {{ numberFormat(item.value) }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.details }}</span>
    <div class="flex items-center justify-between my-auto ">
      <span :class="[item.is_actived ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600']"
        class="h-8 flex items-center truncate w-fit px-3 rounded ">{{
          item.is_actived ? 'is active' : 'is not active' }}</span>




      <!--
      <button @click="useWidget.invoiceDetail = true" class="btn btn-sm pixa-btn w-10 btn-ghost p-0">
        <eye-icon class="w-5 h-5" />
      </button>-->
    </div>


    <span class="h-8 my-auto flex items-center truncate">{{ format(item.created_at, 'dd-MM-yyyy | HH:mm') }}</span>

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
