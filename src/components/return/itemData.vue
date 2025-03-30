<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2']"
    class="w-full py-3 border bg-white rounded-md border-slate-200   uppercase font-medium hover:bg-slate-50 transition-all duration-150">

    <div class="w-full h-full hidden lg:grid grid-cols-7 gap-2">
      <span class=" my-auto flex items-center truncate">{{ item.created_at ? format(item.created_at, 'dd-MM-yyyy') :
        '------'
      }}</span>
      <span class=" my-auto flex items-center truncate">{{ item.code }}</span>

      <span class="flex-1  flex items-center truncate my-auto ">{{ item.company }}</span>
      <span class=" my-auto flex items-center truncate"> {{ item.no_tracking }}</span>
      <span class=" my-auto flex items-center truncate"> {{ item.return_reason || '-------' }}</span>
      <a :href="item.return_doc" target="_blank"
        class=" flex items-center truncate bg-slate-100 px-3 rounded text-slate-600 py-1 w-fit overflow-hidden">
        <file-download-icon :class="[item.return_doc ? 'fill-primary' : 'fill-slate-400']" class="w-5 h-5" />
      </a>

      <div class="flex items-center justify-between my-auto ">
        <span class=" flex items-center truncate bg-emerald-100 w-fit px-3 rounded text-emerald-600 py-1">{{ item.state
          === 'ip' ? 'In Process' : item.state === 'nr' ? 'Pending' : 'Returned'
        }}</span>
        <!-- (
        ('p', 'In Process'),
        ('wp', 'Wait Payment'),
        ('so', 'Shipped Out'),
        ('do', 'Delivered'),
        ('co', 'Canceled')
    ) -->
        <item-more :item="item" />
      </div>
    </div>

    <div class="w-full h-fit lg:hidden flex flex-col gap-2">
      <div class="w-full flex gap-2">
        <span class="flex-1 my-auto flex items-center truncate">{{ item.created_at ? format(item.created_at,
          'dd-MM-yyyy') :
          '------'
        }}</span>
        <item-more :item="item" />
      </div>

      <div class="w-full grid grid-cols-2 gap-2">

        <span class=" my-auto flex items-center truncate">{{ item.code }}</span> <span
          class=" flex items-center truncate bg-emerald-100 w-fit px-3 rounded text-emerald-600 py-1">{{ item.state
          }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.company') }}</span>
        <span class="flex-1  flex items-center truncate my-auto ">{{ item.company }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.noTracking') }}</span>
        <span class=" my-auto flex items-center truncate"> {{ item.no_tracking }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.reason') }}</span>
        <span class=" my-auto flex items-center truncate"> {{ item.return_reason || '-------' }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.document') }}</span><a
          :href="item.return_doc" target="_blank"
          class=" flex items-center truncate bg-slate-100 px-3 rounded text-slate-600 py-1 w-fit overflow-hidden">
          <file-download-icon :class="[item.return_doc ? 'fill-primary' : 'fill-slate-400']" class="w-5 h-5" />
        </a>
      </div>

    </div>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import fileDownloadIcon from '@/assets/icons/fileDownloadIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import itemMore from './itemMore.vue';

const useWidget = useWidgetStore()
const props = defineProps(['item', 'index'])

console.log(props.item);

</script>

<style lang="scss" scoped></style>
