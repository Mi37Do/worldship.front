<template>
  <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>

  <div v-else class="w-full h-full flex flex-col overflow-hidden">

    <div class="w-full flex-1 pb-4 flex flex-col gap-4 overflow-hidden">
      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>
          <span class="pixa-title">{{ $t('commun.cards') }}</span>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm pixa-btn btn-primary">
            <plus-icon class="w-5 h-5" />
            {{ $t('commun.addCard') }}</button>
        </div>
      </div>

      <div class="w-full flex-1 flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-4 gap-2 uppercase font-bold text-primary bg-white">
          <span class="h-8  my-auto flex items-center">{{ $t('commun.card') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.type') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.exp') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.created') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit flex flex-col gap-2 pt-2">
            <CardItem v-for="item in useInvoices.cards" :key="item" :item="item" />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import plusIcon from '@/assets/icons/plusIcon.vue';
import CardItem from '@/components/cards/cardItem.vue';
import { useInvoicesStore } from '@/stores/invoices';
import { useWidgetStore } from '@/stores/widget';
import { onMounted, ref } from 'vue';

const useWidget = useWidgetStore()

const useInvoices = useInvoicesStore()
const loading = ref(true)

onMounted(async () => {

  try {
    await useInvoices.getCards(localStorage.getItem('ws-user-id'))
    loading.value = false
    console.log(useInvoices.cards);

  } catch (error) {

  }
})
</script>

<style lang="scss" scoped></style>
