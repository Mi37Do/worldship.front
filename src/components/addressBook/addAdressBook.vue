<template>
  <input type="checkbox" :checked="useWidget.addAddressBook.open" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full  h-[600px] modal-box flex flex-col p-4 overflow-hidden">
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

      <form @submit.prevent="addEditBook" class="w-full grid gap-3 flex-1 overflow-hidden">
        <div class="w-full flex-1 overflow-auto">
          <div class="w-full h-fit flex flex-col gap-3 py-4 pr-2">
            <div class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">type </span>
              </div>
              <input type="text" disabled v-model="addressBook.type"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              <!--
              <commun-combobox :list="types" :selected="addressBook.type" :top="true" @onSelectedItem="(id) => {
                addressBook.type = id
              }" :required="true" /> -->
            </div>


            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">company name </span>
              </div>
              <input type="text" v-model="addressBook.company_name"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>



            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">full name </span>
              </div>
              <input type="text" required v-model="addressBook.name"
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
                <span class="label-text uppercase">address line </span>
              </div>
              <input type="text" v-model="addressBook.adr"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>


            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">address line 2</span>
              </div>
              <input type="text" v-model="addressBook.adr_l2"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <!--
            <div v-if="addressBook.type === 'to'" class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">City </span>
              </div>
              <commun-combobox :list="useBook.cities" :selected="addressBook.City" :top="true"
                @onSelectedItem="onSelectedItem" :required="true" />
            </div> -->



            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">country </span>
              </div>



              <commun-combobox v-if="addressBook.type === 'to'" :list="useProfile.countries"
                :selected="addressBook.countrie" :top="true" @onSelectedItem="(id) => {
                  addressBook.countrie = id
                }" :required="true" />

              <commun-combobox-countries v-else class="mt-auto" :required="true" :list="countries"
                :selected="addressBook.countrie" @onSelectedItem="(id) => {
                  console.log(id)

                  addressBook.countrie = id
                }" />
            </label>


            <label v-if="addressBook.type !== 'to'" class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">state </span>
              </div>
              <input type="text" required v-model="addressBook.state"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">city </span>
              </div>
              <input type="text" required v-model="addressBook.city_c"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">zip </span>
              </div>
              <input type="text" required v-model="addressBook.zip_code"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">instruction </span>
              </div>
              <input type="text" v-model="addressBook.instruction"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">use default </span>
              </div>
              <CommunSwitch :enabled="addressBook.useDefault" @selectedEnabled="(status) => {
                addressBook.useDefault = status
              }" />
            </label>
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
import communComboboxCountries from '../commun/communComboboxCountries.vue';
import countries from '@/assets/countries.json'

import { reactive, ref, watch } from 'vue';
import { useBookStore } from '@/stores/addressBook';
import axios from 'axios';
import { objectToFormData } from '@/utils/formDataUtils'
import CommunSwitch from '../commun/communSwitch.vue';
import { useProfileStore } from '@/stores/profile';
import { useRoute } from 'vue-router';

const useProfile = useProfileStore()
const useWidget = useWidgetStore()
const props = defineProps(['type'])
const useBook = useBookStore()
const loadingSave = ref(false)
const loading = ref(true)
const route = useRoute()
const addressBook = reactive(
  {
    name: '',
    phone: '',
    Second_phone: '',
    City: null,
    adr: '', type: route.name.replace('-addresses', ''),
    instruction: '', city_c: '', zip_code
      : '', state: '', adr_l2: '',
    countrie: null, useDefault: false, company_name: ''
  }
)

const types = ref(
  [
    { id: 'from', designation: "from" }, { id: 'to', designation: "to" }
    /**
    , { id: 'b', designation: "billing" } */
  ]
)

watch(() => useWidget.addAddressBook.open, () => {
  if (useWidget.addAddressBook.add) {
    Object.assign(addressBook, {
      name: '',
      phone: '',
      Second_phone: '',
      City: null,
      adr: '',
      instruction: '', city_c: '', zip_code
        : '', state: '', adr_l2: '',
      countrie: null, useDefault: false, company_name: ''
    })
  } else {
    Object.assign(addressBook, {
      id: useBook.focusedBook.id,
      name: useBook.focusedBook.name,
      phone: useBook.focusedBook.phone,
      Second_phone: useBook.focusedBook.Second_phone,
      City: useBook.focusedBook.City_id ? useBook.focusedBook.City_id.id : null,
      adr: useBook.focusedBook.adr, type: useBook.focusedBook.type,
      instruction: useBook.focusedBook.instruction,
      countrie: useBook.focusedBook.countrie, useDefault: useBook.focusedBook.useDefault, company_name: useBook.focusedBook.company_name, adr_l2: useBook.focusedBook.adr_l2, zip_code: useBook.focusedBook.zip_code, city_c: useBook.focusedBook.city_c, state: useBook.focusedBook.state
    })

  }
})

const onSelectedItem = (id) => {
  addressBook.City = id
}

watch(() => props.type, () => {

  addressBook.type = props.type
})

const addEditBook = async () => {

  loadingSave.value = true
  let formData = objectToFormData(addressBook)
  let response = null

  try {
    if (useWidget.addAddressBook.add) {
      response = await axios.post(`/Dashboard/address_book_dash_API/${localStorage.getItem('ws-user-id')}`, formData)
    } else {
      response = await axios.post(`/Dashboard/address_book_dash_API/${localStorage.getItem('ws-user-id')}`, formData)
    }

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
