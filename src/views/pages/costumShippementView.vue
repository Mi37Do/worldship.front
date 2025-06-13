<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <span class="pixa-title  flex-1">
          <span v-if="loading"></span>
          <span v-else class="flex gap-1.5 items-center">
            <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
              <side-menu />
            </button> {{ useInbox.focusedShippement.code }}</span>
        </span>
      </template>
    </top-app-bar>

    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 overflow-auto ">
      <div class="w-full h-fit py-4 flex flex-col gap-4">

        <add-adress-book :type="adressFrom ? 'from' : 'to'" />
        <add-edit-item />
        <DeleteModal :item="useInbox.focusedItem" @deleteItem="async (id) => {
          try {
            let response = await axios.get(`/Shipments/DeleteShipItem_API/${id}/`)
            await useInbox.getShippements(null, route.params.id)
            Object.assign(useWidget.deleteModal, {
              id: null,
              designation: null,
              open: false,
            })
          } catch (error) {
            console.error(error)

          }
        }" />


        <payment-modal :item="useInbox.focusedShippement" :types="useProfile.profile.payments_methodes"
          :cards="tempCards" />

        <div v-if="useInbox.focusedShippement.state === 'n'" class="w-full flex gap-2 justify-end">

          <button @click="async () => {
            loadingSave = true

            try {
              let response = await axios.get(`/Shipments/CancelShip_API/${route.params.id}/`)
              router.push({ name: 'costume-shippements' })
            } catch (error) {

            }
          }" class="btn btn-sm pixa-btn pixa-btn-nofloat w-24">
            <span v-if="loadingSave">
              <span class="loading loading-ring loading-sm"></span>
            </span>
            <div v-else class="flex gap-2 items-center">
              <trash-icon class="w-5 h-5" />
              cancel
            </div>
          </button>

          <button @click="async () => {
            loadingSave = true

            try {
              let response = await axios.get(`/Shipments/SendShip_API/${route.params.id}/`)
              router.push({ name: 'costume-shippements' })
            } catch (error) {

            }
          }" class="btn btn-sm pixa-btn btn-primary w-24">
            <span v-if="loadingSave">
              <span class="loading loading-ring loading-sm"></span>
            </span>
            <div v-else class="flex gap-2 items-center">
              <message-icon class="w-5 h-5" />
              save
            </div>
          </button>
        </div>

        <div class="w-full h-full grid lg:grid-cols-3 gap-4">
          <div class="w-full flex flex-col gap-4 lg:col-span-2">
            <div
              class="w-full h-fit flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4 col-span-2">
              <div class="w-full flex items-center justify-between">
                <span class="pixa-title h-10 flex items-center">delivery point</span>
                <!--
                <commun-switch :enabled="useInbox.focusedShippement.deliver_type !== 'n' || useInbox.focusedShippement.deliver_type !== 'na' ? true : false"
                  @selectedEnabled="(value) => {
                    if (value) {

                      useInbox.focusedShippement.deliver_type = 'p'
                    } else {
                      useInbox.focusedShippement.deliver_type = 'n'
                    }
                  }" /> -->
              </div>

              <div class="w-full p-1 bg-primary rounded-md grid grid-cols-2 gap-1">
                <button @click="async () => {
                  adressFrom = true
                }" :class="adressFrom ? ' pixa-btn-float' : 'border-0 bg-transparent hover:bg-white/20 text-white'"
                  class="btn btn-sm pixa-btn">from address
                </button>
                <button @click="async () => {
                  adressFrom = false
                }" :class="!adressFrom ? ' pixa-btn-float' : 'border-0 bg-transparent hover:bg-white/20 text-white'"
                  class="btn btn-sm pixa-btn">to address</button>
              </div>


              <div v-if="adressFrom" class="w-full flex flex-col gap-3">

                <div v-if="useInbox.focusedShippement.state === 'n'" class="flex gap-3 w-full justify-end">
                  <book-combobox :list="useBook.adrFrom" :selected="tempBookFrom" @onSelectedItem="async (id) => {
                    if (tempBookFrom !== id) {
                      tempBookFrom = id
                      let response = await axios.get(`/Shipments/updateAddress_FromPk_API/${route.params.id}/${id}`)

                      await useInbox.getShippements(null, route.params.id)
                    }
                  }" class="hidden md:block" />
                  <button v-if="!useInbox.focusedShippement.is_payed" @click="Object.assign(useWidget.addAddressBook, {
                    open: true,
                    add: true
                  })" class="btn btn-sm pixa-btn btn-primary">
                    <plusIcon class="w-5 h-5" />
                    add address
                  </button>
                </div>

                <div v-if="useInbox.focusedShippement.address_book_from"
                  class="w-full h-fit rounded-md border border-slate-200 overflow-hidden bg-primary/5 p-3 grid grid-cols-2 gap-3 uppercase">

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">name</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_from.name }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">company name</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_from.company_name || '------' }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">phone</span>
                    <span>
                      {{ formatPhoneNumber(useInbox.focusedShippement.address_book_from.phone) }}</span>
                  </div>

                  <span></span>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">country</span>
                    <div class="flex gap-2 items-center">
                      <img v-if="useInbox.focusedShippement.address_book_from.countrie" :src="countries.find(i => i.id ===
                        useInbox.focusedShippement.address_book_from.countrie).image" class="w-6" alt="">
                      <span>
                        {{useInbox.focusedShippement.address_book_from.countrie ? countries.find(i => i.id ===
                          useInbox.focusedShippement.address_book_from.countrie).name : '-----'
                        }}</span>
                    </div>

                  </div>




                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">state</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_from.state
                      }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">city</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_from.city_c
                      }}</span>
                  </div>


                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">zip</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_from.zip_code || '-------'
                      }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">address line</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_from.adr || '-------'
                      }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">address line 2</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_from.adr_l2 || '-------'
                      }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="w-full flex flex-col gap-3">

                <div v-if="useInbox.focusedShippement.state === 'n'" class="flex gap-3 w-full justify-end">
                  <book-combobox v-if="useInbox.focusedShippement.state === 'n'" :list="useBook.adrTo"
                    :selected="tempBookTo" @onSelectedItem="async (id) => {
                      if (tempBookTo !== id) {
                        tempBookTo = id
                        try {
                          let response = await axios.get(`/Shipments/updateAddress_ToPk_API/${route.params.id}/${id}`)

                          await useInbox.getShippements(null, route.params.id)
                        } catch (error) {
                          console.error(error)

                        }
                      }
                    }" class="hidden md:block" />
                  <button v-if="!useInbox.focusedShippement.is_payed" @click="Object.assign(useWidget.addAddressBook, {
                    open: true,
                    add: true
                  })" class="btn btn-sm pixa-btn btn-primary">
                    <plusIcon class="w-5 h-5" />
                    add address
                  </button>
                </div>




                <div v-if="useInbox.focusedShippement.address_book_to"
                  class="w-full h-fit rounded-md border border-slate-200 overflow-hidden bg-primary/5 p-3 grid grid-cols-2 gap-3 uppercase">

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">name</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_to.name }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">company name</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_to.company_name || '------' }}</span>
                  </div>


                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">phone</span>
                    <span>
                      {{ formatPhoneNumber(useInbox.focusedShippement.address_book_to.phone) }}</span>
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">city</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_to.city_id.name || '-----'
                      }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">address line</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_to.adr || '-----'
                      }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">address line 2</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_to.adr_l2 || '-----'
                      }}</span>
                  </div>

                  <div class="flex flex-col gap-1">
                    <span class=" font-medium">instructions</span>
                    <span>
                      {{ useInbox.focusedShippement.address_book_to.instructions || '-----'
                      }}</span>
                  </div>
                </div>

              </div>
            </div>
            <div v-auto-animate
              class="w-full h-fit flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4">
              <label @click="show = !show"
                class="w-full flex items-center justify-between   fill-slate-500 hover:fill-primary pr-1.5">
                <div class="flex gap-4 items-center">
                  <span class="pixa-title">Package</span>
                  <span
                    class=" my-auto flex items-center truncate bg-slate-100 w-fit px-3 py-1.5 rounded font-semibold">{{
                      useInbox.focusedShippement && useInbox.focusedShippement.sh_package ?
                        useInbox.focusedShippement.sh_package.length : 0 }}</span>
                </div>
                <plus-icon :class="[
                  show ? 'rotate-45' : 'rotate-0',
                  'w-5 h-5 transition-all duration-200']" />
              </label>
              <div v-if="show" class="w-full flex flex-col gap-3">

                <div class="w-full flex justify-end">
                  <button v-if="useInbox.focusedShippement.state === 'n'" @click="Object.assign(useWidget.addEditShippementItem, {
                    add: true,
                    open: true
                  })" class="btn btn-sm pixa-btn btn-primary">add
                    item</button>
                </div>

                <div class="w-full border border-slate-200 rounded-lg flex flex-col">
                  <div class="w-full grid grid-cols-4 gap-1.5 p-3 border-b border-slate-200">
                    <span class="border-r truncate border-slate-200">item</span>
                    <span class="border-r truncate border-slate-200">price</span>
                    <span class="border-r truncate border-slate-200">country</span>
                    <span class="truncate ">state</span>
                  </div>


                  <div v-for="item in useInbox.focusedShippement.sh_package
" :key="item" class="w-full grid grid-cols-4 gap-1.5 p-3 border-b border-slate-200">
                    <span class="truncate ">{{ item.qty }} x {{ item.name_id.name }}</span>
                    <span class="truncate ">$ {{ numberFormat(item.price) }}</span>
                    <span class="truncate flex items-center gap-2">
                      <img :src="countries.find(i => i.id ===
                        item.countrie_id).image" class="w-6" alt="">
                      <span>{{countries.find(i => i.id ===
                        item.countrie_id).name}}</span>
                    </span>

                    <div class="w-full flex items-center justify-between">

                      <span
                        :class="item.status_items === 'n' ? 'bg-emerald-100 text-emerald-500' : 'bg-indigo-100 text-indigo-500'"
                        class="truncate uppercase py-1 w-fit px-2 rounded-md text-xs font-semibold">{{
                          item.status_items === 'n' ? 'new' : 'used' }}</span>

                      <item-package-more v-if="useInbox.focusedShippement.state === 'n'" :item="item" />
                    </div>

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
              <!--
              <span class="font-semibold h-10 flex items-center">Package Quantity</span>

              <span class="text-right my-auto">{{
                useInbox.focusedShippement.warehouse_order_ids.length }} Packages</span> -->

              <span class="font-semibold h-10 flex items-center">Package Weight</span>

              <span class="text-right my-auto">{{ numberFormat(useInbox.focusedShippement.total_weight) }} Lbs</span>

              <span class="font-semibold h-10 flex items-center">Package Value</span>

              <span class="text-right my-auto">$ {{ numberFormat(useInbox.focusedShippement.total_price) }}</span>
              <!--
              <span v-if="useInbox.focusedShippement.deliver_type === 'h'"
                class="font-semibold h-10 flex items-center">deliver to home</span>

              <span v-if="useInbox.focusedShippement.deliver_type === 'h'" class="text-right my-auto">$ {{
                numberFormat(useInbox.focusedShippement.deliver_to_home) }}</span>-->

              <span class="font-semibold h-10 flex items-center">add Insurance $ {{
                numberFormat(useInbox.focusedShippement.total_insurance) }} </span>

              <div v-if="useInbox.focusedShippement.state === 'n'" class="flex justify-end">
                <commun-switch @selectedEnabled="onSelectedEnabledInsurance" :enabled="tempInsurance" />
              </div>

              <div v-else></div>

              <span class="font-semibold h-10 flex items-center gap-2">Use Coins<span class="text-emerald-600">({{
                useProfile.totalCoins }}
                  coin)</span></span>

              <form @submit.prevent="useCoins" class="w-fit h-fit relative overflow-hidden flex flex-col ">
                <input type="number" min="500" placeholder="coins"
                  :disabled="(loadingCoin || tempCoins > useProfile.totalCoins) && useInbox.focusedShippement.state !== 'n'"
                  v-model="tempCoins" class="pixa-input px-4 w-full ml-auto placeholder:uppercase">

                <button type="submit"
                  :disabled="(loadingCoin || tempCoins > useProfile.totalCoins) && useInbox.focusedShippement.state !== 'n'"
                  :class="!tempCoins || tempCoins < 500 ? '-right-12' : 'right-1'"
                  class="btn btn-sm btn-square absolute btn-primary top-1 transition-all duration-150 ">
                  <span v-if="loadingCoin" class="loading loading-ring loading-sm"></span>
                  <check-icon v-else class="w-5 h-5" />
                </button>

                <span v-if="useInbox.focusedShippement.state === 'n'" class="text-red-500 mt-2">minimum coins to use
                  500</span>
              </form>

              <span class="font-semibold my-auto">Use Promo Code</span>

              <form @submit.prevent="usePromoCode" class="w-fit h-fit relative overflow-hidden">
                <input type="text" placeholder="your promo code" v-model="useInbox.focusedShippement.promo_code"
                  :disabled="useInbox.focusedShippement.state !== 'n'"
                  class="pixa-input px-4 w-full ml-auto placeholder:uppercase">

                <button v-if="useInbox.focusedShippement.state !== 'n'" type="submit" :disabled="loadingCode"
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
                    useInbox.focusedShippement.total_price_cost = response.data.reslut
                  }" :class="!isCargo ? 'bg-primary text-white' : 'hover:bg-white/80'"
                    class="w-full h-14 p-2 rounded flex items-center">
                    <div class="flex-1 flex flex-col">
                      <span>dhl</span>
                      <span>$ {{ numberFormat(useInbox.focusedShippement.shipping_cost) }}
                      </span>
                    </div>
                    <div v-if="!isCargo" class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center">
                      <check-icon class="w-4 h-4 fill-white" />
                    </div>
                  </div>
                  <!--
                  <div @click="async () => {
                    isCargo = true
                    useInbox.focusedShippement.use_cargo = true
                    let response = await axios.get(`/Dashboard/choose_ship_API/${route.params.id}/1`)
                    useInbox.focusedShippement.total_price_cost = response.data.reslut

                  }" :class="isCargo ? 'bg-primary text-white' : 'hover:bg-white/80'"
                    class="w-full h-14 p-2 rounded flex items-center">
                    <div class="flex-1 flex flex-col">
                      <span>fedex</span>
                      <span>$ {{ numberFormat(useInbox.focusedShippement.cargo_shipping_cost) }}
                      </span>
                    </div>
                    <div v-if="isCargo" class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center">
                      <check-icon class="w-4 h-4 fill-white" />
                    </div>
                  </div> -->
                </div>
              </div>

            </div>

            <!--
            <span class="pixa-title h-10 flex items-center">Package Options</span>

            <div  class="w-full">
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
-->
            <span class="w-full h-px bg-slate-200"></span>

            <div class="w-full grid grid-cols-2 gap-4">
              <span class="font-bold h-10 flex items-center">Total </span>

              <span class="text-right my-auto font-bold">$ {{ numberFormat(useInbox.focusedShippement.total_price_cost)
              }}
              </span>
            </div>

            <button v-if="!useInbox.focusedShippement.is_payed && useInbox.focusedShippement.state === 'wp'"
              @click="useWidget.newPayment = true" class="btn btn-sm pixa-btn w-full btn-primary">show
              state and
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
import { useRoute, useRouter } from 'vue-router';
import plusIcon from '@/assets/icons/plusIcon.vue';
import communSwitch from '@/components/commun/communSwitch.vue';
import { useInboxStore } from '@/stores/inbox';
import { useWidgetStore } from '@/stores/widget';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useBookStore } from '@/stores/addressBook';
import addAdressBook from '@/components/addressBook/addAdressBook.vue';
import axios from 'axios';
import bookCombobox from '@/components/commun/bookCombobox.vue';
import { useProfileStore } from '@/stores/profile';
import { formatPhoneNumber } from '@/utils/phoneUtils';
import paymentModal from '@/components/shippement/paymentModal.vue';
import { useInvoicesStore } from '@/stores/invoices';
import { format } from 'date-fns';
import addEditItem from '@/components/shippement/addEditItem.vue';
import itemPackageMore from '@/components/shippement/itemPackageMore.vue';
import DeleteModal from '@/components/commun/deleteModal.vue';
import sideMenu from '@/assets/icons/sideMenu.vue';
import countries from '@/assets/countries.json'
import trashIcon from '@/assets/icons/trashIcon.vue';
import messageIcon from '@/assets/icons/messageIcon.vue';


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
const tempBookFrom = ref(null)
const tempBookTo = ref(null)
const useInvoices = useInvoicesStore()
const tempCards = ref([])
const tempItems = ref([])
const deliverToCenter = ref(true)
const tempAdresses = ref([])
const adressFrom = ref(true)
const isCargo = ref(false)
const isPicture = ref(false)
const loadingSave = ref(false)
const router = useRouter()

onMounted(async () => {
  try {
    await useInbox.getShippements(null, route.params.id)
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
    await useProfile.getCoins(localStorage.getItem('ws-user-id'))
    await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    await useInvoices.getCards(localStorage.getItem('ws-user-id'))
    await useProfile.getWebConfig()

    useBook.filterAdr()

    if (useInbox.focusedShippement.address_book_from
    ) {
      tempBookFrom.value = useInbox.focusedShippement.address_book_from.id
    }

    if (useInbox.focusedShippement.address_book_to) {
      tempBookTo.value = useInbox.focusedShippement.address_book_to.id
    }


    if (useInbox.focusedShippement.deliver_type === 'p') {
      deliverToCenter.value = true
      //  tempBook.value = useInbox.focusedShippement.pickUp_local.id
    } else if (useInbox.focusedShippement.deliver_type === 'h') {
      deliverToCenter.value = false
      //  tempBook.value = useInbox.focusedShippement.address_book.id
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

    /**
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
        }*/

    useBook.tempBooks = useBook.addresses.map(item => ({
      id: item.id,
      designation: item.name
    })
    )

    tempCoins.value = useInbox.focusedShippement.total_coins ? useInbox.focusedShippement.total_coins : 0
    tempInsurance.value = useInbox.focusedShippement.add_insurance
    loading.value = false
  } catch (error) {
    console.error(error)

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
    let response = await axios.get(`/Shipments/updateInsurancePk_API/${route.params.id}/${value ? 1 : 0}/`)
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
    let response = await axios.get(`/Shipments/updatePromo_codesPk_API/${route.params.id}/${tempCodePromo.value}`)

    await useInbox.getShippements(null, route.params.id)
  } catch (error) {
    console.error(error)
  }
  loadingCode.value = false
}

const useCoins = async () => {
  loadingCoin.value = true
  try {
    let response = await axios.get(`/Shipments/updateCoinsPk_API/${route.params.id}/${tempCoins.value}`)
    await useProfile.getCoins(localStorage.getItem('ws-user-id'))
    await useInbox.getShippements(null, route.params.id)
  } catch (error) {
    console.error(error)
  }
  loadingCoin.value = false
}

onUnmounted(() => {
  useInbox.focusedShippement = null
})

</script>

<style lang="scss" scoped></style>
