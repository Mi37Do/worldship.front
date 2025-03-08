<template>
  <input type="checkbox" :checked="useWidget.addSupport" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full max-w-lg h-[550px] modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4">
        <span class="pixa-title">new support ticket</span>
        <div class="flex gap-2">
          <button @click="() => {
            useWidget.addSupport = false
          }" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <form @submit.prevent="addTicket" class="flex flex-col flex-1 gap-2">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">subject <span class="text-red-500">*</span></span>
          </div>
          <input type="text" required v-model="addSupportTicket.name"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">type <span class="text-red-500">*</span></span>
          </div>
          <commun-combobox :list="list" :selected="selectedType" :top="true" @onSelectedItem="onSelectedItem"
            :required="true" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <!--  -->
            <span class="label-text uppercase"> select {{list.find(item => item.id === selectedType).designation}}
              <span class="text-red-500">*</span></span>
          </div>

          <div v-if="loading" class="w-full h-10 bg-slate-100 rounded-md"></div>

          <div v-else class="w-full">
            <input v-if="selectedType === 'o'" type="text" required v-model="addSupportTicket.other_type"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            <commun-combobox v-else :list="selectedList" :selected="selectedTicketFor" :top="true"
              @onSelectedItem="onSelectedPackage" :required="true" />
          </div>

        </label>


        <div class="w-full flex-1 overflow-auto">
          <div class="w-full h-fit grid grid-cols-4 gap-3 py-4 pr-2">
          </div>
        </div>

        <button :disabled="loadingSave" type="submit" class="btn btn-sm pixa-btn btn-primary">save</button>
      </form>




    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import appsIcon from '@/assets/icons/appsIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import listIcon from '@/assets/icons/listIcon.vue';
import communCombobox from '../commun/communCombobox.vue';

import { reactive, ref, watch } from 'vue';
import { useBookStore } from '@/stores/addressBook';
import axios from 'axios';
import { objectToFormData } from '@/utils/formDataUtils'
import { useSupportStore } from '@/stores/support';

const useWidget = useWidgetStore()
const props = defineProps(['inboxs', 'returns', 'ships', 'bfms', 'list'])
const useBook = useBookStore()
const selectedList = ref(props.inboxs)
const useSupport = useSupportStore()
const otherInput = ref('')
const loadingSave = ref(false)
const loading = ref(true)
const addSupportTicket = reactive(
  {
    name: '',
    type_s: 'b',
    other_type: '',
    box_id: null,
    ship_id: null,
    bfm_id: null
  }
)


const selectedTicketFor = ref(null)

const selectedType = ref('b')


watch(() => useWidget.addSupport, () => {
  Object.assign(addSupportTicket, {
    name: '',
    type_s: 'b',
    other_type: '',
    box_id: null,
    ship_id: null,
    bfm_id: null
  })
  selectedType.value = 'b'
  selectedList.value = props.inboxs
  selectedTicketFor.value = selectedList.value.length > 0 ? selectedList.value[0].id : null
})

const onSelectedItem = (id) => {
  loading.value = true
  if (id === 'b') {
    selectedList.value = props.inboxs
    selectedTicketFor.value = selectedList.value.length > 0 ? selectedList.value[0].id : null

  }
  if (id === 'r') {
    selectedList.value = props.returns
    selectedTicketFor.value = selectedList.value.length > 0 ? selectedList.value[0].id : null
  }
  if (id === 's') {
    selectedList.value = props.ships
    selectedTicketFor.value = selectedList.value.length > 0 ? selectedList.value[0].id : null
  }
  if (id === 'bfm') {
    selectedList.value = props.bfms
    selectedTicketFor.value = selectedList.value.length > 0 ? selectedList.value[0].id : null
  }
  selectedType.value = id
  console.log(selectedTicketFor.value)
  /***/
  setTimeout(() => {
    loading.value = false
  }, 100)
}

const addTicket = async () => {

  loadingSave.value = true

  let itemToAdd = {
    name: addSupportTicket.name,
    type_s: selectedType.value,
    other_type: selectedType.value === 'o' ? addSupportTicket.other_type : '',
    box_id: selectedType.value === 'b' || selectedType.value === 'r' ? selectedTicketFor.value : null,
    ship_id: selectedType.value === 's' ? selectedTicketFor.value : null,
    bfm_id: selectedType.value === 'bfm' ? selectedTicketFor.value : null,
  }


  if (!itemToAdd.other_type) delete itemToAdd.other_type
  if (!itemToAdd.box_id) delete itemToAdd.box_id
  if (!itemToAdd.ship_id) delete itemToAdd.ship_id
  if (!itemToAdd.bfm_id) delete itemToAdd.bfm_id


  let formData = objectToFormData(itemToAdd)

  try {

    let response = await axios.post(`/Dashboard/view_suport_ticket_API/${localStorage.getItem('ws-user-id')}`, formData)
    await useSupport.getTickets(localStorage.getItem('ws-user-id'))

    useSupport.tempMessages = useSupport.tickets.tickets_new
    resetModal()

    useWidget.addSupport = false

  } catch (error) {
    console.error(error)

  }

  loadingSave.value = false
}

const resetModal = () => {
  Object.assign(addSupportTicket, {
    name: '',
    type_s: 'b',
    other_type: '',
    box_id: null,
    ship_id: null,
    bfm_id: null
  })


  selectedType.value = 'b'
  selectedList.value = props.inboxs
  selectedTicketFor.value = selectedList.value.length > 0 ? selectedList.value[0].id : null
}

const onSelectedPackage = (id) => {
  selectedTicketFor.value = id
}

</script>

<style lang="scss" scoped></style>
