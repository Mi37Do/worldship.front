<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2']"
    class="w-full h-52 bg-blue-300 rounded-lg border border-slate-200 relative overflow-hidden p-5 uppercase text-white">

    <div class="w-full h-full flex flex-col justify-between gap-3">
      <div class="w-full flex gap-3 justify-between items-center overflow-hidden z-10">
        <span class="font-medium text-lg truncate flex-1">{{ item.name }}</span>
        <img src="@/assets/pics/visa.svg" class="w-8" alt="">
      </div>

      <div class="w-fit grid grid-cols-4 gap-3 text-xl font-semibold z-10">
        <span>****</span>
        <span>****</span>
        <span>****</span>
        <span>{{ item.last_4 }}</span>
      </div>

      <div class="w-full flex gap-3 justify-between items-center overflow-hidden z-10">
        <div class="flex flex-col gap-1 flex-1">
          <span class="text-xs">card holder name</span>
          <span>{{ item.user.first_name }} {{ item.user.last_name }}</span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-xs">expiry date</span>
          <span>{{ item.exp_month < 10 ? `0${item.exp_month}` : item.exp_month }} / {{ item.exp_year - 2000 }}</span>
        </div>
        <button @click="async () => {
          let response = await axios.post(`/Dashboard/deleteCard_API/${item.id}`)
          await useInvoices.getCards(localStorage.getItem('ws-user-id'))
        }" class="btn btn-sm btn-square pixa-btn-float">
          <trash-icon class="w-5 h-5" />
        </button>
      </div>
    </div>



    <div class="w-80 h-80 bg-blue-500/20 rounded-full absolute -right-32 -bottom-32"></div>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import trashIcon from '@/assets/icons/trashIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import axios from 'axios';
import { useInvoicesStore } from '@/stores/invoices';

const useWidget = useWidgetStore()
const useInvoices = useInvoicesStore()
const props = defineProps(['item'])

console.log(props.item);

</script>

<style lang="scss" scoped></style>
