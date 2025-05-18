<template>
  <input type="checkbox" :checked="useWidget.addEditShippementItem.open" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full md:max-w-screen-sm h-fit modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4 border-b border-slate-200">
        <span class="pixa-title">new item</span>
        <div class="flex gap-2">

          <button @click="closeModal" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <form @submit.prevent="saveAndClose" class="w-full flex-1 overflow-auto">
        <div class="w-full h-fit grid sm:grid-cols-2 gap-x-4 gap-y-2">

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">name <span class="text-red-500">*</span></span>
            </div>
            <input type="text" required v-model="itemToAdd.name"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">code <span class="text-red-500">*</span></span>
            </div>
            <input type="text" required v-model="itemToAdd.hs_code"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">quantity <span class="text-red-500">*</span></span>
            </div>
            <input type="number" required v-model="itemToAdd.qty"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">price <span class="text-red-500">*</span></span>
            </div>
            <input type="number" required v-model="itemToAdd.price"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>



          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">coutry <span class="text-red-500">*</span></span>
            </div>


            <commun-combobox-countries class="mt-auto" :required="true" :list="countries"
              :selected="itemToAdd.code_countrie" @onSelectedItem="(id) => {
                console.log(id);

                itemToAdd.code_countrie = id
              }" />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">state<span class="text-red-500">*</span></span>
            </div>

            <commun-combobox :list="[{ id: 'n', designation: 'new' }, { id: 'o', designation: 'Used' }]" :selected="itemToAdd.status_item
              " :top="true" @onSelectedItem="(id) => {
                itemToAdd.status_item
                  = id
              }" :required="true" />
          </label>

          <div class="w-full h-40 sm:col-span-2 flex items-center justify-center mt-2">
            <div class="w-40 h-40 bg-primary/10 rounded p-1 flex items-center justify-center relative cursor-pointer">
              <div v-if="itemToAdd.image" class="w-full h-full flex relative">
                <button type="button" @click="itemToAdd.image = null"
                  class="btn btn-sm btn-square absolute right-1 top-1 pixa-btn-delete">
                  <trash-icon class="w-5 h-5" />
                </button>
                <img :src="imagePreview" class="w-full h-full object-cover rounded" alt="">
              </div>
              <div v-else class="w-full h-full flex relative items-center justify-center">
                <input type="file" accept="image/*" @change="(event) => handleFileChange(itemToAdd.id - 1, event)"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                <plus-icon class="w-8 h-8 fill-primary" />
              </div>

            </div>
          </div>

          <div
            class="w-full sm:col-span-2 p-4 bg-white border border-primary/10 my-2 rounded h-10 flex items-center justify-center font-semibold text-primary uppercase">
            total : {{ itemToAdd.price * itemToAdd.qty }}
          </div>
        </div>

        <div class="w-full grid grid-cols-3 gap-2 mt-4">
          <button type="submit" :disabled="loadingAdd" class="btn btn-sm pixa-btn btn-primary"><span v-if="loadingAdd"
              class="loading loading-ring loading-sm"></span>
            <span v-else>save</span></button>

          <button type="button" :disabled="loadingAdd" @click="addEditItem"
            class="btn btn-sm pixa-btn pixa-btn-nofloat"><span v-if="loadingAdd"
              class="loading loading-ring loading-sm"></span>
            <span v-else>save and add another</span></button>

          <button type="button" :disabled="loadingAdd" class="btn btn-sm pixa-btn pixa-btn-nofloat">cancel</button>
        </div>
      </form>




    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import trashIcon from '@/assets/icons/trashIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import plusIcon from '@/assets/icons/plusIcon.vue';
import { reactive, ref, watch } from 'vue';
import { useInboxStore } from '@/stores/inbox';
import { objectToFormData } from '@/utils/formDataUtils'
import axios from 'axios';
import { useRoute } from 'vue-router';
import communCombobox from '../commun/communCombobox.vue';
import { useProfileStore } from '@/stores/profile';
import countries from '@/assets/countries.json'
import communComboboxCountries from '../commun/communComboboxCountries.vue';

const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
const loadingAdd = ref(false)
const props = defineProps(['item'])
const useProfile = useProfileStore()
const route = useRoute()
const imagePreview = ref('')
const itemToAdd = reactive(
  {
    sh_ref: null,
    name: '',
    hs_code: '',
    status_item: 'n',
    code_countrie: null,
    qty: 1,
    price: 0,
    image: null
  }
)

watch(() => useWidget.addEditShippementItem, () => {
  if (useWidget.addEditShippementItem.open) {

    if (useWidget.addEditShippementItem.add) {
      Object.assign(itemToAdd, {
        sh_ref: null,
        name: '',
        hs_code: '',
        status_item: 'n',
        code_countrie: null,
        qty: 1,
        price: 0,
        image: null
      })
    } else {

      Object.assign(itemToAdd, useInbox.costumeShipItem)

      imagePreview.value = useInbox.costumeShipItem.image
    }

    loading.value = false
  } else {
    console.log(props.item)
  }
}, { deep: true })




const handleFileChange = (index, event) => {
  itemToAdd.image = event.target.files[0]; // Get the first file

  if (itemToAdd.image && itemToAdd.image.type.startsWith('image/')) {
    const reader = new FileReader(); // Create a FileReader to read the file
    reader.onload = (e) => {
      imagePreview.value = e.target.result; // Set the image URL to the ref
    };
    reader.readAsDataURL(itemToAdd.image); // Read the file as a data URL
  } else {
    alert('Please select a valid image file.'); // Alert if the file is not an image
  }
}

const closeModal = () => {
  useWidget.addEditShippementItem.open = false
  Object.assign(itemToAdd, {
    sh_ref: null,
    id: null,
    name: '',
    hs_code: '',
    status_item: 'n',
    code_countrie: null,
    qty: 1,
    price: 0,
    image: null
  })
}

function base64ToBlob(base64, type = 'image/png') {

  const byteCharacters = atob(base64);

  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {

    byteNumbers[i] = byteCharacters.charCodeAt(i);

  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type });

}

const addEditItem = async () => {
  loadingAdd.value = true
  const formdata = new FormData()


  formdata.append('name', itemToAdd.name)
  formdata.append('hs_code', itemToAdd.hs_code)
  formdata.append('qty', itemToAdd.qty)
  formdata.append('price', itemToAdd.price)
  formdata.append('image', itemToAdd.image)
  formdata.append('code_countrie', itemToAdd.code_countrie)
  formdata.append('status_item', itemToAdd.status_item)

  let response = null

  try {
    if (useWidget.addEditShippementItem.add) {

      formdata.append('sh_ref', route.params.id)
      response = await axios.post(`/Shipments/create_ship_items_API`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
    } else {

      formdata.append('item_ref', itemToAdd.id)
      response = await axios.post(`/Shipments/edit_ship_items_API`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
    }

    Object.assign(itemToAdd, {
      sh_ref: null,
      id: null,
      name: '',
      hs_code: '',
      status_item: 'n',
      code_countrie: null,
      qty: 1,
      price: 0,
      image: null
    })

    await useInbox.getShippements(null, route.params.id)
    console.log(response)

  } catch (error) {
    console.error(error)

  }

  loadingAdd.value = false
}

const saveAndClose = async () => {
  await addEditItem()
  closeModal()
}

</script>

<style lang="scss" scoped></style>
