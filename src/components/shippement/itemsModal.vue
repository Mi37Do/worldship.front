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
            useWidget.orderItems = false
          }" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <div v-if="useInbox.items.length === 0" class="w-full flex-1 flex">

      </div>

      <div v-else class="w-full flex-1 flex">
        <div v-if="isGrid" class="w-full flex-1 overflow-auto">
          <div class="w-full h-fit grid grid-cols-4 gap-3 py-4 pr-2">
            <modal-item v-for="item in useInbox.items" :key="item" :item="item" />
          </div>
        </div>


        <div v-else class="w-full flex-1 overflow-hidden pt-4">

          <div class="w-full h-full border border-slate-200 rounded-lg flex flex-col overflow-hidden">
            <div :class="route.name === 'inbox' ? 'grid-cols-4' : 'grid grid-cols-3'"
              class="w-full h-14 border-b border-slate-200  px-4 grid gap-2 uppercase font-medium">
              <span class="pl-16 my-auto border-r border-slate-200 h-8 flex items-center">item</span>

              <span class="my-auto border-r border-slate-200 h-8 flex items-center">code</span>

              <span class="my-auto h-8 flex items-center border-r border-slate-200 ">price</span>
              <span v-if="route.name === 'inbox'" class="my-auto h-8 flex items-center">is valide</span>
            </div>
            <div class="w-full flex-1 overflow-auto">
              <div class="flex flex-col w-full h-fit">
                <modal-list-item v-for="item in useInbox.items" :key="item" :item="item" />
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
import modalListItem from './modalListItem.vue';

import modalItem from './modalItem.vue';
import { ref } from 'vue';
import { useInboxStore } from '@/stores/inbox';
import { useRoute } from 'vue-router';

const route = useRoute()
const isGrid = ref(false)
const useWidget = useWidgetStore()
const useInbox = useInboxStore()

</script>

<style lang="scss" scoped></style>
