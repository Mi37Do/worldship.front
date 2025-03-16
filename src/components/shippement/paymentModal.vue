<template>
  <input type="checkbox" :checked="useWidget.newPayment" class="modal-toggle" />
  <div class="modal modal-bottom sm:modal-middle" role="dialog">
    <form @submit.prevent="newPayment()" class="w-full max-w-lg h-fit modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4">
        <span class="pixa-title">add payment</span>
        <div class="flex gap-2">
          <button type="button" @click="closeModal()" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

      </div>

      <div class="w-full h-fit bg-slate-100 rounded-md border border-slate-200 mb-3 p-4 flex flex-col gap-3 uppercase">

        <div class="w-full h-fit grid grid-cols-2 gap-4">
          <span>Total Value </span>
          <span class="text-right my-auto">{{ numberFormat(item.total_price) }} $</span>
          <div v-if="route.name === 'shippement'" class="w-full grid grid-cols-2 gap-4 col-span-2">
            <span class="text-red-500">Insurance </span>
            <span class="text-right my-auto text-red-500">{{ numberFormat(item.add_insurance ? item.total_insurance : 0)
              }} $</span>
            <span class="text-red-500">Package Options </span>
            <span class="text-right my-auto text-red-500">{{ numberFormat(item.total_price_options) }} $</span>
            <span>Coins </span>
            <span class="text-right my-auto">{{ numberFormat(item.total_coins) }} $</span>
            <span>Shipping Cost </span>
            <span class="text-right my-auto">{{ numberFormat(item.shipping_cost) }} $</span>
          </div>

          <div v-else class="w-full h-fit grid grid-cols-2 gap-4  col-span-2">
            <span>services </span>
            <span class="text-right my-auto ">{{ numberFormat(item.total_price_options) }} $</span>
          </div>

        </div>
        <div class="w-full h-px bg-primary/20"></div>

        <div class="w-full h-fit grid grid-cols-2 gap-4 font-bold ">

          <span>total </span>
          <span class="text-right my-auto">{{ numberFormat(item.total_price_cost) }} $</span>
        </div>
      </div>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text uppercase">wallet type </span>
        </div>

        <walletsTypeDropsown :list="types" :selected="walletType" @onSelectedType="onSelectedType" />
      </label>

      <div v-if="types.find(item => item.id === walletType).type_payment === 'c'" class="w-full flex-1 overflow-auto">
      </div>

      <div v-else class="w-full flex-1 overflow-auto">
        <div class="w-full h-fit flex flex-col items-center gap-3 py-4">

          <div class="w-full mt-4 flex items-center justify-center uppercase font-semibold text-lg">payment by {{
            types.find(item => item.id
              === walletType).name}}</div>

          <img v-if="types.find(item => item.id === walletType).type_payment === 'zn'"
            :src="env + types.find(item => item.id === walletType).zen_qr_code" class="h-40 mt-3" alt="">
          <div v-else-if="types.find(item => item.id === walletType).type_payment === 'w'"
            class="w-full h-16 flex justify-center items-center">
            <div class=" p-4 uppercase bg-slate-100 rounded-md border border-slate-200">your wallet credit : {{
              useProfile.profile.wallets.total_wallets }}</div>
          </div>
          <img v-else :src="env + types.find(item => item.id === walletType).image" class="h-16 mt-3" alt="">


          <div v-if="types.find(item => item.id === walletType).type_payment !== 'w'"
            class="w-full h-32 bg-slate-100 rounded-md border border-slate-200 mt-2 flex flex-col gap-4 items-center justify-center fill-slate-500 relative">
            <input type="file" required @change="handleFileChange" class="absolute w-full h-full inset-0 opacity-0">
            <paper-clip-icon class="w-8 h-8" />
            <span class="uppercase">{{ fileName ? fileName : 'choose file' }} </span>
            <div class="btn btn-sm pixa-btn-nofloat">upload file</div>
          </div>
        </div>
      </div>

      <button
        :disabled="loadingAdd || (types.find(i => i.id === walletType).type_payment === 'w' && useProfile.profile.wallets.total_wallets < item.total_price_cost)"
        type="submit" class="btn btn-sm pixa-btn btn-primary mt-4">
        <span v-if="loadingAdd" class="loading loading-ring loading-sm"></span>
        <span v-else>pay now</span>
      </button>


    </form>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import paperClipIcon from '@/assets/icons/paperClipIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import walletsTypeDropsown from '../wallet/walletsTypeDropsown.vue';
import listIcon from '@/assets/icons/listIcon.vue';
import { objectToFormData } from '@/utils/formDataUtils'
import { Client, Environment } from 'square'
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useProfileStore } from '@/stores/profile';
import { useInboxStore } from '@/stores/inbox';
import { useRoute } from 'vue-router';

const props = defineProps(['types', 'item'])
const useWidget = useWidgetStore()
const loadingAdd = ref(false)
const useProfile = useProfileStore()
const env = import.meta.env.VITE_WORLDSHIP_API
const walletType = ref(props.types[0].id)
const fileName = ref('')
const route = useRoute()
const useInbox = useInboxStore()
const payment = reactive(
  {
    is_wallets: 0,
    pack_pay_id: null,
    pack_pay_type_id: null,
    image: null
  }
)


const handleFileChange = (event) => {
  payment.image = event.target.files[0]; // Get the first file
  if (payment.image) {
    fileName.value = payment.image.name; // Set the file name
  } else {
    fileName.value = ''; // Clear the file name if no file is selected
  }
}

const closeModal = () => {
  useWidget.newPayment = false
  Object.assign(payment, {
    is_wallets: 0,
    pack_pay_id: null,
    pack_pay_type_id: null,
    image: null
  })
  walletType.value = props.types[0].id
}

const newPayment = async () => {

  loadingAdd.value = true

  let tempWallet = {
    is_wallets: payment.is_wallets,
    pack_pay_id: props.item.id,
    pack_pay_type_id: walletType.value,
    image: payment.image
  }

  let formData = new FormData()

  formData.append('is_wallets', tempWallet.is_wallets)
  formData.append('pack_pay_id', tempWallet.pack_pay_id)
  formData.append('pack_pay_type_id', tempWallet.pack_pay_type_id)
  formData.append('image', tempWallet.image)

  try {
    if (route.name === 'shippement') {
      let response = await axios.post(`/Dashboard/add_wh_payment_API/${localStorage.getItem('ws-user-id')}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      await useInbox.getShippements(null, route.params.id)
      useInbox.filtredShippements = useInbox.shippements
    } else {
      let response = await axios.post(`/Dashboard/add_bfm_payment_API/${localStorage.getItem('ws-user-id')}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      await useInbox.getBuyForMes(null, route.params.id)
    }

    // await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    closeModal()
  } catch (error) {
    console.error(error)
  }
  loadingAdd.value = false
}

const onSelectedType = (id) => {
  walletType.value = id
  if (props.types.find(item => item.id === walletType.value).type_payment === 'c' || props.types.find(item => item.id === walletType.value).type_payment === 'w') {
    payment.is_wallets = 1
  } else {
    payment.is_wallets = 0
  }
}

</script>

<style lang="scss" scoped></style>
