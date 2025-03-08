<template>
  <input type="checkbox" id="userDeleteModal" :checked="useWidget.sendBuyForMe" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="modal-box flex flex-col h-60 gap-2 items-center justify-center p-4">
      <div class="w-full flex flex-col h-60 gap-2 items-center justify-center">

        <div class="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
          <exclamation-triangle-icon class="w-8 h-8 mb-1 fill-primary" />
        </div>

        <span class="uppercase text-lg mt-2">are you sure?</span>
        <span class="mb-6">You are going to send <span class="font-bold">{{ item.code
            }}</span></span>

        <div class="w-full h-10 grid grid-cols-2 gap-4">



          <button :disabled="loadingSent" @click="sendItem()" class="btn btn-sm pixa-btn btn-primary border-0">

            <span v-if="loadingSent" class="loading loading-ring loading-sm"></span>
            <span v-else>yes, send
              it!</span>
          </button>

          <button :disabled="loadingSent" @click="closeModal" class="btn btn-sm pixa-btn pixa-btn-nofloat">No,
            wait</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget'
import exclamationTriangleIcon from '@/assets/icons/exclamationTriangleIcon.vue';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps(['item'])
const emits = defineEmits(['deleteItem'])
const useWidget = useWidgetStore()
const loadingSent = ref(false)
const route = useRoute()

const closeModal = () => {
  useWidget.sendBuyForMe = false
}

const sendItem = async () => {
  loadingSent.value = true
  try {
    let response = await axios.get(`/Dashboard/SendBFM_API/${props.item.id}/${localStorage.getItem('ws-user-id')}`)
    useInbox.filterBuyForMes = useInbox.buyForMes
  } catch (error) {
    console.error(error)
  }
  loadingSent.value = false
}

watch(() => useWidget.sendBuyForMe, () => {
  if (useWidget.sendBuyForMe) return
  else {
    loadingSent.value = false
  }
}, { deep: true })

</script>


<style lang="scss" scoped></style>
