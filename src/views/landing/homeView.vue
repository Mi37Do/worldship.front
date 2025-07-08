<template>


  <div v-if="loading" class="w-full h-screen flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>

  <div v-else class="w-full flex flex-col overflow-x-hidden">
    <div id="home" class="w-full h-fit relative flex flex-col gap-4 items-center overflow-hidden">

      <div
        class="w-[60vw] h-[60vw] -top-[45vw] rounded-full blur-3xl bg-gradient-to-b from-secondary/20  from-80% absolute">
      </div>

      <div class="flex-1 flex flex-col justify-center items-center text-center pt-40 z-10 mt-20">
        <span class="text-[5vw] h-[5vw]">{{ useProfile.webConfig.titre_1 }} <span
            class="font-extrabold text-blue-700">{{ useProfile.webConfig.titre_2 }}</span> {{
              useProfile.webConfig.titre_3 }}
        </span>

        <span class="text-[5vw] h-[5vw] mt-4 mb-12">
          <span class="font-extrabold text-blue-700">{{ useProfile.webConfig.titre_4 }}</span>
          {{ useProfile.webConfig.titre_5 }}
          <span class="font-extrabold text-blue-700">{{ useProfile.webConfig.titre_6 }}</span>
        </span>

        <span class="lg:text-lg max-w-md px-4 lg:px-0 lg:max-w-xl mt-8 lg:mt-0">{{
          useProfile.webConfig.text_entet }}</span>


        <div class="max-w-[60vw] h-fit relative">


          <img src="@/assets/pics/box01.png" class="absolute w-32 lg:w-52 -top-0 -right-12 lg:-right-24 " alt="">



          <img src="@/assets/pics/plane.png" class="absolute w-60 -right-12 bottom-10 lg:-right-32" alt="">

          <div
            class="w-full max-w-[70vw] h-fit bg-slate-100 bg-glass-effect px-3 pt-3 relative shadow-2xl shadow-blue-200 my-28 grid  md:grid-cols-4 gap-4  font-semibold">

            <div class="flex flex-col items-center justify-center gap-2 my-6 min-w-48">
              <span class="text-3xl text-primary">232</span>
              <span>clients</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 my-6">
              <span class="text-3xl text-primary">521</span>
              <span>prjects</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 my-6">
              <span class="text-3xl text-primary">1453</span>
              <span>support</span>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 my-6">
              <span class="text-3xl text-primary">32</span>
              <span>workers</span>
            </div>

          </div>



          <img src="@/assets/pics/drop.png" class="absolute w-32 lg:w-96 -top-0 -left-12 lg:-top-20 lg:-left-48 z-0"
            alt="">


        </div>

      </div>


    </div>

    <div class="w-full h-40 bg-white">
      <div class="overflow-hidden relative">

        <div class="w-60 h-full absolute right-0 bg-gradient-to-l from-white to-transparent z-10">

        </div>



        <div class="w-60 h-full absolute left-0 bg-gradient-to-r from-white to-transparent z-10">

        </div>
        <div class="relative overflow-hidden flex gap-16 group py-8 logos">
          <div ref="slider" class="flex w-[fit-content] gap-16 logos-slide">
            <span v-for="item in useProfile.sponsors" :key="item.id"
              class="w-32 h-32  shrink-0 flex items-center justify-center object-contain px-6"
              style="aspect-ratio : 3/2">
              <img :src="env + item.image" alt="">
            </span>
          </div>
          <div ref="slider" class="flex w-[fit-content] gap-16 logos-slide">
            <span v-for="item in logos" :key="item.id"
              class="w-32 h-32  shrink-0 flex items-center justify-center object-contain px-6"
              style="aspect-ratio : 3/2">
              <img :src="env + item.image" alt="">
            </span>
          </div>
        </div>

      </div>
    </div>

    <div id="about" class="w-full py-24 flex flex-col gap-12 justify-center items-center px-6">
      <div class="w-full h-fit max-w-screen-xl grid lg:grid-cols-2 gap-16 lg:gap-3">

        <div class="w-[60vw] h-[60vw] lg:w-96 xl:h-96 mx-auto relative my-auto">

          <div class="w-full h-full absolute bg-gradient-to-br from-secondary to-blue-700 blur-2xl z-0">
          </div>

          <div class="w-full h-full  overflow-hidden z-10 absolute inset-0">
            <img src="@/assets/pics/ship.jpg" class="w-full h-full object-cover  rounded-2xl" alt="">
          </div>



          <div
            class="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-secondary to-blue-700 absolute rounded-2xl -top-6 -right-16 rotate-12 shadow-xl flex items-center justify-center z-10">
            <parcel-icon class="w-16 h-16 fill-white" />
          </div>

          <div
            class="w-16 h-16 md:w-24  md:h-24 small-bg-glass-effect absolute rounded-2xl -top-6 -left-16 -rotate-12 shadow-xl flex items-center justify-center z-10">
            <creditCardIcon class="w-12 h-12 fill-blue-700" />
          </div>



          <div
            class="w-16 h-16 md:w-24 md:h-24 small-bg-glass-effect absolute rounded-2xl -bottom-6 -right-2 -rotate-45 shadow-xl flex items-center justify-center z-10">
            <CartIcon class="w-12 h-12 fill-blue-700" />
          </div>

        </div>


        <div class="w-full h-fit flex flex-col gap-4 my-auto">
          <span class="text-4xl font-bold text-primary">about worldship</span>
          <span>{{ useWidget.userLanguage === 'en' ? useProfile.webConfig.about.disc :
            useProfile.webConfig.about.disc_ar }}</span>


          <div v-for="item in useProfile.webConfig.about.details" :key="item" class="w-full flex flex-col gap-2">
            <div class="w-8 h-8 my-4 flex items-center justify-center">
              <img :src="env + item.image">
            </div>
            <span class="pixa-title">{{ useWidget.userLanguage === 'en' ? item.name :
              item.name_ar }}</span>
            <span>{{ useWidget.userLanguage === 'en' ? item.disc :
              item.disc_arb }}</span>
          </div>
        </div>
      </div>


      <div id="services" class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">Our services</span>

        <div class="w-full flex flex-wrap gap-x-10 gap-y-20 justify-center">
          <div v-for="item in useProfile.services" :key="item.id" class="w-96 h-fit flex flex-col gap-3">
            <div class="w-12 h-12 overflow-hidden">
              <img :src="env + item.image" class="w-full object-cover mb-2">
            </div>
            <span class="pixa-title">{{ useWidget.userLanguage === 'en' ? item.name :
              item.name_ar }}</span>
            <span>{{ useWidget.userLanguage === 'en' ? item.disc :
              item.disc_ar }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-96 overflow-hidden flex items-center relative">
      <div class="w-full h-full bg-blue-600/70 absolute inset-0 flex justify-center">
        <div class="w-full h-full max-w-[600px] px-6 flex flex-col text-white gap-6 items-center justify-center">
          <span class="text-4xl font-bold text-center"> {{ useProfile.webConfig.titre_ready_start }}</span>
          <span class=" text-center"> {{ useProfile.webConfig.text_ready_start }}</span>
        </div>
      </div>
      <img src="@/assets/pics/ship01.jpg" class="w-full object-cover" alt="">
    </div>


    <div class="w-full py-24 flex flex-col gap-12 justify-center items-center px-6">



      <div id="pricing" class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">Pricing</span>

        <div class="w-full max-w-2xl flex flex-col gap-12">
          <span class="text-center">
            We are ready to assist you with shopping online. If you have any questions before getting started, please
            feel free to contact us. </span>

          <div class="w-full h-fit small-bg-glass-effect flex flex-col gap-4 p-4">

            <span class="pixa-title text-center text-xl">Quickly Calculate & Ship</span>

            <!--
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

              }"
                :class="tab === 'shipement' ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-white/20 text-white'"
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

            </div>

 -->
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


                <commun-combobox class="mt-auto"
                  :list="[{ id: 'in', designation: 'in' }, { id: 'cm', designation: 'cm' }]"
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
                  <commun-switch class="my-auto" />

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

            <form @submit.prevent="calculateShipement" v-if="tab === 'shipement'"
              class="w-full h-fit flex flex-col gap-4">
              <!--
              <label class="form-control w-full md:col-span-3">
                <div class="label">
                  <span class="label-text uppercase">type <span class="text-red-500">*</span></span>
                </div>

                <commun-combobox class="mt-auto" :required="true" :list="[
                  { id: 'exprec', designation: 'express' },
                  { id: 'cargo', designation: 'cargo' },
                  { id: 'occain', designation: 'ocean ' }
                ]" :selected="shippement.type" @onSelectedItem="(id) => {
                  shippement.type = id
                  shippement.cityCode = useProfile.countries.find(item => item.designation.toUpperCase() === 'IRAK').id
                }" />
              </label>
-->
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">shipping from <span class="text-red-500">*</span></span>
                </div>


                <input disabled :placeholder="useProfile.address_site.find(item => item.use_defaulte).name"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4">

              </label>

              <div class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">deliver to <span class="text-red-500">*</span></span>
                </div>
                <input v-if="shippement.type === 'cargo'" disabled placeholder="IRAK"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4">

                <commun-combobox v-else class="mt-auto" :required="true" :list="useProfile.countries"
                  :selected="shippement.city" @onSelectedItem="(id) => {
                    shippement.city = id
                    shippement.cityCode = id
                  }" />
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label class="form-control w-full md:col-span-3">
                  <div class="label">
                    <span class="label-text uppercase">weight <span class="text-red-500">*</span></span>
                  </div>
                  <input type="number" required v-model="shippement.weight"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>
                <commun-dropdown class="mt-auto"
                  :list="[{ id: 'lbs', designation: 'lbs' }, { id: 'kg', designation: 'kg' }]"
                  :selected="shippement.weightUnit" @onSelectedItem="(id) => {
                    if (id === 'kg') {
                      shippement.lengthUnit = 'cm'
                    } else {
                      shippement.lengthUnit = 'in'
                    }
                    shippement.weightUnit = id
                  }" />
              </div>



              <div v-if="showSize" class="w-full h-40 flex items-center justify-center uppercase">
                <span @click="showSize = false" class="w-72 text-center cursor-pointer">If the total of your package's
                  length, width, and height exceeds 72 inches, please click here to enter the dimensions.</span>
              </div>

              <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label class="form-control
             flex-col gap-2">
                  <div class="label">
                    <span class="label-text uppercase">l</span>
                  </div>
                  <input type="number" v-model="shippement.l"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>

                <label class="form-control w-full mt-auto">
                  <div class="label">
                    <span class="label-text uppercase">w</span>
                  </div>
                  <input type="number" v-model="shippement.w"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>

                <label class="form-control w-full mt-auto">
                  <div class="label">
                    <span class="label-text uppercase">h</span>
                  </div>
                  <input type="number" v-model="shippement.h"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>


                <commun-dropdown class="mt-auto"
                  :list="[{ id: 'in', designation: 'in' }, { id: 'cm', designation: 'cm' }]"
                  :selected="shippement.lengthUnit" @onSelectedItem="(id) => {
                    if (id === 'cm') {
                      shippement.weightUnit = 'kg'
                    } else {
                      shippement.weightUnit = 'lbs'
                    }
                    shippement.lengthUnit = id
                  }" />
              </div>




              <!--
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">insurance <span class="text-red-500">*</span></span>
            </div>
            <input type="number" required v-model="shippement.insurance"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>
 -->

              <div v-if="resultShip.result"
                class="w-full h-fit bg-slate-50 rounded-xl my-6 grid grid-cols-2 p-4 gap-4 uppercase">
                <span>Chargeable Weight</span>
                <span>{{ resultShip.weight > resultShip.mass ? resultShip.weight + ' ' + resultShip.weightUnit :
                  resultShip.mass.toFixed(2) + ' ≥ (' + resultShip.weight + ' ' +
                  resultShip.weightUnit + ')' }}</span>

                <div v-if="resultShip.result.shipp_cost > 0" :class="'bg-primary text-white'"
                  class="w-full h-14 p-2 rounded flex justify-between  gap-4 items-center col-span-2 -mb-3">
                  <span>DHL</span>
                  <span>${{ (resultShip.result.dhl +
                    resultShip.insurance).toFixed(2) }}</span>
                </div>

                <div v-if="shippement.type === 'exprec'" :class="'bg-primary text-white'"
                  class="w-full h-14 p-2 rounded flex justify-between  gap-4 items-center col-span-2 -mb-3">
                  <span class="flex gap-3 items-center"><img src="@/assets/pics/dhl-1.svg" alt="" class="w-10 mx-1">
                    DHL</span>
                  <span>${{ (resultShip.result.fedex +
                    resultShip.insurance).toFixed(2) }}</span>
                </div>

                <div v-if="shippement.type === 'exprec'" :class="'bg-primary text-white'"
                  class="w-full h-14 p-2 rounded flex justify-between  gap-4 items-center col-span-2 -mb-3">
                  <span class="flex gap-3 items-center">
                    <div class="bg-white h-8 w-12 flex items-center justify-center">
                      <img src="@/assets/pics/fedex-express-6.svg" alt="" class="w-10">
                    </div>
                    fedex
                  </span>
                  <span>${{ (resultShip.result.fedex +
                    resultShip.insurance).toFixed(2) }}</span>
                </div>

                <div v-if="shippement.type === 'cargo'" :class="'bg-primary text-white'"
                  class="w-full h-14 p-2 rounded flex justify-between gap-4 items-center col-span-2 -mb-3">
                  <span class="flex gap-3 items-center">
                    <parcel-icon class="w-6 fill-white" />
                    cargo</span>
                  <span>${{ (resultShip.result.cargo +
                    resultShip.insurance).toFixed(2) }}</span>
                </div>

                <div v-if="shippement.type === 'occain'" :class="'bg-primary text-white'"
                  class="w-full h-14 p-2 rounded flex gap-4 items-center col-span-2 -mb-3 justify-between ">
                  <span class="flex gap-3 items-center">
                    <ship-icon class="w-6 fill-white" />
                    ocean</span>
                  <span>cbm ${{ (resultShip.result.occain +
                    resultShip.insurance).toFixed(2) }}</span>
                </div>


              </div>

              <div v-else
                class="w-full bg-slate-50 rounded-xl h-40 flex flex-col items-center justify-center p-4 gap-4 uppercase">
                <receipt-icon class="w-12 h-12 fill-primary" />
                <span class="text-primary">please fill the inputs to make a request</span>
              </div>

              <button type="submit" class="btn btn-sm pixa-btn btn-primary">calculate shipping</button>

            </form>


            <form @submit.prevent="calculateCostume" v-else class="w-full h-fit flex flex-col gap-4">
              <!--
              <label class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">type <span class="text-red-500">*</span></span>
                </div>
                <input disabled placeholder="EXPRESS"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4">
              </label>-->

              <label class="form-control w-full md:col-span-3 relative">
                <div class="label">
                  <span class="label-text uppercase">shipping from <span class="text-red-500">*</span></span>
                </div>

                <commun-combobox-countries class="mt-auto" :required="true"
                  :list="countries.filter(item => item.id === 'US')" :selected="shippement.from" @onSelectedItem="(id) => {
                    shippement.from = id
                  }" />
              </label>





              <div class="form-control w-full">
                <div class="label">
                  <span class="label-text uppercase">deliver to <span class="text-red-500">*</span></span>
                </div>
                <input v-if="shippement.type === 'cargo'" disabled placeholder="IRAK"
                  class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4">

                <commun-combobox v-else class="mt-auto" :required="true" :list="useProfile.countries"
                  :selected="shippement.city" @onSelectedItem="(id) => {
                    shippement.city = id
                    shippement.cityCode = id
                  }" />
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label class="form-control w-full md:col-span-3">
                  <div class="label">
                    <span class="label-text uppercase">weight <span class="text-red-500">*</span></span>
                  </div>
                  <input type="number" required v-model="shippement.weight"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>
                <commun-dropdown class="mt-auto"
                  :list="[{ id: 'lbs', designation: 'lbs' }, { id: 'kg', designation: 'kg' }]"
                  :selected="shippement.weightUnit" @onSelectedItem="(id) => {
                    if (id === 'kg') {
                      shippement.lengthUnit = 'cm'
                    } else {
                      shippement.lengthUnit = 'in'
                    }
                    shippement.weightUnit = id
                  }" />
              </div>

              <div v-if="showSize" class="w-full h-40 flex items-center justify-center uppercase">
                <span @click="showSize = false" class="w-72 text-center cursor-pointer">If the total of your package's
                  length, width, and height exceeds 72 inches, please click here to enter the dimensions.</span>
              </div>

              <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label class="form-control w-full flex items-center justify-center flex-col gap-2">
                  <div class="label">
                    <span class="label-text uppercase">l</span>
                  </div>
                  <input type="number" v-model="shippement.l"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>

                <label class="form-control w-full mt-auto">
                  <div class="label">
                    <span class="label-text uppercase">w</span>
                  </div>
                  <input type="number" v-model="shippement.w"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>

                <label class="form-control w-full mt-auto">
                  <div class="label">
                    <span class="label-text uppercase">h</span>
                  </div>
                  <input type="number" v-model="shippement.h"
                    class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
                </label>


                <commun-dropdown class="mt-auto"
                  :list="[{ id: 'in', designation: 'in' }, { id: 'cm', designation: 'cm' }]"
                  :selected="shippement.lengthUnit" @onSelectedItem="(id) => {
                    if (id === 'cm') {
                      shippement.weightUnit = 'kg'
                    } else {
                      shippement.weightUnit = 'lbs'
                    }
                    shippement.lengthUnit = id
                  }" />
              </div>


              <!--

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text uppercase">insurance <span class="text-red-500">*</span></span>
            </div>
            <input type="number" required v-model="shippement.insurance"
              class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          </label>-->
              <div v-if="resultShip.result"
                class="w-full h-fit bg-slate-50 rounded-xl my-6 grid grid-cols-2 p-4 gap-4 uppercase">

                <!--
            <span class="font-semibold">Total Cost</span>
            <span class="font-semibold">${{ (resultShip.result.dhl + resultShip.insurance).toFixed(2) }}</span> -->


                <div @click="async () => {
                  createCostume(shippement)
                }" :class="'bg-primary text-white'" class="w-full h-14 p-2 rounded flex items-center col-span-2 -mb-3">
                  <div class="flex-1 flex gap-4">
                    <span class="flex gap-3 items-center"><img src="@/assets/pics/ups.png" alt="" class="w-10 mx-1">
                    </span>
                    <div class="flex flex-col my-auto">
                      <span>ups</span><span class="text-xs">4 - 6 business days
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span>$ {{ numberFormat(resultShip.result.dhl + resultShip.insurance) }}</span>
                    <div class="w-fit h-6 px-2 bg-white/40 rounded-full flex items-center justify-center">
                      ship now
                    </div>
                  </div>

                </div>

                <div @click="async () => {
                  createCostume(shippement)
                }" :class="'bg-primary text-white'" class="w-full h-14 p-2 rounded flex items-center col-span-2 -mb-3">

                  <div class="flex-1 flex gap-4">
                    <div class="bg-white h-8 w-12 flex items-center justify-center">
                      <img src="@/assets/pics/fedex-express-6.svg" alt="" class="w-10">
                    </div>
                    <div class="flex flex-col my-auto">
                      <span>fedex</span><span class="text-xs">4 - 6 business days
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span>$ {{ numberFormat(resultShip.result.dhl + resultShip.insurance) }}</span>
                    <div class="w-fit h-6 px-2 bg-white/40 rounded-full flex items-center justify-center">
                      ship now
                    </div>
                  </div>
                </div>
                <!--
            <div @click="async () => {
              createCostume(shippement)
            }" :class="'bg-primary text-white'" class="w-full h-14 p-2 rounded flex items-center col-span-2">
              <div class="flex-1 flex flex-col">
                <span>fedex</span>
                <span>$ {{ numberFormat(resultShip.result) }}
                </span>
              </div>
              <div class="w-fit h-6 px-2 bg-white/40 rounded-full flex items-center justify-center">
                ship now
              </div>
            </div> -->

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
      <!--
      <div class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">payment types</span>

        <div class="w-full max-w-2xl flex">
          <span class="text-center">
            To use Boombeene, you must have money in your account balance. To load your account balance, you can come to
            any of our locations to pay by cash or you can use Nass Wallet and Zain Cash.</span>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          <div class="w-80 h-80 bg-slate-200"></div>
          <div class="w-80 h-80 bg-slate-200"></div>
          <div class="w-80 h-80 bg-slate-200"></div>
        </div>

      </div>
 -->
      <div class="w-full py-24 flex flex-col max-w-screen-xl justify-center items-center gap-12 px-6">
        <span class="text-4xl font-bold text-primary">{{ useProfile.webConfig.titre_prohibited }}</span>

        <div class="w-full max-w-screen-xl flex flex-col items-center gap-12 px-8">
          <span class="text-center max-w-2xl">
            {{ useProfile.webConfig.text_prohibited }} </span>

          <div class="w-full h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 p-4">
            <div v-for="item in useProfile.prohibItems" :key="item"
              class="w-full flex flex-col items-center text-center gap-6 font-medium">
              <img :src="env + item.image" class="w-24" alt="">
              <span class="text-md">{{ useWidget.userLanguage === 'en' ? item.disc :
                item.disc_ar }}</span>
            </div>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import parcelIcon from '@/assets/icons/parcelIcon.vue';
import creditCardIcon from '@/assets/icons/creditCardIcon.vue';
import CartIcon from '@/assets/icons/cartIcon.vue';
import communCombobox from '@/components/commun/communCombobox.vue';
import communSwitch from '@/components/commun/communSwitch.vue';
import { useBookStore } from '@/stores/addressBook';
import { useProfileStore } from '@/stores/profile';
import { useWidgetStore } from '@/stores/widget';
import receiptIcon from '@/assets/icons/receiptIcon.vue';
import { useI18n } from 'vue-i18n';
import communComboboxCountries from '@/components/commun/communComboboxCountries.vue';
import communDropdown from '@/components/commun/communDropdown.vue';
import axios from 'axios';

import shipIcon from '@/assets/icons/shipIcon.vue';
import countries from '@/assets/countries.json'
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const offset = ref(0);
const speed = ref(1);
const isHovered = ref(false);
const useBook = useBookStore()
const useProfile = useProfileStore()
const useWidget = useWidgetStore()
const showSize = ref(true)
const slider = ref(null);

const shippement = reactive(
  {
    weight: 0,
    l: 0,
    w: 0,
    h: 0,
    weightUnit: 'kg',
    lengthUnit: 'cm',
    city: null,
    from: 'US',
    cityCode: null,
    insurance: 0,
    result: null,
    items: 0,
    itemPrice: 0,
    total: 0, website: '', type: 'exprec'
  }
)

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

const router = useRouter()

const { t } = useI18n()

const env = import.meta.env.VITE_WORLDSHIP_API

const loading = ref(true)

const tab = ref('costume')

const logos = ref(
  [
    {
      id: 1,
      logo: new URL('@/assets/pics/zara.svg', import.meta.url).href
    }, {
      id: 2,
      logo: new URL('@/assets/pics/adidas.svg', import.meta.url).href
    }, {
      id: 3,
      logo: new URL('@/assets/pics/lacoste.svg', import.meta.url).href
    }, {
      id: 4,
      logo: new URL('@/assets/pics/walmart.svg', import.meta.url).href
    }, {
      id: 5,
      logo: new URL('@/assets/pics/apple.svg', import.meta.url).href
    }, {
      id: 6,
      logo: new URL('@/assets/pics/asus.svg', import.meta.url).href
    }, {
      id: 7,
      logo: new URL('@/assets/pics/best.svg', import.meta.url).href
    }, {
      id: 8,
      logo: new URL('@/assets/pics/blackberry.svg', import.meta.url).href
    }, {
      id: 9,
      logo: new URL('@/assets/pics/amazon.svg', import.meta.url).href
    }, {
      id: 10,
      logo: new URL('@/assets/pics/sony.svg', import.meta.url).href
    }, {
      id: 11,
      logo: new URL('@/assets/pics/ray.svg', import.meta.url).href
    }, {
      id: 12,
      logo: new URL('@/assets/pics/north.svg', import.meta.url).href
    }, {
      id: 13,
      logo: new URL('@/assets/pics/levis.svg', import.meta.url).href
    }, {
      id: 14,
      logo: new URL('@/assets/pics/ey.svg', import.meta.url).href
    }, {
      id: 15,
      logo: new URL('@/assets/pics/guinness.svg', import.meta.url).href
    }, {
      id: 16,
      logo: new URL('@/assets/pics/ebay.svg', import.meta.url).href
    }, {
      id: 17,
      logo: new URL('@/assets/pics/chanel.svg', import.meta.url).href
    },
  ]
)


// Animation logic
let animationFrame;

const animate = () => {
  if (!isHovered.value) {
    offset.value -= 0.02 * speed.value;

    // Reset offset when halfway through
    if (offset.value <= -50) {
      offset.value = 0;
    }
  }
  animationFrame = requestAnimationFrame(animate);
};

onMounted(async () => {

  try {

    await useBook.getAddresses(1)

    loading.value = false
  } catch (error) {
    console.error(error)

  }


  animate();
});

const calculateShipement = async () => {

  let mass = (shippement.l * shippement.w * shippement.h) / 139
  let response = await axios.get(`/calculator_API/${shippement.cityCode}/${shippement.weight > mass ? shippement.weight : mass.toFixed(0)}`)
  Object.assign(resultShip, shippement)
  resultShip.result = response.data

  resultShip.mass = mass

}

const calculateCostume = async () => {

  let mass = (shippement.l * shippement.w * shippement.h) / shippement.type === 'occain' ? 64000 : 139
  let response = await axios.get(`/calculator_shp_API/${shippement.from}/${shippement.cityCode}/${shippement.weight > mass ? shippement.weight : mass.toFixed(0)}`)

  Object.assign(resultShip, shippement)
  resultShip.result = response.data

  resultShip.mass = mass

}

const createCostume = async (shippement) => {
  try {

    if (Cookies.get('token')) {
      router.push({ name: 'login' })
    } else {
      let response = await axios.get(`/Shipments/create_ship_API/${shippement.weight}/${shippement.l}/${shippement.w}/${shippement.h}/${shippement.weightUnit}/${shippement.lengthUnit}/${localStorage.getItem('ws-user-id')}/`)
      router.push({ name: 'costume-shippements' })
    }


  } catch (error) {
    console.error(error)

  }
}

// Cleanup animation frame
onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame);
});
</script>

<style lang="scss" scoped>
/* Smooth transition for hover effect */


@keyframes slide {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}

.logos-slide {
  animation: 25s slide infinite linear;
}

.logos:before {
  left: 0;
  background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
}

.logos:after {
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
}

.logos:hover .logos-slide {
  animation-play-state: paused;
}
</style>
