<template>

  <div class="w-full h-full flex justify-center gap-4 overflow-hidden">
    <form @submit.prevent="addNewBuyForMe" class="w-full flex flex-col h-full max-w-screen-md">
      <div class="w-full h-16 flex items-center justify-between border-b border-slate-200">
        <router-link :to="{ name: 'table-buyForMe' }" class="btn btn-sm pixa-btn w-10 p-0 pixa-btn-nofloat">
          <angle-icon class="w-5 h-5" />
        </router-link>
        <span class="pixa-title"> {{ $t('commun.addNewBuyForMe') }}</span>
        <span class="w-10"></span>
      </div>

      <div class="w-full flex-1 overflow-auto">
        <div class="w-full flex flex-col py-4">
          <div class="w-full grid sm:grid-cols-2 gap-x-4 gap-y-2 px-4 border-b border-slate-200 pb-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">website name <span class="text-red-500">*</span></span>
              </div>
              <input type="text" required v-model="buyToAdd.site_name"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>


            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">website url <span class="text-red-500">*</span></span>
              </div>
              <input type="text" required v-model="buyToAdd.site_url"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
          </div>


          <div v-auto-animate class="w-full px-2 flex flex-col gap-4 py-4">
            <span class="pixa-title ml-2 py-2">items</span>
            <div v-for="(i, index) in items" :key="i.id"
              class="w-full sm:col-span-2 bg-primary/5 h-fit rounded-md border border-slate-200 p-2 grid grid-cols-2 gap-x-4 gap-y-2">
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">name <span class="text-red-500">*</span></span>
                </div>
                <input type="text" required v-model="i.name"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>

              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">url <span class="text-red-500">*</span></span>
                </div>
                <input type="text" required v-model="i.url"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>

              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">quantity <span class="text-red-500">*</span></span>
                </div>
                <input type="number" required v-model="i.qty"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>

              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">price <span class="text-red-500">*</span></span>
                </div>
                <input type="number" required v-model="i.price"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>



              <label class="form-control w-full sm:col-span-2">
                <div class="label">
                  <span class="label-text uppercase">model/color <span class="text-red-500">*</span></span>
                </div>
                <input type="text" required v-model="i.options"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
              </label>

              <div class="w-full h-40 sm:col-span-2 flex items-center justify-center mt-2">
                <div
                  class="w-40 h-40 bg-primary/10 rounded p-1 flex items-center justify-center relative cursor-pointer">
                  <div v-if="i.image" class="w-full h-full flex relative">
                    <button type="button" @click="i.image = null"
                      class="btn btn-sm btn-square absolute right-1 top-1 pixa-btn-delete">
                      <trash-icon class="w-5 h-5" />
                    </button>
                    <img :src="i.image" class="w-full h-full object-cover rounded" alt="">
                  </div>
                  <div v-else class="w-full h-full flex relative items-center justify-center">
                    <input type="file" accept="image/*" @change="(event) => handleFileChange(i.id - 1, event)"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                    <plus-icon class="w-8 h-8 fill-primary" />
                  </div>

                </div>
              </div>

              <div
                class="w-full sm:col-span-2 p-4 bg-white border border-primary/10 my-2 rounded h-10 flex items-center justify-center font-semibold text-primary uppercase">
                total : {{ i.price * i.qty }}
              </div>


              <div v-if="index !== 0" class="w-full sm:col-span-2 pt-2">
                <button type="button" @click="() => {
                  items.splice(index, 1)
                }" class="btn btn-sm pixa-btn w-full pixa-btn-delete">
                  <trash-icon class="w-5 h-5" /> <span>remove item</span>
                </button>
              </div>
            </div>

            <button type="button" @click="() => {
              item.id = items.length
              items.push(item)
            }" class="btn btn-sm pixa-btn w-full pixa-btn-nofloat">
              <plus-icon class="w-5 h-5" />
              add new item</button>
          </div>


          <div class="w-full px-4 border-t border-slate-200 pt-4">
            <label class="form-control w-full col-span-2">
              <div class="label">
                <span class="label-text uppercase"> Notes </span>
              </div>
              <textarea type="text" v-model="buyToAdd.instruction_bfm"
                class="pixa-textarea w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
          </div>

          <div class="w-full grid sm:grid-cols-2  gap-x-4 gap-y-2 px-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">items Value </span>
              </div>
              <input type="number" disabled v-model="finalValues.items"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">service </span>
              </div>
              <input type="number" disabled v-model="finalValues.service"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">Domestic Fee <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="buyToAdd.domestique_shipp"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">Total </span>
              </div>
              <input type="number" disabled v-model="finalValues.total"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
          </div>



        </div>
      </div>

      <div class="w-full flex flex-col gap-4 bg-white border-x border-t border-slate-200 rounded-t-md p-4">

        <div class="w-full grid grid-cols-2 gap-4">
          <button :disabled="loading" type="submit" class="btn btn-sm pixa-btn btn-primary">
            <span v-if="loading" class="loading loading-ring loading-sm"></span>
            <span v-else>save</span>
          </button>

          <button :disabled="loading" type="button" class="btn btn-sm pixa-btn pixa-btn-float">cancel</button>
        </div>
      </div>

    </form>


  </div>
</template>

<script setup>
import PlusIcon from '@/assets/icons/plusIcon.vue';
import trashIcon from '@/assets/icons/trashIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import { onMounted, reactive, ref, watch } from 'vue';
import angleIcon from '@/assets/icons/angleIcon.vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import { useRouter } from 'vue-router';

const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(false)
const router = useRouter()
const { t } = useI18n()

const buyToAdd = reactive(
  {
    site_name: '',
    site_url: '',
    instruction_bfm: '',
    domestique_shipp: 0,
  }
)

const item = reactive(
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

const items = ref(
  [
    {
      id: 1,
      name: '',
      url: '',
      options: '',
      qty: 1,
      price: 0,
      image: null
    }
  ]
)

const finalValues = reactive(
  {
    service: 0,
    items: 0,
    total: 0
  }
)

onMounted(async () => {

})

const addNewBuyForMe = async () => {
  loading.value = true
  const formdata = new FormData()
  formdata.append('site_name', buyToAdd.site_name)
  formdata.append('site_url', buyToAdd.site_url)
  formdata.append('instruction_bfm', buyToAdd.instruction_bfm)
  formdata.append('domestique_shipp', buyToAdd.domestique_shipp)

  for (let index = 0; index < items.value.length; index++) {
    const element = items.value[index];
    const base64String = element.image ? element.image.split(',')[1] : null
    let blob = element.image ? base64ToBlob(base64String, 'image/png') : null
    formdata.append(`name_${index}`, element.name)
    formdata.append(`url_${index}`, element.url)
    formdata.append(`options_${index}`, element.options)
    formdata.append(`qty_${index}`, element.qty)
    formdata.append(`price_${index}`, element.price)
    formdata.append(`image_${index}`, blob)
  }
  console.log(formdata)

  try {
    let response = await axios.post(`/Dashboard/create_buy_for_me_order_API/${localStorage.getItem('ws-user-id')}`, formdata)
    router.push({ name: 'table-buyForMe' })
  } catch (error) {
    console.error(error)
  }
  loading.value = false
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

const handleFileChange = (index, event) => {
  console.log(index)

  const file = event.target.files[0]; // Get the first file

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader(); // Create a FileReader to read the file
    reader.onload = (e) => {
      items.value[index].image = e.target.result; // Set the image URL to the ref
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  } else {
    alert('Please select a valid image file.'); // Alert if the file is not an image
  }
}

watch(() => [items.value, buyToAdd.domestique_shipp], () => {
  finalValues.items = 0
  for (let index = 0; index < items.value.length; index++) {
    const element = items.value[index]
    finalValues.items = finalValues.items + (element.price * element.qty)
  }

  finalValues.total = finalValues.items + buyToAdd.domestique_shipp

}, { deep: true })

</script>

<style lang="scss" scoped></style>
