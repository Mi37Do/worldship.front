<template>
  <div v-if="loading" class="w-full h-full flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>

  <div v-else class="w-full h-full py-4 flex flex-col gap-4 overflow-hidden">

    <items-modal />
    <delete-modal :item="useInbox.focusedBuyForMe" @deleteItem="onDeleteItem" />
    <date-filter-modal @filterItems="onFilterItems" />

    <div class="w-full md:h-10 flex flex-col gap-2 md:flex-row items-center justify-between">
      <div class="flex gap-3 items-center w-full md:w-fit">
        <div class="flex gap-3 items-center flex-1 w-full">
          <commun-input-search @searchQuery="searchQuery" class="w-fit  lg:w-96" />
        </div>
      </div>


      <div class="flex flex-col lg:flex-row gap-2 w-full lg:w-fit">
        <div class="flex gap-2 w-full">
          <commun-list-box :list="datesFilter" :selected="selectedType" @onSelectedItem="async (id) => {

          }" />

          <commun-list-box :list="types" :selected="selectedType" @onSelectedItem="async (id) => {
            selectedType = id

            if (id === 'all') {
              useInbox.filterBuyForMes = useInbox.buyForMes
            } else {
              useInbox.filterBuyForMes = useInbox.buyForMes.filter(item => item.state === id)
            }
          }" />
        </div>

        <div class="flex-none w-full lg:w-fit">
          <button @click="useWidget.dateFilter = true"
            class="btn btn-sm pixa-btn pixa-btn-nofloat flex gap-2 w-full lg:w-fit flex-1">
            <calendar-icon class="w-5 h-5" />
            <span>from {{ filterDate.from ? format(filterDate.from, 'dd-MM-yyyy') : '-- -- ----' }}</span>
            <arrow-icon class="w-5 h-5 rotate-90 mx-2" />
            <span>to {{ filterDate.to ? format(filterDate.to, 'dd-MM-yyyy') : '-- -- ----' }}</span>
          </button>
        </div>

        <router-link :to="{ name: 'add-buyForMe' }" class="btn btn-sm pixa-btn btn-primary">
          <plus-icon class="w-5" />
          {{ t('commun.add') }}
          {{ t('navigation.links.buyForMe') }}
        </router-link>

      </div>

      <div class="flex gap-2 items-center lg:hidden">

        <commun-list-box :list="datesFilter" :selected="selectedType" @onSelectedItem="async (id) => {

        }" />
        <commun-list-box :list="types" :selected="selectedType" @onSelectedItem="async (id) => {
          selectedType = id
          if (id === 'all') {
            useInbox.filterBuyForMes = useInbox.buyForMes
          } else {
            useInbox.filterBuyForMes = useInbox.buyForMes.filter(item => item.state === id)
          }
        }" />
        <button @click="useWidget.dateFilter = true" class="btn btn-sm pixa-btn pixa-btn-nofloat flex gap-2">
          <calendar-icon class="w-5 h-5" />
          <span>from {{ filterDate.from ? format(filterDate.from, 'dd-MM-yyyy') : '-- -- ----' }}</span>
          <arrow-icon class="w-5 h-5 rotate-90 mx-2" />
          <span>to {{ filterDate.to ? format(filterDate.to, 'dd-MM-yyyy') : '-- -- ----' }}</span>
        </button>
        <router-link :to="{ name: 'add-buyForMe' }" class="btn btn-sm pixa-btn btn-primary">
          <PlusIcon class="w-5 h-5" />
          {{ $t('commun.addNewBuyForMe') }}
        </router-link>
      </div>
    </div>

    <div v-if="useInbox.filterBuyForMes.length > 0" class="w-full flex-1 flex flex-col overflow-hidden">
      <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
        class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-7 gap-2 uppercase font-bold text-primary bg-white">
        <span class="h-8 my-auto flex items-center truncate">{{ $t('commun.created') }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.code') }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.company') }}</span>
        <!--
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.itemsValue') }}</span> -->
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.domesticShippementCharges') }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.serviceCharge') }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.total') }}</span>
        <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.status') }}</span>
      </div>

      <div class="w-full flex-1 overflow-auto flex flex-col">
        <div class="w-full h-fit flex flex-col gap-2 pt-2">
          <itemData v-for="item in useInbox.filterBuyForMes" :key="item" :item="item" />
        </div>
      </div>
    </div>


    <div v-else class="w-full flex-1 flex items-center justify-center">
      <img src="@/assets/pics/noData.svg" class="w-80" alt="">
    </div>

  </div>
</template>

<script setup>
import itemData from '@/components/byforme/itemData.vue';
import PlusIcon from '@/assets/icons/plusIcon.vue';
import itemsModal from '@/components/shippement/itemsModal.vue';
import { useWidgetStore } from '@/stores/widget';
import deleteModal from '@/components/commun/deleteModal.vue';
import { useInboxStore } from '@/stores/inbox';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import communListBox from '@/components/commun/communListBox.vue';
import communInputSearch from '@/components/commun/communInputSearch.vue';
import arrowIcon from '@/assets/icons/arrowIcon.vue';
import calendarIcon from '@/assets/icons/calendarIcon.vue';
import dateFilterModal from '@/components/commun/dateFilterModal.vue';
import { format, isAfter, isBefore } from 'date-fns';
import { useI18n } from 'vue-i18n';

const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
const { t } = useI18n()
const filterDate = reactive(
  {
    from: null,
    to: null
  }
)
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

const types = ref(
  [
    {
      id: 'all',
      designation: 'all',
      designation_ar: 'الكل'
    }, {
      id: 'rw',
      designation: 'in warehouse',
      designation_ar: 'في المستودع'
    }, {
      id: 'ip',
      designation: 'in progress',
      designation_ar: 'قيد التنفيذ'
    }, {
      id: 'v',
      designation: 'approved',
      designation_ar: 'موافق عليه'
    }, {
      id: 'p',
      designation: 'pending',
      designation_ar: 'قيد الانتظار'
    }, {
      id: 'n',
      designation: 'new',
      designation_ar: 'جديد'
    },
  ]
)

const selectedType = ref('all')

onMounted(async () => {
  try {
    await useInbox.getBuyForMes(localStorage.getItem('ws-user-id'))
    useInbox.filterBuyForMes = useInbox.buyForMes
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})


const onDeleteItem = async (id) => {
  try {
    let response = await axios.get(`/Dashboard/DeleteBFM_API/${id}/${localStorage.getItem('ws-user-id')}`)
    await useInbox.getBuyForMes(localStorage.getItem('ws-user-id'))
    useWidget.deleteModal.open = false
  } catch (error) {
    console.error(error)
  }
}

const searchQuery = (query) => {
  if (query) {
    useInbox.filterBuyForMes = useInbox.buyForMes.filter(item => item.code.includes(query))
  } else {
    useInbox.filterBuyForMes = useInbox.buyForMes
  }
}


const onFilterItems = (item) => {
  if (item.to) {
    Object.assign(filterDate, item)
    useInbox.filterBuyForMes = useInbox.buyForMes.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    useWidget.dateFilter = false
  } else {
    Object.assign(filterDate, {
      from: null,
      to: null
    })
    useInbox.filterBuyForMes = useInbox.buyForMes
    useWidget.dateFilter = false
  }

}
</script>

<style lang="scss" scoped></style>
