<template>
  <input type="checkbox" :checked="useWidget.calculator" class="modal-toggle" />
  <div class="modal modal-bottom md:modal-middle" role="dialog">
    <div class="w-full md:max-w-screen-md h-full modal-box flex flex-col p-4">
      <div class="w-full h-14 flex items-center justify-between pb-4">
        <span class="pixa-title">calculator</span>
        <div class="flex gap-2">
          <button @click=" closeModal()" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>
      </div>



      <!--
      -->

      <div class="w-full flex-1 flex flex-col gap-4 overflow-y-auto overflow-x-hidden">
        <!-- grid must be 3 after releasing buy for me -->
        <div class="w-full p-1 bg-primary rounded-lg grid grid-cols-2 gap-1">

          <button @click="() => {
            Object.assign(shippement, {
              weight: 0,
              l: 0,
              w: 0,
              h: 0,
              weightUnit: 'kg',
              lengthUnit: 'cm', from: '',
              city: null,
              cityCode: null,
              insurance: 0,
              result: null,
              items: 0,
              itemPrice: 0,
              total: 0, website: '', isBfm: false
            })

            Object.assign(resultShip, {
              weight: 0,
              l: 0,
              w: 0,
              h: 0,
              weightUnit: 'kg',
              lengthUnit: 'cm',
              city: null,
              cityCode: null,
              insurance: 0,
              result: null, mass: null,
              items: 0,
              itemPrice: 0,
              total: 0, website: '', isBfm: false
            })
            tab = 'shipement'

          }" :class="tab === 'shipement' ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-white/20 text-white'"
            class="btn btn-sm pixa-btn border-0">shippement</button>


          <button @click="() => {
            Object.assign(shippement, {
              weight: 0,
              l: 0,
              w: 0,
              h: 0,
              weightUnit: 'kg',
              lengthUnit: 'cm',
              from: '',
              city: null,
              cityCode: null,
              insurance: 0,
              result: null,
              items: 0,
              itemPrice: 0,
              total: 0, website: '', isBfm: false
            })

            Object.assign(resultShip, {
              weight: 0,
              l: 0,
              w: 0,
              h: 0,
              weightUnit: 'kg',
              lengthUnit: 'cm',
              city: null,
              cityCode: null,
              insurance: 0,
              result: null, mass: null,
              items: 0,
              itemPrice: 0,
              total: 0, website: '', isBfm: false
            })
            tab = 'costume'

          }" :class="tab === 'costume' ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-white/20 text-white'"
            class="btn btn-sm pixa-btn border-0">costume shippement</button>
          <!--
          <button @click="() => {
            Object.assign(shippement, {
              weight: 0,
              l: 0,
              w: 0,
              h: 0,
              weightUnit: 'kg',
              lengthUnit: 'cm',
              city: null, from: '',
              cityCode: null,
              insurance: 0,
              result: null,
              items: 0,
              itemPrice: 0,
              total: 0, website: ''
            })

            Object.assign(resultShip, {
              weight: 0,
              l: 0,
              w: 0,
              h: 0,
              weightUnit: 'kg',
              lengthUnit: 'cm',
              city: null,
              cityCode: null,
              insurance: 0,
              result: null, mass: null,
              items: 0,
              itemPrice: 0,
              total: 0, website: ''
            })

            tab = 'bfm'
          }" :class="tab === 'bfm' ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-white/20 text-white'"
            class="btn btn-sm pixa-btn border-0">buy for me</button>
 -->
        </div>


        <form v-if="tab === 'bfm'" @submit.prevent="calculateShipement" class="w-full h-fit flex flex-col gap-4">

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="form-control w-full md:col-span-3">
              <div class="label">
                <span class="label-text uppercase">weight <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.weight"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
            <commun-combobox class="mt-auto"
              :list="[{ id: 'lbs', designation: 'lbs' }, { id: 'kg', designation: 'kg' }]"
              :selected="shippement.weightUnit" @onSelectedItem="(id) => {
                shippement.weightUnit = id
              }" />
          </div>




          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">l <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.l"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">w <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.w"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">h <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.h"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>


            <commun-combobox class="mt-auto" :list="[{ id: 'in', designation: 'in' }, { id: 'cm', designation: 'cm' }]"
              :selected="shippement.lengthUnit" @onSelectedItem="(id) => {
                shippement.lengthUnit = id
              }" />
          </div>


          <div class="grid md:grid-cols-3 gap-4">
            <label class="form-control w-full ">
              <div class="label">
                <span class="label-text uppercase">item price <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.itemPrice"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
            <label class="form-control w-full ">
              <div class="label">
                <span class="label-text uppercase">item quantity <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.items"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label><label class="form-control w-full ">
              <div class="label">
                <span class="label-text uppercase">total us shipping <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.total"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
          </div>

          <div class="w-full h-px bg-slate-200 mt-3"></div>
          <div class="flex flex-col gap-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">webiste <span class="text-red-500">*</span></span>
              </div>
              <input type="text" required v-model="shippement.website"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">city <span class="text-red-500">*</span></span>
              </div>
              <commun-combobox class="mt-auto" :list="useBook.cities" :selected="shippement.city" @onSelectedItem="(id) => {
                shippement.city = id
                shippement.cityCode = useBook.cities.find(item => item.id === id).code
              }" />
            </label>


            <label class="w-full flex items-center gap-4 mt-4">

              <!--
              <commun-switch class="my-auto" />
 -->
              <span class="truncate mt-1">Will you combine orders at Checkout</span>
            </label>
          </div>

          <div v-if="resultShip.result"
            class="w-full h-fit bg-slate-50 rounded-xl my-6 grid grid-cols-2 p-4 gap-4 uppercase">
            <span>Chargeable Weight</span>
            <span>{{ resultShip.weight > resultShip.mass ? resultShip.weight + ' ' + resultShip.weightUnit :
              resultShip.mass.toFixed(2) + ' ≥ (' + resultShip.weight + ' ' +
              resultShip.weightUnit + ')' }}</span>


            <span>items Cost</span>
            <span>${{ resultShip.total.toFixed(2) }}</span>

            <span>Shipping Cost</span>
            <span>${{ resultShip.result.toFixed(2) }}</span>

            <span>Package Request Fee</span>
            <span>${{ (resultShip.total * useProfile.webConfig.service_charge_bfm) / 100 }}</span>
            <span class="font-semibold">Total Cost</span>
            <span class="font-semibold">${{ (resultShip.result + (resultShip.total *
              useProfile.webConfig.service_charge_bfm) / 100) + resultShip.total }}</span>
          </div>

          <div v-else
            class="w-full bg-slate-50 rounded-xl h-40 flex flex-col items-center justify-center p-4 gap-4 uppercase">
            <receipt-icon class="w-12 h-12 fill-primary" />
            <span class="text-primary">please fill the inputs to make a request</span>
          </div>

          <button type="submit" class="btn btn-sm pixa-btn btn-primary">calculate shipping</button>

        </form>

        <form @submit.prevent="calculateShipement" v-else-if="tab === 'shipement'"
          class="w-full h-fit flex flex-col gap-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="form-control w-full md:col-span-3">
              <div class="label">
                <span class="label-text uppercase">weight <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.weight"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
            <commun-combobox class="mt-auto"
              :list="[{ id: 'lbs', designation: 'lbs' }, { id: 'kg', designation: 'kg' }]"
              :selected="shippement.weightUnit" @onSelectedItem="(id) => {
                shippement.weightUnit = id
              }" />
          </div>


          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">l <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.l"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">w <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.w"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">h <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.h"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>


            <commun-combobox class="mt-auto" :list="[{ id: 'in', designation: 'in' }, { id: 'cm', designation: 'cm' }]"
              :selected="shippement.lengthUnit" @onSelectedItem="(id) => {
                shippement.lengthUnit = id
              }" />
          </div>




          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">city <span class="text-red-500">*</span></span>
            </div>
            <commun-combobox class="mt-auto" :required="true" :list="useBook.cities" :selected="shippement.city"
              @onSelectedItem="(id) => {
                shippement.city = id
                shippement.cityCode = useBook.cities.find(item => item.id === id).code
              }" />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">insurance <span class="text-red-500">*</span></span>
            </div>
            <input type="number" required v-model="shippement.insurance"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <div v-if="resultShip.result"
            class="w-full h-fit bg-slate-50 rounded-xl my-6 grid grid-cols-2 p-4 gap-4 uppercase">
            <span>Chargeable Weight</span>
            <span>{{ resultShip.weight > resultShip.mass ? resultShip.weight + ' ' + resultShip.weightUnit :
              resultShip.mass.toFixed(2) + ' ≥ (' + resultShip.weight + ' ' +
              resultShip.weightUnit + ')' }}</span>
            <span>Shipping Cost</span>
            <span>${{ resultShip.result.toFixed(2) }}</span>
            <span class="font-semibold">Total Cost</span>
            <span class="font-semibold">${{ (resultShip.result + resultShip.insurance).toFixed(2) }}</span>
          </div>

          <div v-else
            class="w-full bg-slate-50 rounded-xl h-40 flex flex-col items-center justify-center p-4 gap-4 uppercase">
            <receipt-icon class="w-12 h-12 fill-primary" />
            <span class="text-primary">please fill the inputs to make a request</span>
          </div>

          <button type="submit" class="btn btn-sm pixa-btn btn-primary">calculate shipping</button>

        </form>


        <form @submit.prevent="calculateShipement" v-else class="w-full h-fit flex flex-col gap-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="form-control w-full md:col-span-3">
              <div class="label">
                <span class="label-text uppercase">weight <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.weight"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>
            <commun-combobox class="mt-auto"
              :list="[{ id: 'lbs', designation: 'lbs' }, { id: 'kg', designation: 'kg' }]"
              :selected="shippement.weightUnit" @onSelectedItem="(id) => {
                shippement.weightUnit = id
              }" />
          </div>


          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">l <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.l"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">w <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.w"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>

            <label class="form-control w-full">
              <div class="label">
                <span class="label-text uppercase">h <span class="text-red-500">*</span></span>
              </div>
              <input type="number" required v-model="shippement.h"
                class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
            </label>


            <commun-combobox class="mt-auto" :list="[{ id: 'in', designation: 'in' }, { id: 'cm', designation: 'cm' }]"
              :selected="shippement.lengthUnit" @onSelectedItem="(id) => {
                shippement.lengthUnit = id
              }" />
          </div>


          <label class="form-control w-full md:col-span-3">
            <div class="label">
              <span class="label-text uppercase">from <span class="text-red-500">*</span></span>
            </div>

            <commun-combobox-countries class="mt-auto" :required="true" :list="countries" :selected="shippement.from"
              @onSelectedItem="(id) => {
                shippement.from = id
              }" />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">city <span class="text-red-500">*</span></span>
            </div>
            <commun-combobox class="mt-auto" :required="true" :list="useBook.cities" :selected="shippement.city"
              @onSelectedItem="(id) => {
                shippement.city = id
                shippement.cityCode = useBook.cities.find(item => item.id === id).code
              }" />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">insurance <span class="text-red-500">*</span></span>
            </div>
            <input type="number" required v-model="shippement.insurance"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>

          <div v-if="resultShip.result"
            class="w-full h-fit bg-slate-50 rounded-xl my-6 grid grid-cols-2 p-4 gap-4 uppercase">
            <span>Chargeable Weight</span>
            <span>{{ resultShip.weight > resultShip.mass ? resultShip.weight + ' ' + resultShip.weightUnit :
              resultShip.mass.toFixed(2) + ' ≥ (' + resultShip.weight + ' ' +
              resultShip.weightUnit + ')' }}</span>
            <span>Shipping Cost</span>
            <span>${{ resultShip.result.toFixed(2) }}</span>
            <span class="font-semibold">Total Cost</span>
            <span class="font-semibold">${{ (resultShip.result + resultShip.insurance).toFixed(2) }}</span>

            <div @click="async () => {
              createCostume(shippement)
            }" :class="'bg-primary text-white'" class="w-full h-14 p-2 rounded flex items-center col-span-2 -mb-3">
              <div class="flex-1 flex flex-col">
                <span>dhl</span>
                <span>$ {{ numberFormat(resultShip.result) }}
                </span>
              </div>
              <div class="w-fit h-6 px-2 bg-white/40 rounded-full flex items-center justify-center">
                create now
              </div>
            </div>

            <div @click="async () => {
              createCostume(shippement)
            }" :class="'bg-primary text-white'" class="w-full h-14 p-2 rounded flex items-center col-span-2">
              <div class="flex-1 flex flex-col">
                <span>fedex</span>
                <span>$ {{ numberFormat(resultShip.result) }}
                </span>
              </div>
              <div class="w-fit h-6 px-2 bg-white/40 rounded-full flex items-center justify-center">
                create now
              </div>
            </div>

          </div>

          <div v-else
            class="w-full bg-slate-50 rounded-xl h-40 flex flex-col items-center justify-center p-4 gap-4 uppercase">
            <receipt-icon class="w-12 h-12 fill-primary" />
            <span class="text-primary">please fill the inputs to make a request</span>
          </div>

          <button type="submit" class="btn btn-sm pixa-btn btn-primary">calculate shipping</button>

        </form>
      </div>

    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import appsIcon from '@/assets/icons/appsIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import listIcon from '@/assets/icons/listIcon.vue';
import communComboboxCountries from './communComboboxCountries.vue';
import communCombobox from '../commun/communCombobox.vue';
import receiptIcon from '@/assets/icons/receiptIcon.vue';
import { reactive, ref, watch } from 'vue';
import { useBookStore } from '@/stores/addressBook';
import axios from 'axios';
import { objectToFormData } from '@/utils/formDataUtils'

import countries from '@/assets/countries.json'
import { useRoute, useRouter } from 'vue-router';

const useWidget = useWidgetStore()
const useBook = useBookStore()
const router = useRouter()
const shippement = reactive(
  {
    weight: 0,
    l: 0,
    w: 0,
    h: 0,
    weightUnit: 'kg',
    lengthUnit: 'cm',
    city: null,
    from: '',
    cityCode: null,
    insurance: 0,
    result: null,
    items: 0,
    itemPrice: 0,
    total: 0, website: ''
  }
)

const tab = ref('shipement')

const resultShip = reactive(
  {
    weight: 0,
    l: 0,
    w: 0,
    h: 0,
    weightUnit: 'kg',
    lengthUnit: 'cm',
    from: '',
    city: null,
    cityCode: null,
    insurance: 0,
    result: null, mass: null,
    items: 0,
    itemPrice: 0,
    total: 0, website: '', isBfm: false
  }
)

watch(() => [shippement.weightUnit, shippement.lengthUnit], () => {
  if (shippement.weightUnit === 'kg') {
    shippement.lengthUnit = 'cm'
  } else {
    shippement.lengthUnit = 'in'
  }
})

const calculateShipement = async () => {

  let mass = (shippement.l * shippement.w * shippement.h) / 139

  const response = await axios.get(`/calculator_API/${shippement.cityCode}/${shippement.weight > mass ? shippement.weight : mass.toFixed(0)}`)

  Object.assign(resultShip, shippement)

  resultShip.mass = mass
  resultShip.result = response.data.shipp_cost


}

const createCostume = async (shippement) => {
  try {
    let response = await axios.get(`/Shipments/create_ship_API/${shippement.weight}/${shippement.l}/${shippement.w}/${shippement.h}/${shippement.weightUnit}/${shippement.lengthUnit}/${localStorage.getItem('ws-user-id')}/`)
    closeModal()
    router.push({ name: 'costume-shippement', params: { id: response.data.result } })
  } catch (error) {
    console.error(error)

  }
}

const closeModal = () => {

  useWidget.calculator = false
  Object.assign(shippement, {
    weight: 0,
    l: 0,
    w: 0,
    h: 0,
    weightUnit: 'kg',
    lengthUnit: 'cm', from: '',
    city: null,
    cityCode: null,
    insurance: 0,
    result: null,
    items: 0,
    itemPrice: 0,
    total: 0, website: '', isBfm: false
  })
}
</script>

<style lang="scss" scoped></style>
