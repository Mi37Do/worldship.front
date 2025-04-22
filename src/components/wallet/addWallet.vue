<template>
  <input type="checkbox" :checked="useWidget.addWallet" class="modal-toggle" />
  <div class="modal" role="dialog">
    <form @submit.prevent="addWallet()" class="w-full max-w-lg h-fit modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4">
        <span class="pixa-title">add wallet</span>
        <div class="flex gap-2">
          <button type="button" @click="closeModal()" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <div class="form-control w-full">
        <div class="label">
          <span class="label-text uppercase">wallet type </span>
        </div>

        <WalletsTypeDropsown :list="types" @onSelectedType="onSelectedType" />
      </div>

      <div class="w-full flex-1 overflow-auto">
        <div class="w-full h-fit flex flex-col items-center gap-3 py-4">

          <img v-if="types.find(item => item.id === walletType).type_payment === 'zn'"
            :src="env + types.find(item => item.id === walletType).zen_qr_code" class="h-40 mt-3" alt="">
          <img v-else :src="env + types.find(item => item.id === walletType).image" class="h-16 mt-3" alt="">

          <span
            v-if="types.find(item => item.id === walletType).type_payment === 'z' || types.find(item => item.id === walletType).type_payment === 'zn'">transfer
            to this account <span v-if="types.find(item => item.id === walletType).type_payment === 'z'">: {{
              useProfile.profile.payments_methodes.find(item => item.type_payment === 'z').account}}</span> </span>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">wallet value </span>
            </div>
            <input type="number" required v-model="walletValue.value"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <div
            class="w-full py-4 rounded-md border border-slate-200 mt-2 flex flex-col gap-4 items-center justify-center fill-slate-500 relative">

            <div class="w-40 h-40 bg-primary/10 rounded p-1 flex items-center justify-center relative cursor-pointer">
              <div v-if="tempImage" class="w-full h-full flex relative">
                <button type="button" @click="tempImage = null"
                  class="btn btn-sm btn-square absolute right-1 top-1 pixa-btn-delete">
                  <trash-icon class="w-5 h-5" />
                </button>
                <img :src="tempImage" class="w-full h-full object-cover rounded" alt="">
              </div>
              <div v-else class="w-full h-full flex relative items-center justify-center">
                <input type="file" required accept="image/*" @change="handleFileChange"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                <plus-icon class="w-8 h-8 fill-primary" />
              </div>

            </div>
          </div>
        </div>
      </div>

      <button :disabled="loadingAdd" type="submit" class="btn btn-sm pixa-btn btn-primary mt-4">
        <span v-if="loadingAdd" class="loading loading-ring loading-sm"></span>
        <span v-else>add wallet</span>
      </button>


    </form>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import paperClipIcon from '@/assets/icons/paperClipIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import plusIcon from '@/assets/icons/plusIcon.vue';
import listIcon from '@/assets/icons/listIcon.vue';
import { objectToFormData } from '@/utils/formDataUtils'
import trashIcon from '@/assets/icons/trashIcon.vue';
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useProfileStore } from '@/stores/profile';
import WalletsTypeDropsown from './walletsTypeDropsown.vue';

const props = defineProps(['types'])
const useWidget = useWidgetStore()
const loadingAdd = ref(false)
const useProfile = useProfileStore()
const env = import.meta.env.VITE_WORLDSHIP_API
const walletType = ref(props.types[0].id)
const fileName = ref('')
const tempImage = ref('')
const walletValue = reactive(
  {
    value: 0,
    file: null
  }
)


const handleFileChange = (event) => {
  walletValue.file = event.target.files[0]; // Get the first file
  if (walletValue.file) {
    tempImage.value = walletValue.file
    const reader = new FileReader(); // Create a FileReader to read the file
    reader.onload = (e) => {
      tempImage.value = e.target.result; // Set the image URL to the ref
    };
    reader.readAsDataURL(walletValue.file); // Read the file as a data URL
    fileName.value = walletValue.file.name; // Set the file name
  } else {
    fileName.value = ''; // Clear the file name if no file is selected
  }
}

const closeModal = () => {
  useWidget.addWallet = false
  Object.assign(walletValue, {
    value: 0,
    file: null
  })
  walletType.value = props.types[0].id
}

const addWallet = async () => {

  loadingAdd.value = true

  let tempWallet = {
    total_add_wallets: walletValue.value,
    image: walletValue.file,
    pack_pay_type_id: walletType.value
  }

  let formData = new FormData()

  formData.append('total_add_wallets', tempWallet.total_add_wallets)
  formData.append('image', tempWallet.image)
  formData.append('pack_pay_type_id', tempWallet.pack_pay_type_id)

  try {
    let response = await axios.post(`/Dashboard/add_wallets_value_API/${localStorage.getItem('ws-user-id')}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

    await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    closeModal()
  } catch (error) {
    console.error(error)
  }
  loadingAdd.value = false
}

const onSelectedType = (id) => {
  walletType.value = id
}

</script>

<style lang="scss" scoped></style>
