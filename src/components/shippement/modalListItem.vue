<template>
  <div
    class="w-full h-16 transition-all duration-200 border-b border-slate-200 hover:bg-slate-50 grid grid-cols-4 gap-4 px-4 uppercase">
    <div class="w-full h-full flex gap-4 items-center">
      <div class="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center"
        v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }">
        <img v-if="item.images" :src="item.images" alt="">
        <no-image-icon v-else class="w-6 h-6 fill-slate-500" />
      </div>
    </div>


    <div class="w-full flex gap-4 p-4">

      <div class="flex-1 flex flex-col justify-between">
        <span class="text-md font-semibold uppercase">{{ item.qty }} x {{ item.name }}</span>
        <span class="text-slate-500">{{ item.code }}</span>

      </div>
      <div class="flex flex-col gap-2 items-end">

        <span :class="item.is_valid ? ' bg-emerald-100 text-emerald-500' : 'text-red-500 bg-red-100'"
          class="my-auto px-2 py-1 w-fit rounded-md">{{
            item.is_valid
          }}</span>
        <span class="text-md font-semibold uppercase mt-auto">{{ numberFormat(item.price) }} $</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import noImageIcon from '@/assets/icons/noImageIcon.vue';
import { useInboxStore } from '@/stores/inbox';

const props = defineProps(['item'])

const tempPrice = ref(props.item.price)
const useInbox = useInboxStore()
const loading = ref(false)

const newPrice = async () => {
  try {
    loading.value = true
    let response = await axios.post(`/Dashboard/updateValueOrder_API/${props.item.id}|${tempPrice.value}`)
    await useInbox.getInbox(localStorage.getItem('ws-user-id'))

  } catch (error) {

  }
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
