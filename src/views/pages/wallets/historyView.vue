<template>
  <div v-if="loading" class="w-full h-full flex items-center justify-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>
  <div v-else class="w-full h-full flex flex-col overflow-hidden">
    <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
      class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-7 gap-2 uppercase font-bold text-primary bg-white">

      <span class="h-8 my-auto flex items-center">{{ $t('commun.created') }}</span>
      <span class="h-8  my-auto flex items-center">{{ $t('commun.addingType') }}</span>
      <span class="h-8  my-auto flex items-center">{{ $t('commun.from') }}</span>
      <span class="h-8  my-auto flex items-center">{{ $t('commun.type') }}</span>
      <span class="h-8  my-auto flex items-center">{{ $t('commun.depositAmount') }}</span>
      <span class="h-8  my-auto flex items-center">{{ $t('commun.details') }}</span>
      <span class="h-8  my-auto flex items-center">{{ $t('commun.status') }}</span>
    </div>

    <div class="w-full flex-1 overflow-auto flex flex-col">
      <div class="w-full h-fit flex flex-col gap-2 pt-2">
        <itemData v-for="item in useProfile.wallets" :key="item" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';
import { useWidgetStore } from '@/stores/widget';
import itemData from '@/components/wallet/itemData.vue';
import { onMounted, ref } from 'vue';


const useWidget = useWidgetStore()
const useProfile = useProfileStore()
const loading = ref(false)

onMounted(async () => {
  try {
    await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})
</script>

<style lang="scss" scoped></style>
