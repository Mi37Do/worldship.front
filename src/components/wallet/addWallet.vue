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

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text uppercase">wallet type </span>
        </div>

        <WalletsTypeDropsown :list="types" @onSelectedType="onSelectedType" />
      </label>

      <div class="w-full flex-1 overflow-auto">
        <div class="w-full h-fit flex flex-col items-center gap-3 py-4">

          <img v-if="types.find(item => item.id === walletType).type_payment === 'zn'"
            :src="env + types.find(item => item.id === walletType).zen_qr_code" class="h-40 mt-3" alt="">
          <img v-else :src="env + types.find(item => item.id === walletType).image" class="h-16 mt-3" alt="">

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">wallet value </span>
            </div>
            <input type="number" required v-model="walletValue.value"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <div
            class="w-full h-40 bg-slate-100 rounded-md border border-slate-200 mt-2 flex flex-col gap-4 items-center justify-center fill-slate-500 relative">
            <input type="file" required @change="handleFileChange" class="absolute w-full h-full inset-0 opacity-0">
            <paper-clip-icon class="w-8 h-8" />
            <span class="uppercase">{{ fileName ? fileName : 'choose file' }} </span>
            <div class="btn btn-sm pixa-btn-nofloat">upload file</div>
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
import listIcon from '@/assets/icons/listIcon.vue';
import { objectToFormData } from '@/utils/formDataUtils'

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
const walletValue = reactive(
  {
    value: 0,
    file: null
  }
)


const handleFileChange = (event) => {
  walletValue.file = event.target.files[0]; // Get the first file
  if (walletValue.file) {
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

  console.log(tempWallet)


  let formData = new FormData()

  formData.append('total_add_wallets', tempWallet.total_add_wallets)
  formData.append('image', tempWallet.image)
  formData.append('pack_pay_type_id', tempWallet.pack_pay_type_id)

  try {
    let response = await axios.post(`/Dashboard/add_wallets_value_API/${1}`, formData, {
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
