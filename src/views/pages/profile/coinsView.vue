<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 pb-4 flex flex-col gap-4 overflow-hidden">
      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>
          <span class="pixa-title">{{ $t('commun.coins') }}</span>
        </div>
        <div class="flex gap-2">

          <div
            class="h-10 grid grid-cols-2 gap-2 bg-white shadow-2xl shadow-primary/5 border border-slate-200 rounded uppercase">

            <div class="w-48 flex gap-2 my-auto px-3">
              <span class="font-medium">{{ $t('commun.esCoins') }}:</span>
              <span>{{ useProfile.coins.total_coins }}</span>
            </div>

            <div class="w-48 flex gap-2 my-auto px-3 ">
              <span class="font-medium">{{ $t('commun.value') }} :</span>
              <span>{{ numberFormat(useProfile.coins.total_value) }} $</span>
            </div>
          </div>

          <!--
          <button class="btn btn-sm pixa-btn pixa-btn-nofloat">
            <plan-icon class="w-5 h-5" />
            ship selected items</button> -->
        </div>
      </div>

      <div class="w-full flex-1 flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-5 gap-2 uppercase font-bold text-primary bg-white">
          <span class="h-8 my-auto flex items-center">{{ $t('commun.created') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.from') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.type') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.value') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.details') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit flex flex-col gap-2 pt-2">
            <item v-for="item in useProfile.coins.coins_details" :key="item" :item="item" />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import planIcon from '@/assets/icons/planIcon.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import item from '@/components/coins/item.vue';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/stores/profile';
import { onMounted, ref } from 'vue';

const useWidget = useWidgetStore()
const { t } = useI18n()
const useProfile = useProfileStore()
const loading = ref(true)

onMounted(async () => {
  try {
    await useProfile.getCoins(localStorage.getItem('ws-user-id'))
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})
</script>

<style lang="scss" scoped></style>
