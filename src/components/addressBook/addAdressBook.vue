<template>
  <input type="checkbox" :checked="useWidget.addAddressBook.open" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full max-w-lg h-[550px] modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4">
        <span class="pixa-title">new address</span>
        <div class="flex gap-2">
          <button @click="() => {
            useWidget.addAddressBook.open = false
          }" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <form @submit.prevent="addEditBook" class="flex flex-col flex-1">


        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">city </span>
          </div>
          <commun-combobox :list="useBook.cities" :selected="addressBook.city" :top="true"
            @onSelectedItem="onSelectedItem" :required="true" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">first name </span>
          </div>
          <input type="text" required v-model="addressBook.first_name"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">last name </span>
          </div>
          <input type="text" required v-model="addressBook.last_name"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">phone number </span>
          </div>
          <input type="text" required v-model="addressBook.phone"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">second phone number </span>
          </div>
          <input type="text" v-model="addressBook.second_phone"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
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

const useWidget = useWidgetStore()
const useBook = useBookStore()
const loadingSave = ref(false)
const loading = ref(true)
const addressBook = reactive(
  {
    first_name: '',
    last_name: '',
    phone: '',
    second_phone: '',
    city: null
  }
)

watch(() => useWidget.addAddressBook.open, () => {
  if (useWidget.addAddressBook.add) {
    Object.assign(addressBook, {
      first_name: '',
      last_name: '',
      phone: '',
      second_phone: '',
      city: null
    })
  } else {
    Object.assign(addressBook, {
      id: useBook.focusedBook.id,
      first_name: useBook.focusedBook.first_name,
      last_name: useBook.focusedBook.last_name,
      phone: useBook.focusedBook.phone,
      second_phone: useBook.focusedBook.second_phone,
      city: useBook.focusedBook.city_id.id
    })

  }
})

const onSelectedItem = (id) => {
  addressBook.city = id
}

const addEditBook = async () => {

  loadingSave.value = true
  let formData = objectToFormData(addressBook)

  try {

    let response = await axios.post(`/Dashboard/address_book_dash_API/${localStorage.getItem('ws-user-id')}`, formData)
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
    Object.assign(useWidget.addAddressBook, {
      open: false,
      add: true
    })

  } catch (error) {
    console.error(error)

  }

  loadingSave.value = false
}

</script>

<style lang="scss" scoped></style>
