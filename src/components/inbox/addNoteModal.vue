<template>
  <input type="checkbox" id="userDeleteModal" :checked="useWidget.addNote" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="modal-box flex flex-col md:max-w-sm h-fit gap-2 items-center justify-center p-4">
      <form @submit.prevent="addNote(item.id)" class="w-full flex flex-col h-fit gap-4 items-center ">
        <div class="flex items-center justify-between w-full">
          <span class="pixa-title">add note</span>
          <button type="button" @click="closeModal" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

        <div class="w-full flex-1 flex flex-col gap-2 mb-2">
          <!--
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">subject <span class="text-red-500">*</span></span>
            </div>
            <input type="text" required class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label> -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">message <span class="text-red-500">*</span></span>
            </div>
            <textarea name="" required v-model="newNote.my_note_wh_or" class="pixa-textarea w-full h-full"
              id=""></textarea>
          </label>

          <!--
          <div
            class="w-full h-40 bg-slate-100 rounded-md border border-slate-200 mt-2 flex flex-col gap-4 items-center justify-center fill-slate-500">
            <paper-clip-icon class="w-8 h-8" />
            <span>choose file</span>
            <button type="button" class="btn btn-sm btn-primary">upload file</button>
          </div> -->
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
const emits = defineEmits(['deleteItem'])
const useWidget = useWidgetStore()
const loadingAdd = ref(false)
const useInbox = useInboxStore()
const newNote = reactive(
  {
    row_m_n_id: null,
    my_note_wh_or: ''
  }
)
const route = useRoute()

const closeModal = () => {
  Object.assign(newNote, {
    row_m_n_id: null,
    my_note_wh_or: ''
  })
  useWidget.addNote = false
}

const addNote = async (id) => {
  loadingAdd.value = true
  newNote.row_m_n_id = id

  let formData = new FormData()
  formData.append('row_m_n_id', newNote.row_m_n_id)
  formData.append('my_note_wh_or', newNote.my_note_wh_or)
  try {
    let response = await axios.post(`/Dashboard/in_box_API/${localStorage.getItem('ws-user-id')}/`, formData)
    await useInbox.getInbox(localStorage.getItem('ws-user-id'))
    closeModal()
  } catch (error) {
    console.error(error)

  }

  loadingAdd.value = false
}

watch(() => [props.item, useWidget.addNote], () => {
  if (useWidget.addNote && props.item.my_note) {
    newNote.my_note_wh_or = props.item.my_note
  }
})

</script>


<style lang="scss" scoped></style>
