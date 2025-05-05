<template>
  <div class="w-full flex flex-col hover:bg-slate-50 transition-all duration-150 rounded-md relative">
    <div class="w-8 h-8 absolute right-2 top-2">
      <slot name="options"></slot>
    </div>
    <div class="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
      <img v-if="env + item.images" class="w-full h-full object-cover" :src="env + item.images" alt=""
        v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }">
      <no-image-icon v-else class="w-10 h-10 fill-slate-400" />
    </div>

    <div class="w-full flex gap-4 p-4 overflow-hidden">
      <div class="flex-1 flex flex-col overflow-hidden">
        <span class="text-md font-semibold uppercase truncate">{{ item.qty }} x {{ item.name }}</span>
        <span class="text-slate-500">0123456</span>
      </div>


      <div class="flex-1 flex flex-col items-end">
        <span class="text-slate-500">{{ name }}</span>
        <span class="text-md font-semibold uppercase">{{ item.total ? numberFormat(item.total) : item.total }} $</span>
      </div>
    </div>
    <span class="px-4 text-justify"></span>
  </div>
</template>

<script setup>
import noImageIcon from '@/assets/icons/noImageIcon.vue';
const props = defineProps(['item', 'name'])
const env = import.meta.env.VITE_WORLDSHIP_API
</script>

<style lang="scss" scoped></style>
