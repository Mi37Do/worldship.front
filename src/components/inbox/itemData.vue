<template>
  <div
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-6 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">



    <div class="w-full flex items-center gap-4">

      <div class="flex gap-3 items-center">

        <slot name="checkboxSelect"></slot>
        <button @click="() => {
          if (showItems) {
            showItems = false
          } else {

            showItems = true
          }

          for (let index = 0; index < item.wh_order.length; index++) {
            const element = item.wh_order[index]
            useInbox.items.push({
              id: element.id,
              name: element.name_id.name,
              qty: element.qty,
              images: element.images,
              price: element.price,

              code: element.name_id.code,
              is_valid: element.state === 'v' ? true : false
            })
          }

        }" ref="targetItems" class="btn btn-xs btn-square btn-ghost hidden lg:block">
          <angle-right-icon class="w-5 h-5 rotate-90 fill-slate-500" />
        </button>
      </div>
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

    <span class="h-8 my-auto flex items-center truncate  "> $ {{ numberFormat(item.total_price) }}</span>




    <span class="uppercase h-8 my-auto flex items-center truncate font-bold  lg:hidden  ">
      {{ $t('commun.state')
      }}</span>

    <div class="flex items-center justify-between">


      <span
        :class="item.state_wh === 'a' ? 'bg-emerald-100 text-emerald-500' : item.state_wh === 'r' ? 'bg-red-100 text-red-500' : 'bg-red-100 text-red-500'"
        class="h-8 my-auto flex items-center truncate   px-2 rounded-md "> {{ item.state_wh === 'a' ?
          'aprouved' : item.state_wh === 'r' ?
            'aprouved' : 'Dangerous Goods' }}
      </span>


      <item-more :item="item" class="hidden lg:block" />
    </div>

    <button v-if="item.total_price" @click="() => {
      item.selected_to_ship = !item.selected_to_ship
    }" :class="[
      item.selected_to_ship ? 'pixa-btn-nofloat-delete' : 'pixa-btn-nofloat',
      'btn btn-sm pixa-btn flex col-span-2 lg:hidden']">
      <timesCircleIcon v-if="item.selected_to_ship" class="w-5 h-5" />
      <checkCircleIcon v-else class="w-5 h-5" />
      {{ item.selected_to_ship ? 'unselect from' : 'select to' }}
      ship
    </button>

    <div v-if="showItems" ref="detailItems" class="w-full col-span-2 lg:col-span-6 h-fit hidden lg:block">
      <div class="w-full h-14 flex items-center justify-between pb-4 border-b border-slate-200">
        <span class="pixa-title">items</span>
        <div class="flex gap-2">
          <div class="grid grid-cols-2 gap-1 h-10 rounded bg-slate-100 px-1">
            <button @click="isGrid = true" :class="[
              isGrid ? ' pixa-btn-float' : 'btn-ghost',
              'btn-sm btn-square  m-auto flex items-center justify-center']">
              <apps-icon class="w-5 h-5" />
            </button>

            <button @click="isGrid = false" :class="[
              isGrid ? 'btn-ghost' : ' pixa-btn-float',
              'btn-sm btn-square  m-auto flex items-center justify-center']">
              <list-icon class="w-5 h-5" />
            </button>
          </div>
          <button @click="() => {
            useInbox.items = []
            useInbox.focusedInbox = null
            useWidget.orderItems = false
          }" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <div v-if="useInbox.items.length === 0" class="w-full flex-1 flex">

      </div>

      <div v-else class="w-full flex-1 flex flex-col overflow-hidden">
        <span v-if="useInbox.focusedInbox"
          class="h-40 grid grid-cols-2 gap-2 p-4 uppercase bg-slate-100 rounded-lg border border-slate-200">
          <div class="w-full grid grid-cols-2 gap-2">
            <span class="font-semibold">code</span>
            <span>{{ useInbox.focusedInbox.code }}</span>
          </div>
          <div class="w-full grid grid-cols-2 gap-2">
            <span class="font-semibold">tracking</span>
            <a :href="useInbox.focusedInbox.tracking_url" target="_blank"
              :class="useInbox.focusedInbox.tracking_url ? 'cursor-pointer' : 'cursor-not-allowed'"
              class="w-full flex items-center gap-3 ">
              <div class="flex-1 flex flex-col gap-0 ">

                <span :class="[
                  'my-auto items-center truncate w-fit rounded flex overflow-hidden']">{{
                    useInbox.focusedInbox.no_tracking
                  }}</span>
                <span class="my-auto flex items-center truncate text-xs text-slate-400"> {{
                  useInbox.focusedInbox.company }}</span>
              </div>

              <ExternalLinkIcon :class="useInbox.focusedInbox.tracking_url ? 'fill-slate-500' : 'fill-slate-300'"
                class="w-5 h-5 mr-4" />
            </a>
          </div>

          <div class="w-full grid grid-cols-2 gap-2">
            <span class="font-semibold">weight</span>
            <span>{{ useInbox.focusedInbox.weight }} lbs</span>
          </div>

          <div class="w-full grid grid-cols-2 gap-2">
            <span class="font-semibold">price</span>
            <span>$ {{ useInbox.focusedInbox.total_price }}</span>
          </div>

          <div class="w-full grid grid-cols-2 gap-2">
            <span class="font-semibold">note</span>
            <span> {{ useInbox.focusedInbox ? useInbox.focusedInbox.my_note : '-------' }}</span>
          </div>


          <div v-if="useInbox.focusedInbox.density > 0" class="w-full grid grid-cols-2 gap-2">
            <span class="font-semibold">(L,W,H,Density)</span>
            <span> ( {{ useInbox.focusedInbox.dim_l + ', ' + useInbox.focusedInbox.dim_w + ', ' +
              useInbox.focusedInbox.dim_h + ', ' + useInbox.focusedInbox.density }} )</span>
          </div>

        </span>


        <div v-if="isGrid" class="w-full flex-1 overflow-auto">
          <div class="w-full h-fit grid grid-cols-4 gap-3 py-4 pr-2"
            v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }">
            <modal-item v-for="item in useInbox.items" :key="item" :item="item" />
          </div>
        </div>


        <div v-else class="w-full flex-1 overflow-hidden pt-4">
          <div class="w-full h-full border border-slate-200 rounded-lg flex flex-col overflow-hidden bg-white">
            <div class="w-full h-14 border-b border-slate-200  px-4 grid gap-2 uppercase font-medium grid-cols-4">
              <span class="pl-16 my-auto border-r border-slate-200 h-8 flex items-center">item</span>

              <span class="my-auto border-r border-slate-200 h-8 flex items-center">code</span>

              <span class="my-auto h-8 flex items-center border-r border-slate-200 ">price</span>
              <span class="my-auto h-8 flex items-center">state</span>
            </div>
            <div class="w-full flex-1 overflow-auto">
              <div class="flex flex-col w-full h-fit"
                v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }">
                <modal-list-item v-for="item in useInbox.items" :key="item" :item="item">
                  <template #pic_item>
                    <div class="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center">
                      <img v-if="item.images" :src="item.images" alt="">
                      <no-image-icon v-else class="w-6 h-6 fill-slate-500" />
                    </div>
                  </template>
                </modal-list-item>
              </div>

            </div>
          </div>
          <!--
        <div class="w-full h-fit grid grid-cols-4 gap-3 py-4 pr-2">
          <modal-item v-for="item in 40" :key="item" :item="item" />
        </div> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { useI18n } from 'vue-i18n';
import itemMore from './itemMore.vue';
import { onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import timesCircleIcon from '@/assets/icons/timesCircleIcon.vue';
import checkCircleIcon from '@/assets/icons/checkCircleIcon.vue';
import ExternalLinkIcon from '@/assets/icons/externalLinkIcon.vue';
import angleRightIcon from '@/assets/icons/angleRightIcon.vue';
import modalListItem from '../shippement/modalListItem.vue';
import modalItem from '../shippement/modalItem.vue';
import noImageIcon from '@/assets/icons/noImageIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import listIcon from '@/assets/icons/listIcon.vue';
import appsIcon from '@/assets/icons/appsIcon.vue';
import { useInboxStore } from '@/stores/inbox';

const props = defineProps(['item', 'shipped', 'index'])
const emits = defineEmits(['selectEnabledEmited'])
const enabled = ref(false)
const showItems = ref(false)
const useInbox = useInboxStore()
const isGrid = ref(false)
const targetItems = ref(null)
const detailItems = ref(null)

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



function handleClickOutside(event) {
  if (targetItems.value && !targetItems.value.contains(event.target) && detailItems.value && !detailItems.value.contains(event.target)) {
    // useInbox.items = []
    showItems.value = false
  }
}


watch(() => showItems.value, () => {
  if (showItems.value) {
    null
  } else {
    useInbox.items = []
  }
})


onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})


</script>

<style lang="scss" scoped></style>
