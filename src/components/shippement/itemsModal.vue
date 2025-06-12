<template>
  <input type="checkbox" :checked="useWidget.orderItems" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="w-full max-w-[1200px] h-full modal-box flex flex-col p-4">
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

              <externalLinkIcon :class="useInbox.focusedInbox.tracking_url ? 'fill-slate-500' : 'fill-slate-300'"
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
          <div class="w-full h-full border border-slate-200 rounded-lg flex flex-col overflow-hidden">
            <div :class="route.name === 'inbox' ? 'grid-cols-4' : 'grid grid-cols-3'"
              class="w-full h-14 border-b border-slate-200  px-4 grid gap-2 uppercase font-medium">
              <span :class="useWidget.userLanguage === 'ar' ? 'border-l' : 'border-r'"
                class="pl-16 my-auto border-slate-200 h-8 flex items-center">{{ t('commun.item') }}</span>

              <span class="my-auto  border-slate-200 h-8 flex items-center">{{ t('commun.code') }}</span>

              <span :class="useWidget.userLanguage === 'ar' ? 'border-l' : 'border-r'"
                class="my-auto h-8 flex items-center border-slate-200 ">{{ t('commun.price') }}</span>
              <span v-if="route.name === 'inbox'" class="my-auto h-8 flex items-center">{{ t('commun.status') }}</span>
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
import { useWidgetStore } from '@/stores/widget';
import appsIcon from '@/assets/icons/appsIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import listIcon from '@/assets/icons/listIcon.vue';
import externalLinkIcon from '@/assets/icons/externalLinkIcon.vue';
import modalListItem from './modalListItem.vue';
import noImageIcon from '@/assets/icons/noImageIcon.vue';
import modalItem from './modalItem.vue';
import { ref } from 'vue';
import { useInboxStore } from '@/stores/inbox';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute()
const isGrid = ref(false)
const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const { t } = useI18n()

</script>

<style lang="scss" scoped></style>
