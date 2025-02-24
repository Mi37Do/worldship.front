<template>
  <div @click="onSelectedEnabledContact(true)" :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2']"
    class="w-full h-14 border-b border-slate-200 grid grid-cols-4 gap-2 cursor-pointer uppercase font-medium hover:bg-slate-50 transition-all duration-150">
    <span class="h-8 my-auto flex items-center truncate">{{ item.name }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ formatPhoneNumber(item.phone) }} </span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.second_phone ? formatPhoneNumber(item.second_phone) :
      '------' }}</span>

    <div class="flex items-center justify-between my-auto relative">


      <span class="h-8 my-auto flex items-center truncate">{{ item.city_id.name }}</span>

      <div :class="enabled ? 'bg-primary/10' : ''" class="flex gap-2 items-center w-28 py-1 rounded-md px-2">
        <check-icon :class="enabled ? 'fill-primary' : 'fill-slate-300'" class="w-5 h-5" />
        <span v-if="enabled" class="text-primary text-xs">selected</span>
        <span class="flex-1"></span>
      </div>


      <div v-if="enabled" class="w-full h-full absolute inset-0 bg-trensparent z-10"></div>
    </div>

  </div>
</template>

<script setup>
import checkIcon from '@/assets/icons/checkIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { formatPhoneNumber } from '@/utils/phoneUtils';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useInboxStore } from '@/stores/inbox';
import { useBookStore } from '@/stores/addressBook';
import { watch } from 'vue';

const useWidget = useWidgetStore()
const props = defineProps(['item', 'enabled'])
const emits = defineEmits(['changeBook'])
const route = useRoute()
const useBook = useBookStore()
const useInbox = useInboxStore()


const onSelectedEnabledContact = async (value) => {
  if (value) {
    emits('changeBook', props.item.id)
  } else {
    return
  }
}
</script>

<style lang="scss" scoped></style>
