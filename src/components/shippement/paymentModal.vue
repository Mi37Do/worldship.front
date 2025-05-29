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
          <span class="text-right my-auto">$ {{ numberFormat(item.total_price) }} </span>
          <div v-if="route.name === 'shippement'" class="w-full grid grid-cols-2 gap-4 col-span-2">
            <span class="text-red-500">Insurance </span>
            <span class="text-right my-auto text-red-500"> $ {{ numberFormat(item.add_insurance ? item.total_insurance :
              0)
              }} </span>
            <span class="text-red-500">Package Options </span>
            <span class="text-right my-auto text-red-500">$ {{ numberFormat(item.total_price_options) }} </span>
            <span>Coins </span>
            <span class="text-right my-auto">$ {{ numberFormat(item.total_coins) }} </span>

            <span v-if="item.deliver_to_type === 'h'">Shipping Cost </span>
            <span v-if="item.deliver_to_type === 'h'" class="text-right my-auto">$ {{ numberFormat(item.deliver_to_home)
              }}
            </span>
            <span v-if="!item.use_cargo">DHL </span>
            <span v-if="!item.use_cargo" class="text-right my-auto">$ {{ numberFormat(item.shipping_cost) }}
            </span>
            <span v-if="item.use_cargo">Cargo </span>
            <span v-if="item.use_cargo" class="text-right my-auto"> $ {{ numberFormat(item.cargo_shipping_cost) }}
            </span>

            <span v-if="item.deliver_type === 'h'">deliver to home </span>
            <span v-if="item.deliver_type === 'h'" class="text-right my-auto"> $ {{
              numberFormat(item.deliver_to_home) }}
            </span>
          </div>

          <div v-else class="w-full h-fit grid grid-cols-2 gap-4  col-span-2">
            <span>services </span>
            <span class="text-right my-auto ">$ {{ numberFormat(item.total_price_options) }} </span>
          </div>

        </div>
        <div class="w-full h-px bg-primary/20"></div>

        <div class="w-full h-fit grid grid-cols-2 gap-4 font-bold ">

          <span>total </span>
          <span class="text-right my-auto"> $ {{ numberFormat(item.total_price_cost) }}</span>
        </div>
      </div>

      <!--
      <div class="form-control w-full">
        <div class="label">
          <span class="label-text uppercase">balance type </span>
        </div>

        <walletsTypeDropsown :list="types" :selected="walletType" @onSelectedType="(id) => {
          preview = null
          onSelectedType(id)
        }" />
      </div>-->


      <!--
      <div v-if="types.find(item => item.id === walletType).type_payment === 'c'"
        class="w-full flex-1 overflow-auto pt-8 flex flex-col gap-4">
        <div class="w-full rounded-lg bg-primary p-1 grid grid-cols-2 gap-1">
          <button @click="existingCreditCard = true" type="button"
            :class="existingCreditCard ? 'pixa-btn-float' : 'bg-transparent text-white hover:bg-white/20 border-0'"
            class="btn btn-sm pixa-btn">existing
            credit
            card</button>
          <button @click="existingCreditCard = false" type="button"
            :class="existingCreditCard ? 'bg-transparent text-white hover:bg-white/20 border-0' : 'pixa-btn-float'"
            class="btn btn-sm pixa-btn">new credit
            card</button>
        </div>
        <div v-if="existingCreditCard" class="h-48 flex flex-col justify-between">
          <commun-combobox :list="cards" />

          <button
            :disabled="loadingAdd || (types.find(i => i.id === walletType).type_payment === 'w' && useProfile.profile.wallets.total_wallets < item.total_price_cost)"
            type="submit" class="btn btn-sm pixa-btn btn-primary w-full">
            <span v-if="loadingAdd" class="loading loading-ring loading-sm"></span>
            <span v-else>pay now</span>
          </button>
        </div>
        <div v-else class="flex flex-col gap-4">

          <label class="form-control w-full ">
            <div class="label">
              <span class="label-text uppercase">card holder name </span>
            </div>
            <input type="text" required class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <payment-view />
        </div>
      </div>-->

      <div class="w-full flex-1 overflow-auto">
        <div class="w-full h-fit flex flex-col items-center gap-3 py-4">

          <div class="w-full mt-4 flex items-center justify-center uppercase font-semibold text-lg">payment by {{
            types.find(item => item.id
              === walletType).name}}</div>


          <div v-if="types.find(item => item.id === walletType).type_payment === 'zn'" class="w-full h-10  text-center">
            Transfer ${{ numberFormat(item.total_price_cost) }} to this account <span
              v-if="types.find(item => item.id === walletType).type_payment === 'z'">: {{
                useProfile.profile.payments_methodes.find(item => item.type_payment === 'z').account}}</span> </div>

          <img v-if="types.find(item => item.id === walletType).type_payment === 'zn'"
            :src="env + types.find(item => item.id === walletType).zen_qr_code" class="h-40 -mt-4" alt="">
          <div v-else-if="types.find(item => item.id === walletType).type_payment === 'w'"
            class="w-full h-16 flex justify-center items-center">
            <div class=" p-4 uppercase bg-slate-100 rounded-md border border-slate-200">your wallet credit : {{
              useProfile.profile.wallets.total_wallets }}</div>
          </div>
          <img v-else :src="env + types.find(item => item.id === walletType).image" class="h-16 mt-3" alt="">

          <div v-if="types.find(item => item.id === walletType).type_payment === 'z'" class="w-full h-10  text-center">
            Transfer ${{ numberFormat(item.total_price_cost) }} to this account <span>: {{
              useProfile.profile.payments_methodes.find(item => item.type_payment === 'z').account}}</span> </div>

          <div v-if="types.find(item => item.id === walletType).type_payment !== 'w'"
            class="w-full py-4 rounded-md border border-slate-200 mt-2 flex flex-col gap-4 items-center justify-center fill-slate-500 relative">

            <div class="w-40 h-40 bg-primary/10 rounded p-1 flex items-center justify-center relative cursor-pointer">
              <div v-if="preview" class="w-full h-full flex relative">
                <button type="button" @click="preview = null"
                  class="btn btn-sm btn-square absolute right-1 top-1 pixa-btn-delete">
                  <trash-icon class="w-5 h-5" />
                </button>
                <img :src="preview" class="w-full h-full object-cover rounded" alt="">
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

      <span
        v-if="(types.find(i => i.id === walletType).type_payment === 'w' && useProfile.profile.wallets.total_wallets < item.total_price_cost)"
        class="text-red-500 text-center uppercase">your balance is low, please recharge it!</span>

      <button v-if="types.find(item => item.id === walletType).type_payment !== 'c'"
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
import paymentView from '@/views/pages/paymentView.vue';
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useProfileStore } from '@/stores/profile';
import { useInboxStore } from '@/stores/inbox';
import communCombobox from '../commun/communCombobox.vue';
import plusIcon from '@/assets/icons/plusIcon.vue';
import trashIcon from '@/assets/icons/trashIcon.vue';
import { useRoute } from 'vue-router';

const props = defineProps(['types', 'item', 'cards'])
const useWidget = useWidgetStore()
const loadingAdd = ref(false)
const useProfile = useProfileStore()
const env = import.meta.env.VITE_WORLDSHIP_API
const walletType = ref(0)
const preview = ref(null)
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

const existingCreditCard = ref(true)

const handleFileChange = (event) => {
  payment.image = event.target.files[0]; // Get the first file
  if (payment.image) {
    fileName.value = payment.image.name; // Set the file name
  } else {
    fileName.value = ''; // Clear the file name if no file is selected
  }
  if (payment.image) {
    preview.value = payment.image
    const reader = new FileReader(); // Create a FileReader to read the file
    reader.onload = (e) => {
      preview.value = e.target.result; // Set the image URL to the ref
    };
    reader.readAsDataURL(payment.image); // Read the file as a data URL
    fileName.value = payment.image.name;  // Set the file name
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
  walletType.value = 0
}

console.log(props.types)



const newPayment = async () => {

  loadingAdd.value = true

  let tempWallet = {
    is_wallets: payment.is_wallets,
    pack_pay_id: props.item.id,
    pack_pay_type_id: walletType.value,
    image: payment.image
  }

  console.log(tempWallet)


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
