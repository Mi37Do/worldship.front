<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <span class="pixa-title  flex-1">
          <span v-if="loading"></span>
          <span v-else>{{ useInbox.focusedShippement.code }}</span>
        </span>
      </template>
    </top-app-bar>

    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 overflow-auto ">
      <div class="w-full h-fit py-4 flex flex-col gap-4">

        <add-adress-book />


        <payment-modal :item="useInbox.focusedShippement" :types="useProfile.profile.payments_methodes"
          :cards="tempCards" />

        <div class="w-full h-full grid lg:grid-cols-3 gap-4">
          <div class="w-full flex flex-col gap-4 lg:col-span-2">

            <div v-auto-animate
              class="w-full h-fit flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4">
              <label @click="show = !show"
                class="w-full flex items-center justify-between   fill-slate-500 hover:fill-primary pr-1.5">
                <div class="flex gap-4 items-center">
                  <span class="pixa-title">Package</span>
                  <span
                    class=" my-auto flex items-center truncate bg-slate-100 w-fit px-3 py-1.5 rounded font-semibold">{{
                      useInbox.focusedShippement && useInbox.focusedShippement.warehouse_order_ids ?
                        useInbox.focusedShippement.warehouse_order_ids.length : 0 }}</span>
                </div>
                <plus-icon :class="[
                  show ? 'rotate-45' : 'rotate-0',
                  'w-5 h-5 transition-all duration-200']" />
              </label>
              <div v-if="show" class="w-full flex flex-col gap-3">

                <div class="w-full p-1 bg-primary rounded-md grid grid-cols-2 gap-1">
                  <button @click="isPicture = false"
                    :class="!isPicture ? ' pixa-btn-float' : 'border-0 bg-transparent hover:bg-white/20 text-white'"
                    class="btn btn-sm pixa-btn">items</button>
                  <button @click="isPicture = true"
                    :class="isPicture ? ' pixa-btn-float' : 'border-0 bg-transparent hover:bg-white/20 text-white'"
                    class="btn btn-sm pixa-btn">pictures</button>
                </div>

                <div v-if="!isPicture" class="w-full grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                  <package-item v-for="item in tempItems" :key="item.id" :item="item" />
                </div>


                <div v-else class="w-full grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div v-for="pics in useInbox.focusedShippement.wh_pk_ad_picture" :key="pics"
                    class="w-full h-40 bg-slate-100 rounded-md overflow-hidden">
                    <img :src="env + pics.image"
                      v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }"
                      alt="">
                  </div>
                </div>
              </div>


            </div>

            <div
              class="w-full h-fit flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4 col-span-2">
              <div v-if="useInbox.focusedShippement" class="w-full flex items-center justify-between">
                <span class="pixa-title">delivery point</span>
                <commun-switch :enabled="useInbox.focusedShippement.deliver_type !== 'n' ? true : false"
                  @selectedEnabled="(value) => {
                    if (value) {

                      useInbox.focusedShippement.deliver_type = 'p'
                    } else {
                      useInbox.focusedShippement.deliver_type = 'n'
                    }
                  }" />
              </div>

              <div v-if="useInbox.focusedShippement.deliver_type !== 'n' && !useInbox.focusedShippement.is_payed"
                class="w-full p-1 bg-primary/10 rounded-md grid grid-cols-2 gap-1">
                <button @click="async () => {
                  loading = true
                  deliverToCenter = true

                  let response = await axios.get(`/Dashboard/usePickUpLocal_API/${route.params.id}/1`)

                  useInbox.focusedShippement.total_price_cost = response.data.reslut

                  tempBook = tempAdresses[0].id
                  loading = false
                }"
                  :class="deliverToCenter ? 'bg-primary hover:bg-primary/40 text-white' : 'hover:bg-white/80 text-primary bg-transparent border-0'"
                  class="btn btn-sm pixa-btn flex justify-between">
                  <span>
                    Pick Up Local Office (FREE)</span>

                  <div v-if="deliverToCenter" class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center">
                    <check-icon class="w-4 h-4 fill-white" />
                  </div>

                </button>
                <button @click="async () => {
                  loading = true
                  deliverToCenter = false

                  let response = await axios.get(`/Dashboard/usePickUpLocal_API/${route.params.id}/0`)

                  useInbox.focusedShippement.total_price_cost = response.data.reslut

                  tempBook = useInbox.focusedShippement.address_book ? useInbox.focusedShippement.address_book.id : useBook.tempBooks[0].id

                  loading = false
                }"
                  :class="!deliverToCenter ? 'bg-primary hover:bg-primary/40 text-white' : 'hover:bg-white/80 text-primary bg-transparent border-0'"
                  class="btn btn-sm pixa-btn  flex justify-between">
                  <span>Deliver to Home (${{ useInbox.focusedShippement.deliver_to_home }}
                    FEE)</span>


                  <div v-if="!deliverToCenter"
                    class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center">
                    <check-icon class="w-4 h-4 fill-white" />
                  </div>
                </button>
              </div>

              <div v-if="deliverToCenter" class="w-full flex flex-col gap-3">

                <div class="flex gap-2 w-full justify-end">
                  <book-combobox
                    v-if="useInbox.focusedShippement.deliver_type !== 'n' && !useInbox.focusedShippement.is_payed"
                    :list="tempAdresses" :selected="tempBook" @onSelectedItem="async (id) => {
                      tempBook = id

                      let response = await axios.get(`/Dashboard/updatePickUpLocal_API/${route.params.id}/${tempBook}`)

                      console.log(response)


                    }" class="hidden md:block" />
                </div>
                <div v-if="useInbox.focusedShippement.pickUp_local"
                  class="w-full h-fit rounded-md border border-slate-200 overflow-hidden bg-primary/5 p-3 grid grid-cols-2 gap-3 uppercase">
                  <!---->
                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">name</span>
                    <span>
                      {{useProfile.locations.find(item => item.id === tempBook).name}}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">city</span>
                    <span>
                      {{formatPhoneNumber(useProfile.locations.find(item => item.id === tempBook).city_id.name)}}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">phone</span>
                    <span>
                      {{formatPhoneNumber(useProfile.locations.find(item => item.id === tempBook).phone)}}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">second phone</span>
                    <span>
                      {{useProfile.locations.find(item => item.id === tempBook).second_phone ?
                        formatPhoneNumber(useProfile.locations.find(item => item.id === tempBook).second_phone) :
                        '-------'
                      }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="w-full flex flex-col gap-3">


                <div class="flex gap-2 w-full justify-end">
                  <book-combobox v-if="!useInbox.focusedShippement.is_payed" :list="useBook.tempBooks"
                    :selected="tempBook" @onSelectedItem="onChangeBook" class="hidden md:block" />
                  <button v-if="!useInbox.focusedShippement.is_payed" @click="Object.assign(useWidget.addAddressBook, {
                    open: true,
                    add: true
                  })" class="btn btn-sm pixa-btn btn-primary">
                    <plus-icon class="w-5 h-5" />
                    add address</button>
                </div>

                <div
                  class="w-full h-fit rounded-md border border-slate-200 overflow-hidden bg-primary/5 p-3 grid grid-cols-2 gap-3 uppercase">
                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">name</span>
                    <span>
                      {{useBook.addresses.find(item => item.id === tempBook).name}}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">city</span>
                    <span>
                      {{formatPhoneNumber(useBook.addresses.find(item => item.id === tempBook).city_id.name)}}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">phone</span>
                    <span>
                      {{formatPhoneNumber(useBook.addresses.find(item => item.id === tempBook).phone)}}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">second phone</span>
                    <span>
                      {{useBook.addresses.find(item => item.id === tempBook).second_phone ?
                        formatPhoneNumber(useBook.addresses.find(item => item.id === tempBook).second_phone) : '-------'
                      }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full h-fit bg-white rounded-lg border border-gray-200 p-3">
              <div v-if="useInbox.focusedShippement.label_shipp"
                class="w-full flex flex-col rounded-md overflow-hidden">
                <div v-for="(i, index) in useInbox.focusedShippement.label_shipp
                  .tracking_ship" :key="i" :class="index % 2 ? 'bg-slate-100' : ''" class="w-full flex px-4">
                  <div class="w-px  flex flex-col items-center">
                    <span :class="index === 0 ? '' : 'bg-slate-400'" class="h-6 w-1 "></span>
                    <div class="w-2 h-2 rounded-full bg-slate-500 outline outline-2 outline-white z-10"></div>
                    <span :class="index === useInbox.focusedShippement.label_shipp
                      .tracking_ship.length - 1 ? '' : 'bg-slate-400'" class="flex-1 w-1"></span>
                  </div>
                  <div class="flex-1 h-fit flex flex-col gap-1.5 p-3">
                    <span class="font-medium text-lg truncate">{{ i.name }}</span>
                    <span>{{ i.date_act }}</span>
                    <span>{{ i.description }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>


          <div
            class="w-full h-fit flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4 uppercase">

            <span class="pixa-title h-10 flex items-center">Details Package</span>

            <div class="w-full h-fit grid grid-cols-2 gap-4">
              <span class="font-semibold h-10 flex items-center">Package Quantity</span>

              <span class="text-right my-auto">{{
                useInbox.focusedShippement.warehouse_order_ids.length }} Packages</span>

              <span class="font-semibold h-10 flex items-center">Package Weight</span>

              <span class="text-right my-auto">{{ numberFormat(useInbox.focusedShippement.total_weight) }} Lbs</span>

              <span class="font-semibold h-10 flex items-center">Package Value</span>

              <span class="text-right my-auto">$ {{ numberFormat(useInbox.focusedShippement.total_price) }}</span>

              <span v-if="useInbox.focusedShippement.deliver_type === 'h'"
                class="font-semibold h-10 flex items-center">deliver to home</span>

              <span v-if="useInbox.focusedShippement.deliver_type === 'h'" class="text-right my-auto">$ {{
                numberFormat(useInbox.focusedShippement.deliver_to_home) }}</span>

              <span class="font-semibold h-10 flex items-center">add Insurance $ {{
                numberFormat(useInbox.focusedShippement.total_insurance) }} </span>

              <div v-if="!useInbox.focusedShippement.is_payed" class="flex justify-end">
                <commun-switch @selectedEnabled="onSelectedEnabledInsurance" :enabled="tempInsurance" />
              </div>

              <div v-else></div>

              <span class="font-semibold h-10 flex items-center gap-2">Use Coins<span class="text-emerald-600">({{
                useProfile.totalCoins }}
                  coin)</span></span>

              <form @submit.prevent="useCoins" class="w-fit h-fit relative overflow-hidden">
                <input type="number" min="500" placeholder="coins"
                  :disabled="useInbox.focusedShippement.total_coins < 500" v-model="tempCoins"
                  class="pixa-input px-4 w-full ml-auto placeholder:uppercase">

                <button type="submit" :disabled="loadingCoin || tempCoins > useProfile.totalCoins"
                  :class="!tempCoins || tempCoins < 500 ? '-right-12' : 'right-1'"
                  class="btn btn-sm btn-square absolute btn-primary top-1 transition-all duration-150 ">
                  <span v-if="loadingCoin" class="loading loading-ring loading-sm"></span>
                  <check-icon v-else class="w-5 h-5" />
                </button>
              </form>

              <span class="font-semibold my-auto">Use Promo Code</span>

              <form @submit.prevent="usePromoCode" class="w-fit h-fit relative overflow-hidden">
                <input type="text" placeholder="your promo code" v-model="useInbox.focusedShippement.promo_code"
                  :disabled="!useInbox.focusedShippement.is_payed"
                  class="pixa-input px-4 w-full ml-auto placeholder:uppercase">

                <button v-if="!useInbox.focusedShippement.is_payed" type="submit" :disabled="loadingCode"
                  :class="!useInbox.focusedShippement.promo_code ? '-right-12' : 'right-1'"
                  class="btn btn-sm btn-square absolute btn-primary top-1 transition-all duration-150 ">
                  <span v-if="loadingCode" class="loading loading-ring loading-sm"></span>
                  <check-icon v-else class="w-5 h-5" />
                </button>
              </form>

              <div class="col-span-2">
                <div class="w-full h-fit bg-primary/10 flex flex-col p-1 gap-1 rounded-md">
                  <div @click="async () => {
                    isCargo = false
                    useInbox.focusedShippement.use_cargo = false
                    let response = await axios.get(`/Dashboard/choose_ship_API/${route.params.id}/0`)
                    console.log(response.data)
                    useInbox.focusedShippement.total_price_cost = response.data.reslut
                  }" :class="!isCargo ? 'bg-primary text-white' : 'hover:bg-white/80'"
                    class="w-full h-14 p-2 rounded flex items-center">
                    <div class="flex-1 flex flex-col">
                      <span>Shipping Cost</span>
                      <span>$ {{ numberFormat(useInbox.focusedShippement.shipping_cost) }}
                      </span>
                    </div>
                    <div v-if="!isCargo" class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center">
                      <check-icon class="w-4 h-4 fill-white" />
                    </div>
                  </div>

                  <div @click="async () => {
                    isCargo = true
                    useInbox.focusedShippement.use_cargo = true
                    let response = await axios.get(`/Dashboard/choose_ship_API/${route.params.id}/1`)
                    console.log(response.data)
                    useInbox.focusedShippement.total_price_cost = response.data.reslut

                  }" :class="isCargo ? 'bg-primary text-white' : 'hover:bg-white/80'"
                    class="w-full h-14 p-2 rounded flex items-center">
                    <div class="flex-1 flex flex-col">
                      <span>cargo</span>
                      <span>$ {{ numberFormat(useInbox.focusedShippement.cargo_shipping_cost) }}
                      </span>
                    </div>
                    <div v-if="isCargo" class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center">
                      <check-icon class="w-4 h-4 fill-white" />
                    </div>
                  </div>
                </div>
              </div>

            </div>


            <span class="pixa-title h-10 flex items-center">Package Options</span>

            <div class="w-full">
              <div v-for="item in useInbox.packageOptions" :key="item.id" class="w-full grid grid-cols-2 gap-4">

                <span class="font-semibold h-10 flex items-center">{{ item.name }} <br> ($ {{ numberFormat(item.price)
                  }})</span>
                <div class="flex justify-end">
                  <commun-switch v-if="!useInbox.focusedShippement.is_payed"
                    :enabled="useInbox.focusedShippement.option_package_ids.find(i => i.id === item.id) ? true : false"
                    @selectedEnabled="(value) => onSelectedEnabledOption(value, item.id)" />

                  <span v-else></span>
                </div>

              </div>
            </div>
            <span class="w-full h-px bg-slate-200"></span>

            <div class="w-full grid grid-cols-2 gap-4">
              <span class="font-bold h-10 flex items-center">Total </span>

              <span class="text-right my-auto font-bold">$ {{ numberFormat(useInbox.focusedShippement.total_price_cost)
              }}
              </span>
            </div>

            <button v-if="!useInbox.focusedShippement.is_payed" @click="useWidget.newPayment = true"
              class="btn btn-sm pixa-btn w-full btn-primary">show state and
              open
              invoice</button>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import contactItem from '@/components/shippement/contactItem.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import checkIcon from '@/assets/icons/checkIcon.vue';
import packageItem from '@/components/shippement/packageItem.vue';
import { useRoute } from 'vue-router';
import plusIcon from '@/assets/icons/plusIcon.vue';
import communSwitch from '@/components/commun/communSwitch.vue';
import { useInboxStore } from '@/stores/inbox';
import { useWidgetStore } from '@/stores/widget';
import { onMounted, ref, watch } from 'vue';
import { useBookStore } from '@/stores/addressBook';
import addAdressBook from '@/components/addressBook/addAdressBook.vue';
import axios from 'axios';
import bookCombobox from '@/components/commun/bookCombobox.vue';
import { useProfileStore } from '@/stores/profile';
import { formatPhoneNumber } from '@/utils/phoneUtils';
import paymentModal from '@/components/shippement/paymentModal.vue';
import { useInvoicesStore } from '@/stores/invoices';
import { format } from 'date-fns';


const env = import.meta.env.VITE_WORLDSHIP_API
const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
const route = useRoute()
const show = ref(false)
const useBook = useBookStore()
const loadingBook = ref(true)
const tempInsurance = ref(false)
const tempCodePromo = ref('')
const tempCoins = ref(0)
const loadingCoin = ref(false)
const loadingCode = ref(false)
const useProfile = useProfileStore()
const tempBook = ref(null)
const useInvoices = useInvoicesStore()
const tempCards = ref([])
const tempItems = ref([])
const deliverToCenter = ref(true)
const tempAdresses = ref([])
const isCargo = ref(false)
const isPicture = ref(false)

onMounted(async () => {
  try {
    await useInbox.getShippements(null, route.params.id)
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
    await useProfile.getCoins(localStorage.getItem('ws-user-id'))
    await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    await useInvoices.getCards(localStorage.getItem('ws-user-id'))

    console.log(useInbox.focusedShippement)


    if (useInbox.focusedShippement.deliver_type === 'p') {
      deliverToCenter.value = true
      tempBook.value = useInbox.focusedShippement.pickUp_local.id
    } else if (useInbox.focusedShippement.deliver_type === 'h') {
      deliverToCenter.value = false
      tempBook.value = useInbox.focusedShippement.address_book.id
    }

    if (useInbox.focusedShippement.use_cargo) isCargo.value = true


    tempCards.value = useInvoices.cards.map((item) => {
      return {
        id: item.id,
        designation: item.name + '' + item.last_4,
        designation_ar: item.name + '' + item.last_4
      }
    })


    tempAdresses.value = useProfile.locations.map(item => {
      return {
        id: item.id,
        designation: item.city_id.name + ' - ' + item.adr,
      }
    })

    useProfile.profile.payments_methodes.push(
      {
        id: 0,
        name: 'wallet',
        type_payment: 'w'
      }
    )


    for (let index = 0; index < useInbox.focusedShippement.warehouse_order_ids.length; index++) {
      const element = useInbox.focusedShippement.warehouse_order_ids[index]

      for (let j = 0; j < element.wh_order.length; j++) {
        const elementx = element.wh_order[j]
        tempItems.value.push(
          {
            id: elementx.id,
            qty: elementx.qty,
            total: elementx.price,
            name: elementx.name_id.name,
            images: elementx.images
          }
        )
      }
    }

    useBook.tempBooks = useBook.addresses.map(item => ({
      id: item.id,
      designation: item.name
    })
    )

    tempCoins.value = useInbox.focusedShippement.total_coins ? useInbox.focusedShippement.total_coins : 0
    tempInsurance.value = useInbox.focusedShippement.add_insurance
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})

const onSelectedEnabledOption = async (value, id) => {
  try {
    let response = await axios.get(`/Dashboard/updateOptionPk_API/${route.params.id}/${id}/${value ? 1 : 0}`)
    await useInbox.getShippements(null, route.params.id)
  } catch (error) {
    console.error(error)
  }
}

const onSelectedEnabledInsurance = async (value) => {
  try {
    let response = await axios.get(`/Dashboard/updateInsurancePk_API/${route.params.id}/${value ? 1 : 0}/`)
    await useInbox.getShippements(null, route.params.id)
  } catch (error) {
    console.error(error)
  }
}

const onChangeBook = async (id) => {
  try {
    let response = await axios.get(`/Dashboard/updateAddressPk_API/${route.params.id}/${id}`)
    tempBook.value = useInbox.focusedShippement.address_book ? useInbox.focusedShippement.address_book.id : useBook.tempBooks[0].id

    await useInbox.getShippements(null, route.params.id)
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
  } catch (error) {
    console.error(error)
  }
}

watch(() => useInbox.focusedShippement, () => {

  if (useInbox.focusedShippement && useInbox.focusedShippement.address_book) {
    loadingBook.value = false
  } else loadingBook.value = true

}, { deep: true })

const usePromoCode = async () => {
  loadingCode.value = true
  tempCodePromo.value = useInbox.focusedShippement.promo_code
  try {
    let response = await axios.get(`/Dashboard/updatePromo_codesPk_API/${route.params.id}/${tempCodePromo.value}`)
    console.log(response.data)

    await useInbox.getShippements(null, route.params.id)
  } catch (error) {
    console.error(error)
  }
  loadingCode.value = false
}

const useCoins = async () => {
  loadingCoin.value = true
  try {
    let response = await axios.get(`/Dashboard/updateCoinsPk_API/${route.params.id}/${tempCoins.value}`)
    await useProfile.getCoins(localStorage.getItem('ws-user-id'))
    await useInbox.getShippements(null, route.params.id)
  } catch (error) {
    console.error(error)
  }
  loadingCoin.value = false
}


</script>

<style lang="scss" scoped></style>
