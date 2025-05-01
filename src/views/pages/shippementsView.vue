<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
          <side-menu />
        </button>
        <span class="pixa-title flex-1">{{ $t('navigation.links.shippements') }}</span>

      </template>
    </top-app-bar>



    <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
      <span class="loading loading-ring loading-sm"></span>
    </div>

    <div v-else class="w-full flex-1 py-4 flex flex-col gap-4 overflow-hidden">

      <tracking-modal />
      <items-modal />
      <date-filter-modal @filterItems="onFilterItems" />

      <support-ticket-modal @supportEmits="onSupportEmits" />

      <div class="w-full lg:h-10 flex flex-col lg:flex-row gap-2 items-center justify-between">

        <div class="w-full flex gap-3 items-center lg:w-96">
          <commun-input-search @searchQuery="searchQuery" />
        </div>

        <div class="flex gap-2 w-full lg:w-fit">
          <commun-list-box :list="types" :selected="selectedType" @onSelectedItem="async (id) => {
            selectedType = id
            console.log(id);

            if (id === 'all') {
              useInbox.filtredShippements = useInbox.shippements
            } else {
              useInbox.filtredShippements = id === 'p' ? useInbox.shippements.filter(item => item.is_payed === true) : useInbox.shippements.filter(item => item.is_payed === false)
            }
          }" />
          <button @click="useWidget.dateFilter = true" class="btn btn-sm pixa-btn pixa-btn-nofloat flex gap-2 flex-1">
            <calendar-icon class="w-5 h-5" />
            <span>from {{ filterDate.from ? format(filterDate.from, 'dd-MM-yyyy') : '-- -- ----' }}</span>
            <arrow-icon class="w-5 h-5 rotate-90 mx-2" />
            <span>to {{ filterDate.to ? format(filterDate.to, 'dd-MM-yyyy') : '-- -- ----' }}</span>
          </button>
        </div>

      </div>

      <div v-if="useInbox.shippements.length > 0" class="w-full flex-1  flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-5 gap-2 uppercase font-bold text-primary bg-white">
          <span class="h-8  my-auto flex items-center pl-16">{{ $t('commun.created') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.code') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.orders') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.status') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.paymentStatus') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit pt-2 gap-2 flex flex-col">


            <!---->
            <itemData v-for="item in useInbox.filtredShippements" :key="item.id" :item="item" />
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
import trackingModal from '@/components/shippement/trackingModal.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import itemData from '@/components/shippement/itemData.vue';
import itemsModal from '@/components/shippement/itemsModal.vue';
import { useInboxStore } from '@/stores/inbox';
import { useWidgetStore } from '@/stores/widget';
import { computed, onMounted, reactive, ref } from 'vue';
import communListBox from '@/components/commun/communListBox.vue';
import communInputSearch from '@/components/commun/communInputSearch.vue';
import { objectToFormData } from '@/utils/formDataUtils';
import supportTicketModal from '@/components/commun/supportTicketModal.vue';
import axios from 'axios';
import arrowIcon from '@/assets/icons/arrowIcon.vue';
import calendarIcon from '@/assets/icons/calendarIcon.vue';
import dateFilterModal from '@/components/commun/dateFilterModal.vue';
import { format, isAfter, isBefore } from 'date-fns';
import sideMenu from '@/assets/icons/sideMenu.vue';
import { useInvoicesStore } from '@/stores/invoices';

const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const useInvoices = useInvoicesStore()
const loading = ref(true)
const filterDate = reactive(
  {
    from: null,
    to: null
  }
)


const types = ref(
  [
    {
      id: 'all',
      designation: 'all',
      designation_ar: 'الكل'
    }, {
      id: 'p',
      designation: 'paid',
      designation_ar: 'مدفوع'
    }, {
      id: 'u',
      designation: 'unpaid',
      designation_ar: 'غير مدفوع'
    },
  ]
)


const selectedType = ref('all')


onMounted(async () => {
  try {

    await useInbox.getShippements(localStorage.getItem('ws-user-id'))
    useInbox.filtredShippements = useInbox.shippements
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})

const searchQuery = (query) => {
  if (query) {
    useInbox.filtredShippements = useInbox.shippements.filter(item => item.code.includes(query))
  } else {
    useInbox.filtredShippements = useInbox.shippements
  }
}


const onSupportEmits = async (item) => {
  console.log(item);

  let formData = new FormData()

  formData.append('support_return', item.support_return)
  formData.append('name', item.name)
  formData.append('message_msg', item.message_msg)
  formData.append('upload_msg', item.upload_msg)

  try {
    let response = await axios.post(`/Dashboard/in_shipp_API/${localStorage.getItem('ws-user-id')}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    console.log(response.data)

  } catch (error) {
    console.error(error)

  }
}

const onFilterItems = (item) => {
  if (item.to) {
    Object.assign(filterDate, item)
    useInbox.filtredShippements = useInbox.shippements.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    useWidget.dateFilter = false
  } else {
    Object.assign(filterDate, {
      from: null,
      to: null
    })
    useInbox.filtredShippements = useInbox.shippements
    useWidget.dateFilter = false
  }

}
</script>

<style lang="scss" scoped></style>
