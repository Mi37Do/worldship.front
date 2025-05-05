<template>
  <div class="w-full flex flex-col hover:bg-slate-50 transition-all duration-150 rounded-md">
    <div class="w-full h-40 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden">
      <img v-if="item.images" :src="item.images" alt=""
        v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }">
      <no-image-icon v-else class="w-6 h-6 fill-slate-500" />
    </div>

    <div class="w-full flex gap-4 p-4">

      <div class="flex-1 flex flex-col justify-between">
        <span class="text-md font-semibold uppercase">{{ item.qty }} x {{ item.name }}</span>
        <span class="text-slate-500">{{ item.code }}</span>

      </div>
      <div class="flex flex-col gap-2 items-end">

        <span v-if="route.name === 'inbox'"
          :class="item.is_valid ? ' bg-emerald-100 text-emerald-500' : 'text-red-500 bg-red-100'"
          class="my-auto px-2 py-1 w-fit rounded-md uppercase">{{
            item.is_valid ? 'valide' : 'invalide'
          }}</span>
        <span class="text-md font-semibold uppercase mt-auto">{{ item.price ? numberFormat(item.price) : null }}
          $</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import noImageIcon from '@/assets/icons/noImageIcon.vue';
import { useRoute } from 'vue-router';

const props = defineProps(['item'])
const route = useRoute()
</script>



<style lang="scss" scoped></style>
