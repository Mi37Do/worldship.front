<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 pb-4 flex flex-col gap-4 overflow-hidden">

      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>
          <span class="pixa-title">{{ $t('commun.wallets') }}</span>
        </div>
      </div>

      <div class="w-full flex-1 flex flex-col overflow-hidden">
        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<script setup>
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
    await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})
</script>

<style lang="scss" scoped></style>
