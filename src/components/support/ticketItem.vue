<template>
  <router-link :to="{ name: 'chat', params: { id: item.id } }"
    class="w-full h-20  border-b border-slate-200 hover:bg-slate-50 transition-all duration-200 p-4 flex gap-4 cursor-pointer">
    <div class="w-12 h-12 bg-slate-100 rounded-full"></div>
    <div class="flex-1 flex flex-col h-full justify-center gap-1 overflow-hidden">
      <div class="flex-1 w-full flex items-center gap-4 overflow-hidden">
        <span class="flex-1 truncate uppercase font-semibold">{{ item.name }}</span>
        <span :class="[
          item.type_s === 'b' ? 'bg-primary/10 text-primary' :
            item.type_s === 'bfm' ? 'bg-indigo-100 text-indigo-600' :
              item.type_s === 'r' ? 'bg-red-100 text-red-600' :
                'bg-emerald-100 text-emerald-600',
          'h-full w-fit px-2 text-center font-semibold rounded pt-[0.07rem]']">{{
            item.type_s === 'o' ? 'order' : item.type_s === 's' ? 'shippement' : item.type_s === 'b' ? 'inbox' :
              item.type_s === 'bfm' ? 'buy for me' : item.type_s === 'r' ? 'return' :
                item.type_s }}</span>
      </div>
      <div class="flex-1 w-full flex items-center gap-4 overflow-hidden">
        <span class="flex-1 truncate">{{ item.support_ticket_message.length > 0 ?
          item.support_ticket_message[item.support_ticket_message.length - 1].message : '-------'
          }}</span>
        <span class="h-full w-6 bg-slate-100 text-center text-slate-600 font-semibold rounded pt-[0.07rem]">{{
          item.support_ticket_message.length }}</span>
      </div>
    </div>
    <div class="w-10 h-10 flex items-center justify-center my-auto">
      <angle-right-icon :class="[
        useSupport.focusedTicket && item.id === useSupport.focusedTicket.id ? 'fill-primary' : 'fill-slate-200',
        'w-6 h-6']" />
    </div>
  </router-link>
</template>

<script setup>
import angleRightIcon from '@/assets/icons/angleRightIcon.vue';
import { useSupportStore } from '@/stores/support';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps(['item'])
const route = useRoute()
const router = useRouter()
const useSupport = useSupportStore()
</script>

<style lang="scss" scoped></style>
