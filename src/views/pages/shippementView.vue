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

        <payment-modal :item="useInbox.focusedShippement" :types="useProfile.profile.payments_methodes" />

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

              <div v-if="show" class="w-full grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                <package-item v-for="item in useInbox.focusedShippement.warehouse_order_ids" :key="item.id"
                  :item="item" />
              </div>

            </div>

            <div
              class="w-full h-fit flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4 col-span-2">
              <div class="w-full flex items-center justify-between">
                <span class="pixa-title">Address Book</span>

                <div class="flex gap-2">
                  <book-combobox :list="useBook.tempBooks" :selected="tempBook" @onSelectedItem="onChangeBook"
                    class="hidden md:block" />
                  <button @click="Object.assign(useWidget.addAddressBook, {
                    open: true,
                    add: true
                  })" class="btn btn-sm pixa-btn btn-primary">
                    <plus-icon class="w-5 h-5" />
                    add address</button>
                </div>
              </div>

              <book-combobox :list="useBook.tempBooks" :selected="tempBook" @onSelectedItem="onChangeBook"
                class="block md:hidden" />

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

              <span class="font-semibold h-10 flex items-center">add Insurance $ {{
                numberFormat(useInbox.focusedShippement.total_insurance) }} </span>

              <div class="flex justify-end">
                <commun-switch @selectedEnabled="onSelectedEnabledInsurance" :enabled="tempInsurance" />
              </div>

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
                  class="pixa-input px-4 w-full ml-auto placeholder:uppercase">

                <button type="submit" :disabled="loadingCode"
                  :class="!useInbox.focusedShippement.promo_code ? '-right-12' : 'right-1'"
                  class="btn btn-sm btn-square absolute btn-primary top-1 transition-all duration-150 ">
                  <span v-if="loadingCode" class="loading loading-ring loading-sm"></span>
                  <check-icon v-else class="w-5 h-5" />
                </button>
              </form>

              <span class="font-semibold h-10 flex items-center">Shipping Cost</span>

              <span class="text-right my-auto">$ {{ numberFormat(useInbox.focusedShippement.shipping_cost) }} </span>

            </div>


            <span class="pixa-title h-10 flex items-center">Package Options</span>


            <div v-for="item in useInbox.packageOptions" :key="item.id" class="w-full grid grid-cols-2 gap-4">

              <span class="font-semibold h-10 flex items-center">{{ item.name }} <br> ($ {{ numberFormat(item.price)
              }})</span>
              <div class="flex justify-end">
                <commun-switch
                  :enabled="useInbox.focusedShippement.option_package_ids.find(i => i.id === item.id) ? true : false"
                  @selectedEnabled="(value) => onSelectedEnabledOption(value, item.id)" />
              </div>

            </div>

            <span class="w-full h-px bg-slate-200"></span>

            <div class="w-full grid grid-cols-2 gap-4">
              <span class="font-bold h-10 flex items-center">Total </span>

              <span class="text-right my-auto font-bold">$ {{ numberFormat(useInbox.focusedShippement.total_price_cost)
              }}
              </span>
            </div>

            <button @click="useWidget.newPayment = true" class="btn btn-sm pixa-btn w-full btn-primary">show state and
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
const tempItems = ref([])

onMounted(async () => {
  try {
    await useInbox.getShippements(null, route.params.id)
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
    await useProfile.getCoins(localStorage.getItem('ws-user-id'))
    await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    useProfile.profile.payments_methodes.push(
      {
        id: 0,
        name: 'wallet',
        type_payment: 'w'
      }
    )

    tempItems.value = useInbox.focusedShippement.warehouse_order_ids.map(
      (item) => (
        {
          id: item.id,
          name: item.name
        }
      )
    )

    useBook.tempBooks = useBook.addresses.map(item => ({
      id: item.id,
      designation: item.name
    })
    )
    tempBook.value = useInbox.focusedShippement.address_book ? useInbox.focusedShippement.address_book.id : useBook.tempBooks[0].id
    console.log(useBook.tempBooks)

    console.log(useInbox.focusedShippement);
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
