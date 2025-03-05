<template>
  <div :class="route.name === 'inbox' ? 'grid-cols-4' : 'grid grid-cols-3'"
    class="w-full h-16 transition-all grid duration-200 border-b border-slate-200 hover:bg-slate-50  gap-4 px-4 uppercase">
    <div class="w-full h-full flex gap-4 items-center">
      <div class="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center"
        v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }">
        <img v-if="item.images" :src="item.images" alt="">
        <no-image-icon v-else class="w-6 h-6 fill-slate-500" />
      </div>
      <span>{{ item.qty }} x {{ item.name }}</span>
    </div>

    <span class="my-auto">{{ item.code }}</span>


    <input v-if="route.name === 'inbox'" type="text" class="pixa-input my-auto px-4" v-model="tempPrice"
      @input="newPrice" step="0.01">

    <span v-else class="my-auto">${{ tempPrice }}</span>
    <div v-if="route.name === 'inbox'" class="w-full flex items-center justify-between">
      <span :class="item.is_valid ? ' bg-emerald-100 text-emerald-500' : 'text-red-500 bg-red-100'"
        class="my-auto px-2 py-1 w-fit rounded-md">{{
          item.is_valid ? 'valide' : 'invalide'
        }}</span>

      <span v-if="loading" class="loading loading-ring loading-sm"></span>
    </div>

  </div>
</template>

<script setup>
import noImageIcon from '@/assets/icons/noImageIcon.vue';

import checkIcon from '@/assets/icons/checkIcon.vue';
import { ref } from 'vue';
import axios from 'axios';
import { useInboxStore } from '@/stores/inbox';
import { useRoute } from 'vue-router';

const props = defineProps(['item'])
const tempPrice = ref(props.item.price)
const useInbox = useInboxStore()
const loading = ref(false)
const route = useRoute()

const newPrice = async () => {
  loading.value = true
  setTimeout(async () => {
    try {
      let response = await axios.get(`/Dashboard/updateValueOrder_API/${props.item.id}/${tempPrice.value}`);
      await useInbox.getInbox(localStorage.getItem('ws-user-id'))
      useInbox.filtredInboxs = useInbox.inboxs
      // ... rest of your code ...
    } catch (error) {
      console.error(error)

      // Handle errors (don't leave empty!)
    }
  }, 2000)

  loading.value = false
};
</script>

<style lang="scss" scoped></style>
