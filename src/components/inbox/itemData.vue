<template>
  <div
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-5 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">


    <div class="w-full flex items-center gap-4">

      <slot name="checkboxSelect"></slot>
      <span class="h-8 my-auto flex items-center truncate ">{{ format(item.created_at, 'dd-MM-yyyy') }}</span>

    </div>


    <span :class="[
      'h-8 my-auto w-full gap-2 truncate px-3 rounded lg:hidden flex justify-end']">

      <div class="absolute right-3 top-3">

        <item-more :item="item" />
      </div>
      <!--
      <commun-switch :enabled="shipped" /> -->
    </span>


    <span class="uppercase h-8 my-auto flex items-center truncate font-bold  lg:hidden">{{ $t('commun.code')
    }}</span>

    <div class="w-full flex items-center gap-4">
      <span class="h-8 my-auto flex items-center truncate">{{ item.code }}</span>
    </div>

    <span class="uppercase h-8 my-auto flex items-center truncate font-bold  lg:hidden">{{ $t('commun.company')
    }}</span>
    <a :href="item.tracking_url" target="_blank" :class="item.tracking_url ? 'cursor-pointer' : 'cursor-not-allowed'"
      class="w-full flex items-center gap-3 ">
      <div class="flex-1 flex flex-col gap-0 ">

        <span :class="[
          'my-auto items-center truncate w-fit rounded flex overflow-hidden']">{{ item.no_tracking
          }}</span>
        <span class="my-auto flex items-center truncate text-xs text-slate-400"> {{ item.company }}</span>
      </div>

      <ExternalLinkIcon :class="item.tracking_url ? 'fill-slate-500' : 'fill-slate-300'" class="w-5 h-5 mr-4" />
    </a>


    <span class="uppercase h-8 my-auto flex items-center truncate font-bold  lg:hidden  ">{{
      $t('commun.weight')
    }}</span>
    <span class="h-8 my-auto flex items-center truncate  "> {{ numberFormat(item.weight) }} lbs</span>



    <span class="uppercase h-8 my-auto flex items-center truncate font-bold  lg:hidden  ">
      {{ $t('commun.price')
      }}</span>

    <div class="flex items-center justify-between">


      <span class="h-8 my-auto flex items-center truncate  "> $ {{ numberFormat(item.total_price) }}</span>

      <item-more :item="item" class="hidden lg:block" />
    </div>

    <button @click="() => {
      item.selected_to_ship = !item.selected_to_ship
    }" :class="[
      item.selected_to_ship ? 'pixa-btn-nofloat-delete' : 'pixa-btn-nofloat',
      'btn btn-sm pixa-btn flex col-span-2 lg:hidden']">
      <timesCircleIcon v-if="item.selected_to_ship" class="w-5 h-5" />
      <checkCircleIcon v-else class="w-5 h-5" />
      {{ item.selected_to_ship ? 'unselect from' : 'select to' }}
      ship
    </button>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { useI18n } from 'vue-i18n';
import itemMore from './itemMore.vue';
import { onMounted, ref, watch } from 'vue';
import timesCircleIcon from '@/assets/icons/timesCircleIcon.vue';
import checkCircleIcon from '@/assets/icons/checkCircleIcon.vue';
import ExternalLinkIcon from '@/assets/icons/externalLinkIcon.vue';

const props = defineProps(['item', 'shipped', 'index'])
const emits = defineEmits(['selectEnabledEmited'])
const enabled = ref(false)

const { t } = useI18n()

onMounted(() => {
  enabled.value = props.shipped
})

watch(() => props.shipped, () => {
  enabled.value = props.shipped
})

const onSelectedEnabled = () => {
  emits('selectEnabledEmited', {
    enabled: enabled.value,
    item: props.item
  })
}
</script>

<style lang="scss" scoped></style>
