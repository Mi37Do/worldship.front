<template>
  <div v-if="loading" class="w-full h-full flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>

  <div v-else class="w-full h-full pt-4 flex flex-col gap-4 overflow-hidden">


    <send-modal :item="useInbox.focusedBuyForMe" />
    <add-item-modal :item="selectedItem" />
    <delete-modal :item="useInbox.focusedItem" @deleteItem="onDeleteItem" />

    <payment-modal :item="{
      id: useInbox.focusedBuyForMe.id,
      total_price: useInbox.focusedBuyForMe.price_item,
      total_price_options: useInbox.focusedBuyForMe.service,
      total_price_cost: useInbox.focusedBuyForMe.total_price
    }" :types="useProfile.profile.payments_methodes" />

    <div class="w-full h-10 flex items-center justify-between">
      <div class="flex gap-3 items-center">
        <div class="w-1 h-6 bg-primary"></div>
        <div class="flex gap-2 items-center">

          <span class="pixa-title"> {{ useInbox.focusedBuyForMe.name }}</span>
          <span class=""> {{ useInbox.focusedBuyForMe.code }}</span>
        </div>
      </div>
      <div v-if="useInbox.focusedBuyForMe.state === 'n'" class="flex gap-2">

        <button @click="useWidget.sendBuyForMe = true" class="btn btn-sm pixa-btn pixa-btn-nofloat w-24">
          <message-icon class="w-5 h-5 -rotate-45" />
          send</button>

        <button :disabled="loadingSave" @click="editBuyForMe" class="btn btn-sm pixa-btn btn-primary w-24">
          <span v-if="loadingSave">
            <span class="loading loading-ring loading-sm"></span>
          </span>
          <div v-else class="flex gap-2 items-center">
            <save-icon class="w-5 h-5" />
            save
          </div>
        </button>
      </div>

      <div v-if="useInbox.focusedBuyForMe.state === 'v'" class="flex gap-2">

        <button :disabled="loadingSave" @click="useWidget.newPayment = true" class="btn btn-sm pixa-btn btn-primary">
          <span v-if="loadingSave">
            <span class="loading loading-ring loading-sm"></span>
          </span>
          <div v-else class="flex gap-2 items-center">
            <usd-circle-icon class="w-5 h-5" />
            pay now
          </div>
        </button>
      </div>
    </div>

    <div class="w-full flex-1  overflow-hidden">
      <div
        class="w-full h-full flex flex-col md:grid md:grid-cols-3  gap-4 overflow-y-auto overflow-x-hidden md:overflow-hidden md:pb-4">
        <div class="w-full h-fit gap-4">
          <div
            class="w-full h-fit flex flex-col gap-y-2 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4 uppercase">
            <div class="w-full h-10 flex items-center">
              <span class="pixa-title h-10 flex items-center">Details Package</span>
            </div>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">name </span>
              </div>
              <input type="text" required v-model="useInbox.focusedBuyForMe.name"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">url </span>
              </div>
              <input type="text" required v-model="useInbox.focusedBuyForMe.url"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">instructions </span>
              </div>
              <input type="text" required v-model="useInbox.focusedBuyForMe.Instructions"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">domestic shipping </span>
              </div>
              <input type="number" required v-model="useInbox.focusedBuyForMe.domestic_shipping"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <div class="w-full grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-slate-200 mt-2">

              <span class="font-semibold h-10 flex items-center">Items Value</span>
              <span class="text-right my-auto"> $ {{ numberFormat(useInbox.focusedBuyForMe.price_item) }}</span><span
                class="font-semibold h-10 flex items-center">Service
              </span>
              <span class="text-right my-auto"> $ {{ numberFormat(useInbox.focusedBuyForMe.service) }}</span>
              <span class="font-semibold h-10 flex items-center">total</span>
              <span class="text-right my-auto"> $ {{ numberFormat(useInbox.focusedBuyForMe.total_price) }} </span>
            </div>
          </div>

        </div>

        <div class="w-full h-full gap-4 col-span-2 overflow-hidden">
          <div
            class="w-full h-full flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl py-4 uppercase overflow-hidden">
            <div class="w-full flex gap-4 items-center px-4">
              <span class="pixa-title">Package</span>
              <span class=" my-auto flex items-center truncate bg-slate-100 w-fit px-3 py-1.5 rounded font-semibold">{{
                useInbox.items.length }}</span>

              <div class="flex-1 flex justify-end">
                <button @click="useWidget.addItem.open = true" v-if="useInbox.focusedBuyForMe.state === 'n'"
                  class="btn btn-sm pixa-btn btn-primary">
                  <PlusIcon class="w-5 h-5" />
                  <span>add item</span>
                </button>
              </div>

            </div>

            <div class="w-full flex-1 overflow-hidden">
              <div :class="[useWidget.userLanguage === 'ar' ? 'pr-4 pl-2' : ' pr-2 pl-4']"
                class="w-full h-full overflow-auto  border-t border-slate-200">
                <div class="w-full h-fit grid grid-cols-3 gap-4 py-4">
                  <package-item v-for="item in useInbox.items" :key="item" :item="item"
                    :name="useInbox.focusedBuyForMe.name">
                    <template #options>
                      <package-more :item="item" />
                    </template>
                  </package-item>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!--
        <div class="w-full h-fit md:h-full pb-4 flex flex-col gap-4 md:col-span-2">
          <div v-auto-animate
            class="w-full h-fit md:h-full flex flex-col gap-4 bg-white rounded-lg border border-gray-200 shadow-primary/5 shadow-2xl p-4">
            <label @click="show = !show"
              class="w-full flex items-center justify-between   fill-slate-500 hover:fill-primary pr-1.5">
              <div class="flex gap-4 items-center">
                <span class="pixa-title">Package</span>
                <span
                  class=" my-auto flex items-center truncate bg-slate-100 w-fit px-3 py-1.5 rounded font-semibold">{{
                    useInbox.items.length }}</span>
              </div>
              <PlusIcon :class="[
                show ? 'rotate-45' : 'rotate-0',
                'w-5 h-5 transition-all duration-200']" />
            </label>

            <div v-if="show" class="w-full grid grid-cols-3 gap-4 mt-4">
              <package-item v-for="item in 12" :key="item" :item="item" />
            </div>

          </div>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script setup>
import saveIcon from '@/assets/icons/saveIcon.vue';
import PlusIcon from '@/assets/icons/plusIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import packageItem from '@/components/shippement/packageItem.vue';
import messageIcon from '@/assets/icons/messageIcon.vue';
import sendModal from '@/components/byforme/sendModal.vue';
import addItemModal from '@/components/byforme/addItemModal.vue';
import axios from 'axios';
import packageMore from '@/components/byforme/packageMore.vue';
import deleteModal from '@/components/commun/deleteModal.vue';
import paymentModal from '@/components/shippement/paymentModal.vue';
import usdCircleIcon from '@/assets/icons/usdCircleIcon.vue';
import { useProfileStore } from '@/stores/profile';

const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
const show = ref(false)
const route = useRoute()
const items = ref([])
const selectedItem = ref(null)
const useProfile = useProfileStore()
const loadingSave = ref(false)

onMounted(async () => {
  useInbox.items = []
  try {
    await useInbox.getBuyForMes(null, route.params.id)
    useInbox.items = useInbox.focusedBuyForMe.b4m_order
    console.log(useInbox.focusedBuyForMe)

    loading.value = false
  } catch (error) {
    loading.value = true
  }
})

/***/
const editBuyForMe = async () => {

  loadingSave.value = true

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

  try {
    let response = await axios.post(`/Dashboard/edit_buy_for_me_order_API/${route.params.id}/${localStorage.getItem('ws-user-id')}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

    await useInbox.getBuyForMes(null, route.params.id)
    console.log(response.data)

  } catch (error) {
    console.error(error)
  }

  loadingSave.value = false
}

const onDeleteItem = async (id) => {
  try {
    let response = await axios.get(`/Dashboard/deleteItemBFM_API/${id}/1`)
    await useInbox.getBuyForMes(null, route.params.id)
    useInbox.items = useInbox.focusedBuyForMe.b4m_order
    useWidget.deleteModal.open = false
  } catch (error) {
    console.error(error)
  }
}

</script>

<style lang="scss" scoped></style>
