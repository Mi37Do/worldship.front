<template>
  <input type="checkbox" :checked="useWidget.addItem.open" class="modal-toggle" />
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

      <form @submit.prevent="addEditItem" class="w-full flex-1 overflow-auto">
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
              <span class="label-text uppercase">url <span class="text-red-500">*</span></span>
            </div>
            <input type="text" required v-model="itemToAdd.url"
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



          <label class="form-control w-full sm:col-span-2">
            <div class="label">
              <span class="label-text uppercase">model/color <span class="text-red-500">*</span></span>
            </div>
            <input type="text" required v-model="itemToAdd.options"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
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

        <div class="w-full grid grid-cols-2 gap-4 mt-4">
          <button type="submit" :disabled="loadingAdd" class="btn btn-sm pixa-btn btn-primary"><span v-if="loadingAdd"
              class="loading loading-ring loading-sm"></span>
            <span v-else>save</span></button>
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

const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
const loadingAdd = ref(false)
const props = defineProps(['item'])
const route = useRoute()
const imagePreview = ref('')
const itemToAdd = reactive(
  {
    id: null,
    name: '',
    url: '',
    options: '',
    qty: 1,
    price: 0,
    image: null
  }
)

watch(() => useWidget.addItem.open, () => {
  if (useWidget.addItem.open) {
    loading.value = false
  } else {
    console.log(props.item);

  }
})


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
  useWidget.addItem.open = false
  Object.assign(itemToAdd, {
    id: null,
    name: '',
    url: '',
    options: '',
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

  formdata.append('site_name', useInbox.focusedBuyForMe.name)

  formdata.append('site_url', useInbox.focusedBuyForMe.url)

  formdata.append('instruction_bfm', useInbox.focusedBuyForMe.Instructions)

  formdata.append('domestique_shipp', useInbox.focusedBuyForMe.domestic_shipping)

  for (let index = 0; index < useInbox.items.length; index++) {
    const element = useInbox.items[index];
    formdata.append(`name-${index + 1}`, element.name)
    formdata.append(`url-${index + 1}`, element.url)
    formdata.append(`options-${index + 1}`, element.options)
    formdata.append(`qty-${index + 1}`, element.qty)
    formdata.append(`price-${index + 1}`, element.price)
    formdata.append(`image-${index + 1}`, element.images)
  }
  formdata.append('counter', useInbox.items.length + 1)
  formdata.append(`n-name-${useInbox.items.length + 1}`, itemToAdd.name)
  formdata.append(`n-url-${useInbox.items.length + 1}`, itemToAdd.url)
  formdata.append(`n-options-${useInbox.items.length + 1}`, itemToAdd.options)
  formdata.append(`n-qty-${useInbox.items.length + 1}`, itemToAdd.qty)
  formdata.append(`n-price-${useInbox.items.length + 1}`, itemToAdd.price)
  formdata.append(`n-image-${useInbox.items.length + 1}`, itemToAdd.image)


  try {
    let response = await axios.post(`/Dashboard/edit_buy_for_me_order_API/${route.params.id}/${1}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    await useInbox.getBuyForMes(null, route.params.id)
    useInbox.items = useInbox.focusedBuyForMe.b4m_order
    closeModal()
  } catch (error) {
    console.error(error)

  }

  loadingAdd.value = false
}

</script>

<style lang="scss" scoped></style>
