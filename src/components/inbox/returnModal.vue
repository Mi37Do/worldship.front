<template>
  <input type="checkbox" id="userDeleteModal" :checked="useWidget.returnInbox" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="modal-box flex flex-col min-h-80 gap-2 items-center justify-center p-4">
      <div v-if="!item" class="w-full flex flex-col h-full gap-2 items-center justify-center"></div>
      <form v-else @submit.prevent="returnInbox(item.id)"
        class="w-full flex flex-col h-full gap-2 items-center justify-center">

        <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
          <exclamation-triangle-icon class="w-8 h-8 mb-1 fill-red-500" />
        </div>

        <span class="uppercase text-lg mt-2">are you sure?</span>
        <span class="mb-6">You are going to return <span class="font-bold">{{ item.code
            }}</span></span>

        <div class="w-full flex-1 flex flex-col gap-2 mb-2">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">reason <span class="text-red-500">*</span></span>
            </div>
            <textarea name="" required v-model="returnPackage.return_reason" class="pixa-textarea w-full h-full"
              id=""></textarea>
          </label>

          <div
            class="w-full h-40 bg-slate-100 rounded-md border border-slate-200 mt-2 flex flex-col gap-4 items-center justify-center fill-slate-500 relative">
            <input type="file" required @change="handleFileChange" class="absolute w-full h-full inset-0 opacity-0">
            <paper-clip-icon class="w-8 h-8" />
            <span class="uppercase">{{ fileName ? fileName : 'choose file' }} </span>
            <div class="btn btn-sm pixa-btn-nofloat">upload file</div>
          </div>
        </div>

        <div class="w-full h-10 grid grid-cols-2 gap-4">
          <button :disabled="loadingReturn" @click="closeModal" type="button"
            class="btn btn-sm pixa-btn pixa-btn-nofloat">No,
            keep it</button>

          <button :disabled="loadingReturn" type="submit"
            class="btn btn-sm pixa-btn bg-red-500 hover:bg-red-600 text-white border-0">

            <span v-if="loadingReturn" @click="closeModal" class="loading loading-ring loading-sm"></span>
            <span v-else>yes, return
              it!</span>
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import paperClipIcon from '@/assets/icons/paperClipIcon.vue';
import { useWidgetStore } from '@/stores/widget'
import exclamationTriangleIcon from '@/assets/icons/exclamationTriangleIcon.vue';
import axios from 'axios';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { objectToFormData } from '@/utils/formDataUtils'
import { useInboxStore } from '@/stores/inbox';

const props = defineProps(['item'])
const emits = defineEmits(['deleteItem'])
const useWidget = useWidgetStore()
const loadingReturn = ref(false)
const route = useRoute()
const fileName = ref('')
const useInbox = useInboxStore()

const returnPackage = reactive(
  {
    row_id: null,
    return_reason: '',
    return_doc: null
  }
)

const closeModal = () => {
  useWidget.returnInbox = false
  Object.assign(returnPackage, {
    row_id: null,
    return_reason: '',
    return_doc: null
  })
}

const handleFileChange = (event) => {
  returnPackage.return_doc = event.target.files[0]; // Get the first file
  if (returnPackage.return_doc) {
    fileName.value = returnPackage.return_doc.name; // Set the file name
  } else {
    fileName.value = ''; // Clear the file name if no file is selected
  }
}

const returnInbox = async (id) => {

  loadingReturn.value = true
  returnPackage.row_id = id
  let formData = objectToFormData(returnPackage)

  try {
    let response = await axios.post(`/Dashboard/in_box_API/${1}`, formData)
    await useInbox.getInbox(localStorage.getItem('ws-user-id'))
    closeModal()
  } catch (error) {
    console.error(error)
  }

  loadingReturn.value = false

  /**
  loadingReturn.value = true
  emits('deleteItem', id)*/
}

watch(() => useWidget.deleteModal, () => {
  if (useWidget.returnInbox) return
  else {
    loadingReturn.value = false
  }
}, { deep: true })

</script>


<style lang="scss" scoped></style>
