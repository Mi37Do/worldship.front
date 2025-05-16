<template>
  <input type="checkbox" :checked="useWidget.addAddressBook.open" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full max-w-[600px] h-fit modal-box flex flex-col p-4">
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

      <form @submit.prevent="addEditBook" class="grid grid-cols-2 gap-3 flex-1">

        <div class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">type </span>
          </div>
          <commun-combobox :list="types" :selected="addressBook.type" :top="true" @onSelectedItem="(id) => {
            addressBook.type = id
          }" :required="true" />
        </div>

        <div v-if="addressBook.type === 'to'" class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">City </span>
          </div>
          <commun-combobox :list="useBook.cities" :selected="addressBook.City" :top="true"
            @onSelectedItem="onSelectedItem" :required="true" />
        </div>



        <label v-else class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">from </span>
          </div>
          <commun-combobox :list="useProfile.countries" :selected="addressBook.countrie" :top="true" @onSelectedItem="(id) => {
            addressBook.countrie = id
          }" :required="true" />
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
            <span class="label-text uppercase">zip </span>
          </div>
          <input type="text" required v-model="addressBook.zip_code"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>



        <label v-if="addressBook.type !== 'to'" class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">city </span>
          </div>
          <input type="text" required v-model="addressBook.city_c"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>


        <label v-if="addressBook.type !== 'to'" class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">state </span>
          </div>
          <input type="text" required v-model="addressBook.state"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>

        <label v-if="addressBook.type === 'to'" class="form-control w-full col-span-2">
          <div class="label">
            <span class="label-text uppercase">address line </span>
          </div>
          <input type="text" v-model="addressBook.adr"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>


        <label v-else class="form-control w-full col-span-2">
          <div class="label">
            <span class="label-text uppercase">address line </span>
          </div>
          <input type="text" v-model="addressBook.adr_l2"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>


        <label class="form-control w-full col-span-2">
          <div class="label">
            <span class="label-text uppercase">instruction </span>
          </div>
          <input type="text" v-model="addressBook.instruction"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>


        <label class="form-control w-full col-span-2">
          <div class="label">
            <span class="label-text uppercase">use default </span>
          </div>
          <CommunSwitch :enabled="addressBook.useDefault" @selectedEnabled="(status) => {
            addressBook.useDefault = status
          }" />
        </label>


        <div class="w-full flex-1 overflow-auto">
          <div class="w-full h-fit grid grid-cols-4 gap-3 py-4 pr-2">
          </div>
        </div>

        <button :disabled="loadingSave" type="submit" class="btn btn-sm pixa-btn btn-primary col-span-2">save</button>
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
import CommunSwitch from '../commun/communSwitch.vue';
import { useProfileStore } from '@/stores/profile';

const useProfile = useProfileStore()
const useWidget = useWidgetStore()
const useBook = useBookStore()
const loadingSave = ref(false)
const loading = ref(true)
const addressBook = reactive(
  {
    first_name: '',
    last_name: '',
    phone: '',
    Second_phone: '',
    City: null,
    adr: '', type: 'from',
    instruction: '', city_c: '', zip_code
      : '', state: '', adr_l2: '',
    countrie: null, useDefault: false
  }
)

const types = ref(
  [
    { id: 'from', designation: "from" }, { id: 'to', designation: "to" }, { id: 'b', designation: "billing" }
  ]
)

watch(() => useWidget.addAddressBook.open, () => {
  if (useWidget.addAddressBook.add) {
    Object.assign(addressBook, {
      first_name: '',
      last_name: '',
      phone: '',
      Second_phone: '',
      City: null,
      adr: '', type: 'from',
      instruction: '',
      countrie: null, useDefault: false
    })
  } else {
    Object.assign(addressBook, {
      id: useBook.focusedBook.id,
      first_name: useBook.focusedBook.first_name,
      last_name: useBook.focusedBook.last_name,
      phone: useBook.focusedBook.phone,
      Second_phone: useBook.focusedBook.Second_phone,
      City: useBook.focusedBook.City_id.id,
      adr: useBook.focusedBook.adr, type: useBook.focusedBook.type,
      instruction: useBook.focusedBook.instruction,
      countrie: useBook.focusedBook.countrie, useDefault: useBook.focusedBook.useDefault
    })

  }
})

const onSelectedItem = (id) => {
  addressBook.City = id
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

    console.log(response.data);


  } catch (error) {
    console.error(error)

  }

  loadingSave.value = false
}

</script>

<style lang="scss" scoped></style>
