<template>
  <div
    class="w-full py-3 border bg-white rounded-md border-slate-200 pl-4 pr-2 uppercase font-medium hover:bg-slate-50 transition-all duration-150">

    <div class="w-full h-full hidden lg:grid grid-cols-7 gap-2 ">
      <span class=" my-auto flex items-center truncate">{{ format(item.created_at, 'dd-MM-yyyy') }}</span>
      <span class=" my-auto flex items-center truncate">{{ item.code }}</span>
      <a :href="item.url" target="_blank" class="flex items-center justify-between w-full overflow-hidden my-auto">
        <span class="flex-1  flex items-center truncate">{{ item.name }}</span>

        <external-link-icon class="w-5 h-5 mr-2 fill-slate-500" />
      </a>
      <!--
      <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.price_item) }}</span> -->
      <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.domestic_shipping) }} </span>
      <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.service) }} </span>
      <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.total_price) }} </span>

      <div class="flex items-center justify-between my-auto ">

        <div class="flex-1 flex items-center justify-between my-auto truncate">
          <span :class="[
            item.state
              === 'rw' ? 'bg-purple-100 text-purple-600' :
              item.state === 'ip' ? 'bg-amber-100 text-amber-600' :
                item.state === 'p' ? 'bg-slate-100 text-slate-600' :
                  item.state === 'v' ? 'bg-emerald-100 text-emerald-600' :
                    item.state === 'n' ? 'bg-blue-100 text-blue-600' : ''
          ]" class=" flex items-center truncate w-fit px-3 rounded  py-1">{{ item.state
            === 'rw' ? 'in wharehouse' : item.state
              === 'ip' ? 'in progress' : item.state
                === 'p' ? 'prending' : item.state
                  === 'v' ? 'approved' : item.state
                    === 'n' ? 'new' : item.state }}</span>
        </div>
        <item-more :item="item" />
      </div>
    </div>

    <div class="w-full h-full flex flex-col lg:hidden gap-2 ">
      <div class="w-full flex gap-2">
        <span class="flex-1 my-auto flex items-center truncate">{{ item.created_at ? format(item.created_at,
          'dd-MM-yyyy') :
          '------'
        }}</span>
        <item-more :item="item" />
      </div>

      <div class="w-full grid grid-cols-2 gap-2">
        <span class=" my-auto flex items-center truncate">{{ item.code }}</span> <span :class="[
          item.state
            === 'rw' ? 'bg-purple-100 text-purple-600' :
            item.state === 'ip' ? 'bg-amber-100 text-amber-600' :
              item.state === 'p' ? 'bg-slate-100 text-slate-600' :
                item.state === 'v' ? 'bg-emerald-100 text-emerald-600' :
                  item.state === 'n' ? 'bg-blue-100 text-blue-600' : ''
        ]" class=" flex items-center truncate w-fit px-3 rounded  py-1">{{ item.state
          === 'rw' ? 'in wharehouse' : item.state
            === 'ip' ? 'in progress' : item.state
              === 'p' ? 'prending' : item.state
                === 'v' ? 'approved' : item.state
                  === 'n' ? 'new' : item.state }}</span>

        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.company') }}</span>
        <a :href="item.url" target="_blank" class="flex items-center justify-between w-full overflow-hidden my-auto">
          <span class="flex-1  flex items-center truncate">{{ item.name }}</span>

          <external-link-icon class="w-5 h-5 mr-2 fill-slate-500" />
        </a>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.itemsValue') }}</span>

        <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.price_item) }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.domesticShippementCharges') }}</span>

        <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.domestic_shipping) }} </span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.serviceCharge') }}</span>
        <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.service) }} </span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.total') }}</span>

        <span class=" my-auto flex items-center truncate"> $ {{ numberFormat(item.total_price) }} </span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.instructions') }}</span>
        <span class=" my-auto flex items-center truncate"> {{ item.Instructions }}</span>
      </div>
    </div>


  </div>
</template>

<script setup>
import { format } from 'date-fns';
import externalLinkIcon from '@/assets/icons/externalLinkIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import itemMore from './itemMore.vue';

const useWidget = useWidgetStore()
const props = defineProps(['item', 'index'])
</script>

<style lang="scss" scoped></style>
