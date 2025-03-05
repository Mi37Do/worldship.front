<template>
  <div class="w-full h-fit lg:h-[4.5rem] border bg-white rounded-md border-slate-200  transition-all duration-150">

    <div class="w-full h-full hidden lg:grid grid-cols-5 gap-2 uppercase font-medium hover:bg-slate-50 px-4 ">
      <div class="w-full h-full flex items-center gap-4">
        <div class="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
          <img v-if="item.images" :src="item.images" alt=""
            v-viewer="{ button: true, navbar: false, title: false, toolbar: false, tooltip: false, movable: false, zoomable: false, rotatable: false, scalable: false, keyboard: true }">
          <no-image-icon v-else class="w-6 h-6 fill-slate-500" />
        </div>
        <span class="h-8  my-auto  flex items-center truncate">{{ format(item.created_at, 'dd-MM-yyyy | hh:mm')
        }}</span>
      </div>


      <span class="h-8 my-auto flex items-center truncate">{{ item.code }}</span>
      <span class="h-8 my-auto flex items-center truncate">{{ item.warehouse_order_ids.length }}</span>

      <!-- ('p', 'In Process'),
        ('wp', 'Wait Payment'),
        ('so', 'Shipped Out'),
        ('do', 'Delivered'),
        ('co', 'Canceled')
 -->

      <span :class="[item.state === 'p' ?
        'bg-slate-100 text-slate-500' : item.state === 'wp' ? ' text-violet-500 bg-violet-100' : item.state === 'so' ? ' text-amber-500 bg-amber-100' : item.state === 'do '
          ?
          ' text-emerald-500 bg-emerald-100' : ' text-red-500 bg-red-100']"
        class="h-8 my-auto flex items-center truncate bg-slate-100 w-fit px-3 rounded">{{ item.state === 'p' ?
          'In Process' : item.state === 'wp' ? 'Wait Payment' : item.state === 'so' ? 'Shipped Out' : item.state === 'do '
            ?
            'Delivered' : 'Canceled' }}</span>

      <div class="w-full flex items-center my-auto justify-between">

        <span :class="[
          item.is_payed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600',
          'h-8 my-auto flex items-center truncate w-fit px-3 rounded']">{{ item.is_payed ? 'paid' : 'unpaid' }}</span>

        <item-more :item="item" />
      </div>
    </div>

    <div class="w-full h-ffit flex flex-col lg:hidden gap-2 uppercase font-medium overflow-hidden">
      <div class="w-full h-32 flex items-center justify-center bg-slate-100 relative">

        <div class="absolute right-3 top-3 bg-white rounded-md">
          <item-more :item="item" />
        </div>


        <img v-if="item.images" :src="item.images" alt="" class="w-full h-full object-cover"
          v-viewer="{ button: true, navbar: false, title: false, toolbar: false, tooltip: false, movable: false, zoomable: false, rotatable: false, scalable: false, keyboard: true }">

        <no-image-icon v-else class="w-12 h-12 fill-slate-500" />
      </div>


      <div class="w-full h-fit overflow-hidden flex flex-col gap-1 items-center justify-center p-3">
        <div class="w-full flex items-center justify-between ">
          <div class="flex-1 flex flex-col">
            <span class="h-8  my-auto  flex items-center truncate">{{ format(item.created_at, 'dd-MM-yyyy | hh:mm')
            }}</span><span class=" my-auto flex items-center truncate">{{ item.code }}</span>
          </div>


          <span :class="[
            item.is_payed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600',
            'h-8 my-auto flex items-center truncate w-fit px-3 rounded']">{{ item.is_payed ? 'paid' : 'unpaid'
            }}</span>
        </div>


        <div class="w-full flex items-center justify-between">

          <span class="h-8  my-auto flex items-center font-semibold">{{ $t('commun.orders') }}</span>
          <span class="h-8 my-auto flex items-center truncate bg-slate-100 px-3 rounded-md">{{
            item.warehouse_order_ids.length
          }}</span>
        </div>


        <div class="w-full flex items-center justify-between">

          <span class="h-8  my-auto flex items-center  font-semibold">{{ $t('commun.status') }}</span>
          <span class="h-8 my-auto flex items-center truncate bg-slate-100 w-fit px-3 rounded">{{ item.state }}</span>



        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import noImageIcon from '@/assets/icons/noImageIcon.vue';
import itemMore from './itemMore.vue';

const props = defineProps(['item', 'index'])
</script>

<style lang="scss" scoped></style>
