<template>
  <input type="checkbox" id="userDeleteModal" :checked="useWidget.deleteModal.open" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="modal-box flex flex-col h-60 gap-2 items-center justify-center p-4">
      <div v-if="!item" class="w-full flex flex-col h-60 gap-2 items-center justify-center"></div>
      <div v-else class="w-full flex flex-col h-60 gap-2 items-center justify-center">

        <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
          <exclamation-triangle-icon class="w-8 h-8 mb-1 fill-red-500" />
        </div>

        <span class="uppercase text-lg mt-2">are you sure?</span>
        <span class="mb-6">You are going to delete <span class="font-bold">{{ useWidget.deleteModal.designation
            }}</span></span>

        <div class="w-full h-10 grid grid-cols-2 gap-4">
          <button :disabled="loadingDelete" @click="closeModal" class="btn btn-sm pixa-btn pixa-btn-nofloat">No,
            keep it</button>

          <button :disabled="loadingDelete" @click="deleteItem(useWidget.deleteModal.id)"
            class="btn btn-sm pixa-btn bg-red-500 hover:bg-red-600 text-white border-0">

            <span v-if="loadingDelete" class="loading loading-ring loading-sm"></span>
            <span v-else>yes, delete
              it!</span>
          </button>
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
const loadingDelete = ref(false)
const route = useRoute()

const closeModal = () => {
  Object.assign(useWidget.deleteModal, {
    id: null,
    designation: null,
    open: false,
  })
}

const deleteItem = (id) => {
  loadingDelete.value = true
  emits('deleteItem', id)
}

watch(() => useWidget.deleteModal, () => {
  if (useWidget.deleteModal.open) return
  else {
    loadingDelete.value = false
  }
}, { deep: true })

</script>


<style lang="scss" scoped></style>
