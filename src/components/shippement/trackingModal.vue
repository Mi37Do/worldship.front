<template>
  <input type="checkbox" :checked="useWidget.tracking" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="w-full max-w-md h-full modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4 border-b border-slate-200">
        <span class="pixa-title">tracking</span>
        <button @click="() => {
          useWidget.tracking = false
          useInbox.focusedShippement = null
        }" class="btn btn-sm pixa-btn w-10 p-0 pixa-btn-nofloat">
          <times-icon class="w-5" />
        </button>
      </div>

      <div class="w-full flex-1 overflow-hidden">


        <div v-if="useInbox.focusedShippement" class="w-full h-full overflow-auto">
          <div class="w-full h-fit">
            <div v-for="(i, index) in useInbox.focusedShippement.label_shipp
              .tracking_ship" :key="i" :class="index % 2 ? 'bg-slate-100' : ''" class="w-full flex px-4">
              <div class="w-px  flex flex-col items-center">
                <span :class="index === 0 ? '' : 'bg-slate-400'" class="h-6 w-1 "></span>
                <div class="w-2 h-2 rounded-full bg-slate-500 outline outline-2 outline-white z-10"></div>
                <span :class="index === useInbox.focusedShippement.label_shipp
                  .tracking_ship.length - 1 ? '' : 'bg-slate-400'" class="flex-1 w-1"></span>
              </div>
              <div class="flex-1 h-fit flex flex-col gap-1.5 p-3">
                <span class="font-medium text-lg truncate">{{ i.name }}</span>
                <span>{{ i.date_act }}</span>
                <span>{{ i.description }}</span>
              </div>
            </div>
          </div>
        </div>


        <div v-else class="w-full h-full flex items-center justify-center">
          <span class="loading loading-ring loading-sm"></span>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import timesIcon from '@/assets/icons/timesIcon.vue';

const useWidget = useWidgetStore()
const useInbox = useInboxStore()

</script>

<style lang="scss" scoped></style>
