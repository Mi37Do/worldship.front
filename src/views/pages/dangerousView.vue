<!-- <template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
          <side-menu />
        </button>
        <span class="pixa-title flex-1">{{ $t('navigation.links.dangerous') }}</span>
      </template>
    </top-app-bar>

    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 py-4 flex flex-col gap-4 overflow-hidden">

      <ship-selected-items-modal :list="useInbox.inboxsToShip" />
      <date-filter-modal @filterItems="onFilterItems" />

      <div
        class="w-full lg:h-10 h-fit flex flex-col-reverse lg:flex-row gap-2 items-end lg:items-center lg:justify-between">
        <div class="flex gap-3 items-center flex-1 w-full">
          <commun-input-search @searchQuery="searchQuery" class="w-fit  lg:w-96" />
        </div>
        <div class="flex gap-2">
          <commun-list-box :list="datesFilter" :selected="selectedType" @onSelectedItem="async (id) => {

          }" />
          <button :disabled="useInbox.inboxsToShip.length < 1" @click="useWidget.ship = true"
            class="btn btn-sm pixa-btn pixa-btn-nofloat">
            <plan-icon class="w-5 h-5" />
            {{ $t('commun.selectedShip') }}</button>
        </div>
      </div>


      <div v-if="useInbox.inboxs.length > 0" class="w-full flex-1  flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right ' : ' ']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-6 gap-2 uppercase font-bold text-primary bg-white">

          <span class="h-8 my-auto flex items-center truncate gap-4"> <input type="checkbox" v-model="selectAll"
              :checked="selectAll"> </span>
          <span class="h-8  my-auto flex items-center gap-4">
            <span> {{ $t('commun.code') }}</span>
          </span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.name') }}</span>
          <span class="h-8  my-auto flex items-center ">{{ $t('commun.qty') }}</span>
          <span class="h-8  my-auto flex items-center ">{{ $t('commun.price') }}</span>

          <span class="h-8  my-auto flex flex-col justify-center ">{{ $t('commun.company_cost') }} <span
              class="text-[0.6rem]">({{
                $t('commun.price_cost')
              }})</span> </span>

        </div>

        <div class="w-full flex-1 overflow-auto">
          <div class="w-full h-fit  flex flex-col gap-2 pt-2">

            <itemData v-for="item in dgs" :key="item.id" :item="item">
              <template #checkboxSelect>
                <input type="checkbox" :checked="useInbox.inboxsToShip.find(i => i.id === item.id)"
                  v-model="item.selected_to_ship" @change="onSelectedEnabled(item)" name="" id=""
                  class="rounded checked:bg-primary checkbox-xs hidden lg:block">
              </template>
            </itemData>
          </div>
        </div>
      </div>

      <div v-else class="w-full flex-1 flex items-center justify-center">
        <img src="@/assets/pics/noData.svg" class="w-80" alt="">
      </div>

    </div>

  </div>
</template>

<script setup>
import planIcon from '@/assets/icons/planIcon.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import itemData from '@/components/dg/itemData.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import shipSelectedItemsModal from '@/components/inbox/shipSelectedItemsModal.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import addNoteModal from '@/components/inbox/addNoteModal.vue';
import returnModal from '@/components/inbox/returnModal.vue';
import itemsModal from '@/components/shippement/itemsModal.vue';
import supportTicketModal from '@/components/commun/supportTicketModal.vue';
import axios from 'axios';
import { objectToFormData } from '@/utils/formDataUtils'
import communInputSearch from '@/components/commun/communInputSearch.vue';

import arrowIcon from '@/assets/icons/arrowIcon.vue';
import calendarIcon from '@/assets/icons/calendarIcon.vue';
import dateFilterModal from '@/components/commun/dateFilterModal.vue';
import { format, isAfter, isBefore } from 'date-fns';
import sideMenu from '@/assets/icons/sideMenu.vue';
import communListBox from '@/components/commun/communListBox.vue';


const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
const inboxsToShip = ref([])
const enabled = ref(false)

const dgs = ref([])
const dgsFiltred = ref([])
const selectAll = ref(false)

const filterDate = reactive(
  {
    from: null,
    to: null
  }
)

const selectedType = ref('all')
const datesFilter = ref(
  [
    {
      id: 'all',
      designation: 'all',
      designation_ar: 'الكل'
    }, {
      id: '10',
      designation: '10',
      designation_ar: '10'
    }, {
      id: '15',
      designation: '15',
      designation_ar: '15 '
    }, {
      id: '30',
      designation: '30',
      designation_ar: '30 '
    },
  ]
)

onMounted(async () => {
  try {
    useInbox.inboxsToShip = []
    await useInbox.getInbox(localStorage.getItem('ws-user-id'))
    let response = await axios.get(`/Warehouse/DgItemsAll/${localStorage.getItem('ws-user-id')}/`)
    dgs.value = response.data
    dgsFiltred.value = response.data


    useInbox.filtredInboxs = useInbox.inboxs



    useInbox.inboxs.map(item => ({
      ...item,
      selected_to_ship: false
    }))

    loading.value = false
  } catch (error) {
    loading.value = true
  }
})

const onSelectedEnabled = (item) => {
  if (item.selected_to_ship) {
    useInbox.inboxsToShip.push(item)
  } else {
    useInbox.inboxsToShip = useInbox.inboxsToShip.filter(i => i !== item)
  }
}

watch(() => [selectAll.value], () => {
  useInbox.inboxsToShip = []
  if (selectAll.value) {
    for (let index = 0; index < useInbox.filtredInboxs.length; index++) {
      useInbox.filtredInboxs[index].selected_to_ship = true
    }
    useInbox.inboxsToShip = useInbox.filtredInboxs
  } else {
    for (let index = 0; index < useInbox.filtredInboxs.length; index++) {
      useInbox.filtredInboxs[index].selected_to_ship = false
    }
    useInbox.inboxsToShip = []
  }
})

const onSupportEmits = async (item) => {

  let formData = new FormData()

  formData.append('support_return', item.support_return)
  formData.append('name', item.name)
  formData.append('message_msg', item.message_msg)
  formData.append('upload_msg', item.upload_msg)

  try {
    let response = await axios.post(`/Dashboard/return_box_API/${localStorage.getItem('ws-user-id')}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  } catch (error) {
    console.error(error)
  }
}


const searchQuery = (query) => {
  if (query) {
    useInbox.filtredInboxs = useInbox.inboxs.filter(item => item.code.includes(query) || item.no_tracking.toLowerCase().includes(query.toLowerCase()))
  } else {
    useInbox.filtredInboxs = useInbox.inboxs
  }
}


const onFilterItems = (item) => {
  if (item.to) {
    Object.assign(filterDate, item)
    useInbox.filtredInboxs = useInbox.inboxs.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    useWidget.dateFilter = false
  } else {
    Object.assign(filterDate, {
      from: null,
      to: null
    })
    useInbox.filtredInboxs = useInbox.inboxs
    useWidget.dateFilter = false
  }
}
</script>

<style lang="scss" scoped></style>
 -->

<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
          <side-menu />
        </button>
        <span class="pixa-title flex-1">dg</span>
      </template>
    </top-app-bar>

    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 py-4 flex flex-col gap-4 overflow-hidden">

      <ship-selected-items-modal :list="useInbox.inboxsToShip" />
      <add-note-modal :item="useInbox.focusedInbox"></add-note-modal>
      <return-modal :item="useInbox.focusedInbox" />
      <items-modal />
      <support-ticket-modal @supportEmits="onSupportEmits" />
      <date-filter-modal @filterItems="onFilterItems" />

      <div
        class="w-full lg:h-10 h-fit flex flex-col-reverse lg:flex-row gap-2 items-end lg:items-center lg:justify-between">
        <div class="flex gap-3 items-center flex-1 w-full">
          <commun-input-search @searchQuery="searchQuery" class="w-fit  lg:w-96" />
        </div>
        <div class="flex gap-2">

          <div
            class="hidden lg:grid grid-cols-3 gap-2 bg-white shadow-2xl shadow-primary/5 border border-slate-200 rounded uppercase">
            <div class="w-fit flex gap-2 my-auto px-3 ">
              <span class="font-medium">{{ $t('commun.packages') }} :</span>
              <span>{{ useInbox.inboxsToShip.length }} </span>
            </div>

            <div class="w-fit flex gap-2 my-auto px-3 border-x border-slate-200">
              <span class="font-medium">{{ $t('commun.weight') }} :</span>
              <span>{{computed(() => {
                return useInbox.inboxsToShip.reduce((sum, item) => sum + item.weight, 0)
              })}} lbs</span>
            </div>

            <div class="w-fit flex gap-2 my-auto px-3 ">
              <span class="font-medium">{{ $t('commun.price') }} :</span>
              <span>$ {{computed(() => {
                return useInbox.inboxsToShip.reduce((sum, item) => sum + item.total_price, 0)
              })}} </span>
            </div>
          </div>
          <button @click="useWidget.dateFilter = true" class="btn btn-sm pixa-btn pixa-btn-nofloat flex gap-2">
            <calendar-icon class="w-5 h-5" />
            <span>from {{ filterDate.from ? format(filterDate.from, 'dd-MM-yyyy') : '-- -- ----' }}</span>
            <arrow-icon class="w-5 h-5 rotate-90 mx-2" />
            <span>to {{ filterDate.to ? format(filterDate.to, 'dd-MM-yyyy') : '-- -- ----' }}</span>
          </button>

          <button :disabled="useInbox.inboxsToShip.length < 1" @click="useWidget.ship = true"
            class="btn btn-sm pixa-btn pixa-btn-nofloat">
            <plan-icon class="w-5 h-5" />
            {{ $t('commun.selectedShip') }}</button>
        </div>
      </div>


      <div
        class="lg:hidden h-10 grid grid-cols-3 gap-2 bg-white shadow-2xl shadow-primary/5 border border-slate-200 rounded uppercase">
        <div class="w-full flex gap-2 my-auto px-3">
          <span class="font-medium">{{ $t('commun.packages') }}:</span>
          <span>{{ useInbox.inboxsToShip.length }}</span>
        </div>

        <div class="w-full flex gap-2 my-auto px-3  border-x border-slate-200">
          <span class="font-medium">{{ $t('commun.weight') }} :</span>
          <span>{{computed(() => {
            return useInbox.inboxsToShip.reduce((sum, item) => sum + item.weight, 0)
          })}} lbs</span>
        </div>

        <div class="w-full flex gap-2 my-auto px-3 ">
          <span class="font-medium">{{ $t('commun.price') }} :</span>
          <span>{{computed(() => {
            return useInbox.inboxsToShip.reduce((sum, item) => sum + item.total_price, 0)
          })}} $</span>
        </div>
      </div>

      <div v-if="useInbox.inboxs.length > 0" class="w-full flex-1  flex flex-col overflow-hidden relative">
        <!--
        <div
          class="w-fit h-10 bg-white rounded-lg border text-red-500 border-red-500 px-3 flex items-center absolute bottom-1 right-1 uppercase z-10">
          {{ useProfile.webConfig.info_inbox }}
        </div> -->


        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right ' : ' ']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-6 gap-2 uppercase font-bold text-primary bg-white">

          <span class="h-8 my-auto flex items-center truncate gap-4"> <input type="checkbox" v-model="selectAll"
              :checked="selectAll"> {{
                $t('commun.created') }}</span>
          <span class="h-8  my-auto flex items-center gap-4">
            <span> {{ $t('commun.code') }}</span>
          </span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.tracking') }}</span>
          <span class="h-8  my-auto flex items-center ">{{ $t('commun.weight') }}</span>
          <div class="flex items-center justify-between my-auto">

            <span class="h-8  my-auto flex items-center ">{{ $t('commun.price') }}</span>

          </div>

          <span class="h-8  my-auto flex items-center ">{{ $t('commun.status') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto">
          <div class="w-full h-fit  flex flex-col gap-2 pt-2">
            <!--  -->
            <itemData v-for="item in useInbox.filtredInboxs" :key="item.id" :item="item">
              <template #checkboxSelect>
                <input type="checkbox" :disabled="!item.total_price"
                  :checked="useInbox.inboxsToShip.find(i => i.id === item.id)" v-model="item.selected_to_ship"
                  @change="onSelectedEnabled(item)" name="" id=""
                  class="rounded checked:bg-primary checkbox-xs hidden lg:block">
              </template>
            </itemData>

            <!--       -->
          </div>
        </div>
      </div>

      <div v-else class="w-full flex-1 flex items-center justify-center">
        <img src="@/assets/pics/noData.svg" class="w-80" alt="">
      </div>

    </div>

  </div>
</template>

<script setup>
import planIcon from '@/assets/icons/planIcon.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import itemData from '@/components/inbox/itemData.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import shipSelectedItemsModal from '@/components/inbox/shipSelectedItemsModal.vue';
import { computed, onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import addNoteModal from '@/components/inbox/addNoteModal.vue';
import returnModal from '@/components/inbox/returnModal.vue';
import itemsModal from '@/components/shippement/itemsModal.vue';
import supportTicketModal from '@/components/commun/supportTicketModal.vue';
import axios from 'axios';
import { objectToFormData } from '@/utils/formDataUtils'
import communInputSearch from '@/components/commun/communInputSearch.vue';

import arrowIcon from '@/assets/icons/arrowIcon.vue';
import calendarIcon from '@/assets/icons/calendarIcon.vue';
import dateFilterModal from '@/components/commun/dateFilterModal.vue';
import { format, isAfter, isBefore } from 'date-fns';
import sideMenu from '@/assets/icons/sideMenu.vue';
import { useProfileStore } from '@/stores/profile';


const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
const useProfile = useProfileStore()
const inboxsToShip = ref([])
const enabled = ref(false)
const selectAll = ref(false)

const filterDate = reactive(
  {
    from: null,
    to: null
  }
)

onBeforeMount(() => {
  useInbox.filtredInboxs = []
})

onMounted(async () => {
  try {
    useInbox.inboxsToShip = []
    await useInbox.getInbox(localStorage.getItem('ws-user-id'))


    useInbox.inboxs.map(item => ({
      ...item,
      selected_to_ship: false
    }))

    loading.value = false
  } catch (error) {
    loading.value = true
  }
})

const onSelectedEnabled = (item) => {
  if (item.selected_to_ship) {
    useInbox.inboxsToShip.push(item)
  } else {
    useInbox.inboxsToShip = useInbox.inboxsToShip.filter(i => i !== item)
  }
}

watch(() => [selectAll.value], () => {
  useInbox.inboxsToShip = []

  if (selectAll.value) {
    for (let index = 0; index < useInbox.filtredInboxs.filter(item => item.total_price).length; index++) {
      useInbox.filtredInboxs.filter(item => item.total_price)[index].selected_to_ship = true
    }
    useInbox.inboxsToShip = useInbox.filtredInboxs.filter(item => item.total_price)
  } else {
    for (let index = 0; index < useInbox.filtredInboxs.length; index++) {
      useInbox.filtredInboxs[index].selected_to_ship = false
    }
    useInbox.inboxsToShip = []
  }
})

const onSupportEmits = async (item) => {

  let formData = new FormData()

  formData.append('support_return', item.support_return)
  formData.append('name', item.name)
  formData.append('message_msg', item.message_msg)
  formData.append('upload_msg', item.upload_msg)

  try {
    let response = await axios.post(`/Dashboard/return_box_API/${localStorage.getItem('ws-user-id')}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  } catch (error) {
    console.error(error)
  }
}


const searchQuery = (query) => {
  if (query) {
    useInbox.filtredInboxs = useInbox.inboxs.filter(item => item.code.includes(query) || item.no_tracking.toLowerCase().includes(query.toLowerCase()))
  } else {
    useInbox.filtredInboxs = useInbox.inboxs
  }
}


const onFilterItems = (item) => {
  if (item.to) {
    Object.assign(filterDate, item)
    useInbox.filtredInboxs = useInbox.inboxs.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    useWidget.dateFilter = false
  } else {
    Object.assign(filterDate, {
      from: null,
      to: null
    })
    useInbox.filtredInboxs = useInbox.inboxs
    useWidget.dateFilter = false
  }
}
</script>

<style lang="scss" scoped></style>
