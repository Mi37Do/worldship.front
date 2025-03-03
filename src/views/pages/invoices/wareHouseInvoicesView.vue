<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost">
          <side-menu />
        </button>
        <span class="pixa-title flex-1">{{ $t('navigation.links.invoices') }}</span>
      </template>
    </top-app-bar>


    <div class="w-full flex-1 py-4 flex flex-col gap-4 overflow-hidden">

      <invoice-detail />

      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>
          <span class="pixa-title">{{ $t('commun.warehouseInvoices') }}</span>
        </div>
        <div class="w-full max-w-96 flex gap-2">

          <commun-input-search @searchQuery="searchQuery" />
        </div>
      </div>

      <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
        <span class="loading loading-ring loading-sm"></span>
      </div>

      <div v-else class="w-full flex-1 flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-4 gap-2 uppercase font-bold text-primary bg-white">
          <span class="h-8  my-auto flex items-center">{{ $t('commun.code') }}</span>

          <span class="h-8  my-auto flex items-center">{{ $t('commun.paymentType') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.amount') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.status') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit flex flex-col gap-2 pt-2">
            <item v-for="item in useInvoices.invoices" :key="item.id" :item="item" />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import invoiceDetail from '@/components/invoices/invoiceDetail.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import item from '@/components/invoices/item.vue';
import communInputSearch from '@/components/commun/communInputSearch.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInvoicesStore } from '@/stores/invoices';
import { onMounted, ref } from 'vue';
import sideMenu from '@/assets/icons/sideMenu.vue';

const useWidget = useWidgetStore()
const useInvoices = useInvoicesStore()
const loading = ref(true)

onMounted(async () => {
  useInvoices.invoices = []
  try {
    console.log(localStorage.getItem('ws-user-id'));

    await useInvoices.getInvoices("wrhs", localStorage.getItem('ws-user-id'), null)
    loading.value = false
  } catch (error) {

  }
})

const searchQuery = (query) => {

}
</script>

<style lang="scss" scoped></style>
