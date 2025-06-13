<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
          <side-menu />
        </button>
        <span class="pixa-title flex-1">{{ $t('navigation.links.return') }}</span>
      </template>
    </top-app-bar>


    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 py-4 flex flex-col gap-4 overflow-hidden">


      <items-modal />

      <date-filter-modal @filterItems="onFilterItems" />



      <div class="w-full md:h-10 flex  flex-col gap-2 md:flex-row items-center justify-between">
        <div class="flex gap-3 items-center w-full md:w-fit">
          <div class="flex gap-3 items-center flex-1 w-full">
            <commun-input-search @searchQuery="searchQuery" class="w-fit  lg:w-96" />
          </div>
        </div>
        <div class="flex gap-2 w-full flex-col md:flex-row md:w-fit">
          <commun-list-box :list="datesFilter" :selected="selectedType" @onSelectedItem="async (id) => {

          }" />
          <button @click="useWidget.dateFilter = true"
            class="btn btn-sm pixa-btn pixa-btn-nofloat flex gap-2 w-fit flex-1 md:w-full">
            <calendar-icon class="w-5 h-5" />
            <span>from {{ filterDate.from ? format(filterDate.from, 'dd-MM-yyyy') : '-- -- ----' }}</span>
            <arrow-icon class="w-5 h-5 rotate-90 mx-2" />
            <span>to {{ filterDate.to ? format(filterDate.to, 'dd-MM-yyyy') : '-- -- ----' }}</span>
          </button>
        </div>
      </div>

      <div v-if="useInbox.returns.length > 0" class="w-full flex-1 flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-7 gap-2 uppercase font-bold text-primary bg-white">

          <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.date') }}</span>
          <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.code') }}</span>
          <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.company') }}</span>
          <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.noTracking') }}</span>
          <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.reason') }}</span>
          <span class="h-8  my-auto flex items-center truncate">{{ $t('commun.document') }}</span>
          <span class="h-8 my-auto flex items-center truncate">{{ $t('commun.status') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit flex flex-col gap-2 pt-2">
            <itemData v-for="item in useInbox.filtredReturns" :key="item" :item="item" />
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
import topAppBar from '@/components/navigations/topAppBar.vue';
import itemData from '@/components/return/itemData.vue';
import itemsModal from '@/components/shippement/itemsModal.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import communInputSearch from '@/components/commun/communInputSearch.vue';
import { onMounted, reactive, ref } from 'vue';
import arrowIcon from '@/assets/icons/arrowIcon.vue';
import calendarIcon from '@/assets/icons/calendarIcon.vue';
import dateFilterModal from '@/components/commun/dateFilterModal.vue';
import { format, isAfter, isBefore } from 'date-fns';
import sideMenu from '@/assets/icons/sideMenu.vue';
import communListBox from '@/components/commun/communListBox.vue';

const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const loading = ref(true)
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

const selectedType = ref('all')


onMounted(async () => {
  try {
    await useInbox.getReturns(localStorage.getItem('ws-user-id'))
    useInbox.filtredReturns = useInbox.returns

    loading.value = false
  } catch (error) {
    loading.value = true
  }
})



const searchQuery = (query) => {
  if (query) {
    useInbox.filtredReturns = useInbox.returns.filter(item => item.code.includes(query) || item.no_tracking.toLowerCase().includes(query.toLowerCase()))
  } else {
    useInbox.filtredReturns = useInbox.returns
  }
}


const onFilterItems = (item) => {
  if (item.to) {
    Object.assign(filterDate, item)
    useInbox.filtredReturns = useInbox.returns.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    useWidget.dateFilter = false
  } else {
    Object.assign(filterDate, {
      from: null,
      to: null
    })
    useInbox.filtredReturns = useInbox.returns
    useWidget.dateFilter = false
  }

}

</script>

<style lang="scss" scoped></style>
