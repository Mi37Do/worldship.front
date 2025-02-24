<template>
  <input type="checkbox" id="userDeleteModal" :checked="useWidget.supportTicket.open" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="modal-box flex flex-col md:max-w-sm h-fit gap-2 items-center justify-center p-4">
      <form @submit.prevent="supportTicket(useWidget.supportTicket.id)"
        class="w-full flex flex-col h-fit gap-4 items-center ">
        <div class="flex items-center justify-between w-full">
          <span class="pixa-title">new support ticket</span>
          <button type="button" @click="closeModal" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

        <div class="w-full flex-1 flex flex-col gap-2 mb-2">
          <!---->
          <span class="text-slate-500 uppercase">{{ useWidget.supportTicket.designation }}</span>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">subject <span class="text-red-500">*</span></span>
            </div>
            <input type="text" required class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">message <span class="text-red-500">*</span></span>
            </div>
            <textarea name="" required v-model="newNote.name" class="pixa-textarea w-full h-full" id=""></textarea>
          </label>

          <!-- -->
          <div
            class="w-full h-40 bg-slate-100 rounded-md border border-slate-200 mt-2 flex flex-col gap-4 items-center justify-center fill-slate-500 relative">
            <input type="file" required @change="handleFileChange" class="absolute w-full h-full inset-0 opacity-0">
            <paper-clip-icon class="w-8 h-8" />
            <span class="uppercase">{{ fileName ? fileName : 'choose file' }} </span>
            <div class="btn btn-sm pixa-btn-nofloat">upload file</div>
          </div>
        </div>

        <button :disabled="loadingAdd" type="submit" class="btn btn-sm pixa-btn btn-primary border-0 w-full">

          <span v-if="loadingAdd" class="loading loading-ring loading-sm"></span>
          <span v-else>send note</span>
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget'
import paperClipIcon from '@/assets/icons/paperClipIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { objectToFormData } from '@/utils/formDataUtils'
import { useInboxStore } from '@/stores/inbox';

const props = defineProps(['item'])
const useWidget = useWidgetStore()
const loadingAdd = ref(false)
const useInbox = useInboxStore()
const fileName = ref('')
const newNote = reactive(
  {
    support_return: null,
    name: '',
    message_msg: '',
    upload_msg: null
  }
)
const route = useRoute()
const emits = defineEmits(['supportEmits'])

const closeModal = () => {
  Object.assign(newNote, {
    support_return: null,
    name: '',
    upload_msg: null
  })
  useWidget.supportTicket.open = false
}

const supportTicket = async (id) => {
  loadingAdd.value = true
  newNote.support_return = id
  emits('supportEmits', {
    support_return: id,
    name: newNote.name,
    message_msg: newNote.message_msg,
    upload_msg: newNote.upload_msg
  })

}

const handleFileChange = (event) => {
  newNote.upload_msg = event.target.files[0]; // Get the first file
  if (newNote.upload_msg) {
    fileName.value = newNote.upload_msg.name; // Set the file name
  } else {
    fileName.value = ''; // Clear the file name if no file is selected
  }
}

</script>


<style lang="scss" scoped></style>
