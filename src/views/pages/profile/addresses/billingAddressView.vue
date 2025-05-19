<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
      class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-7 gap-2 uppercase font-bold text-primary bg-white">
      <span class="h-8  my-auto flex items-center">{{ $t('commun.name') }}</span>
      <span class="h-8  my-auto flex items-center">{{ $t('commun.phone') }}</span>
      <span class="h-8 my-auto flex items-center">{{ $t('commun.country') }}</span>
      <span class="h-8  my-auto flex items-center">zip code</span>
      <span class="h-8 my-auto flex items-center">{{ $t('commun.city') }}</span>
      <span class="h-8 my-auto flex items-center">{{ $t('commun.addressLine') }}</span>
      <span class="h-8 my-auto flex items-center">{{ $t('commun.addressLine') }} 2</span>
    </div>

    <div class="w-full flex-1 overflow-auto flex flex-col">
      <div class="w-full h-fit flex flex-col gap-2 pt-2">
        <itemData v-for="item in useBook.filtredAdresses.filter(it => it.type === 'b')" :key="item" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from "@/stores/addressBook";
import { useWidgetStore } from "@/stores/widget";
import itemData from '@/components/addressBook/itemData.vue';

const useWidget = useWidgetStore()
const useBook = useBookStore()
</script>

<style lang="scss" scoped></style>
