<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 pb-4 flex flex-col gap-4 overflow-hidden">
      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>
          <div class="flex-1 flex gap-2 items-center">
            <span class="pixa-title">{{ $t('commun.myRefferals') }}</span>

            <span class="text-lg font-medium">(1 No)</span>
          </div>
        </div>
        <div class="flex gap-2">

          <div
            class="h-10 grid grid-cols-3 gap-2 bg-white shadow-2xl shadow-primary/5 border border-slate-200 rounded uppercase">


            <div class="w-52 flex gap-2 my-auto px-3 ">
              <span class="font-medium">{{ $t('commun.totalVisit') }} :</span>
              <span>{{ useProfile.refferals.user.total_view }}</span>
            </div>

            <div class="w-52 flex gap-2 my-auto px-3 border-x border-slate-200">
              <span class="font-medium">{{ $t('commun.totalChild') }} :</span>
              <span>{{ useProfile.refferals.child_total }}</span>
            </div>

            <div class="w-52 flex gap-2 my-auto px-3 ">
              <span class="font-medium">{{ $t('commun.totalRevenue') }} :</span>
              <span>$ 0.00</span>
            </div>
          </div>

          <!--
          <button class="btn btn-sm pixa-btn pixa-btn-nofloat">
            <plan-icon class="w-5 h-5" />
            ship selected items</button> -->
        </div>
      </div>

      <div class="w-full grid grid-cols-2 gap-4">
        <div
          class="h-10 flex items-center justify-between pr-1 gap-2 bg-white shadow-2xl shadow-primary/5 border border-slate-200 rounded pl-4">
          <span>https://192.168.1.7:8550/registerChild/OzeNlTBFQ</span>
          <button class="btn btn-sm btn-square btn-primary btn-sm-small">
            <copy-icon class="w-5 h-5" />
          </button>
        </div>

        <div
          class="h-10 flex items-center justify-between pr-1 gap-2 bg-white shadow-2xl shadow-primary/5 border border-slate-200 rounded pl-4">
          <span>{{ useProfile.refferals.user.referral_code }}</span>
          <button class="btn btn-sm btn-square btn-primary btn-sm-small">
            <copy-icon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="w-full flex-1 flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-4 gap-2 uppercase font-bold text-primary bg-white">
          <span class="h-8  my-auto flex items-center">{{ $t('commun.customerAaccountCode') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.name') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.code') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.created') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit flex flex-col gap-2 pt-2">
            <referralsItem v-for="item in useProfile.refferals.child_users" :key="item.id" :item="item" />
          </div>
        </div>
      </div>

      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>

          <div class="flex-1 flex gap-2 items-center">
            <span class="pixa-title">{{ $t('commun.myCoins') }}</span>

            <span class="text-lg font-medium">$ {{ useProfile.refferals.coins.length > 0 ?
              numberFormat(useProfile.refferals.coins.total_value) : numberFormat(0) }} </span>
          </div>
        </div>

      </div>


      <div class="w-full flex-1  flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-4 gap-2 uppercase font-bold text-primary bg-white">
          <span class="h-8  my-auto flex items-center">{{ $t('commun.user') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.coins') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.type') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.created') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit  flex flex-col gap-2 pt-2">
            <coinItem v-for="item in useProfile.refferals.coins.coins_details" :key="item" :item="item" />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import coinItem from '@/components/referrals/coinItem.vue';
import referralsItem from '@/components/referrals/referralsItem.vue';
import item from '@/components/coins/item.vue';
import copyIcon from '@/assets/icons/copyIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { useProfileStore } from '@/stores/profile';
import { onMounted, ref } from 'vue';

const useWidget = useWidgetStore()
const useProfile = useProfileStore()
const loading = ref(true)

onMounted(async () => {
  try {
    await useProfile.getRefferals(localStorage.getItem('ws-user-id'))
    console.log(useProfile.refferals)
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})

</script>

<style lang="scss" scoped></style>
