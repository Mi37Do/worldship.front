<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <span class="pixa-title flex-1 flex gap-2 items-center
        ">
          <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
            <side-menu />
          </button>
          {{ $t('navigation.links.support') }}</span>
      </template>
    </top-app-bar>


    <div class="w-full flex-1 py-4 flex flex-col gap-4 overflow-hidden">
      <div class="w-full h-10 flex items-center justify-between">
        <div class="gap-3 items-center  hidden md:flex">
          <div class="w-1 h-6 bg-primary"></div>
          <span class="pixa-title">{{ $t('commun.supportTickets') }}</span>
        </div>
        <div class="flex gap-2">
          <button @click="useWidget.dateFilter = true" class="btn btn-sm pixa-btn pixa-btn-nofloat flex gap-2">
            <calendar-icon class="w-5 h-5" />
            <span>{{ filterDate.from ? format(filterDate.from, 'dd-MM-yyyy') : '-- -- ----' }}</span>
            <arrow-icon class="w-5 h-5 rotate-90 mx-2" />
            <span>{{ filterDate.to ? format(filterDate.to, 'dd-MM-yyyy') : '-- -- ----' }}</span>
          </button>
          <button @click="useWidget.addSupport = true" class="btn btn-sm pixa-btn btn-primary">
            <plus-icon class="w-5 h-5" />
            {{ $t('commun.newSupportTicket') }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="w-full flex-1 flex justify-center items-center">
        <span class="loading loading-ring loading-sm"></span>
      </div>

      <div v-else
        class="w-full flex-1 bg-white rounded-lg shadow-2xl shadow-primary/5 border border-slate-200 grid grid-cols-4 overflow-hidden">

        <date-filter-modal @filterItems="onFilterItems" />

        <add-new-support :inboxs="inboxs" :bfms="bfms" :returns="returns" :ships="ships" :list="types" />

        <div class="w-full h-full border-r border-slate-200 flex flex-col overflow-hidden">
          <div class="w-full h-16 p-4 flex items-center justify-between gap-4  shadow-2xl shadow-primary/5">
            <span class="pixa-title">{{ $t('commun.tickets') }}</span>


            <span :class="[
              'h-full w-fit px-2 text-center font-semibold flex items-center bg-primary/10 text-primary rounded']">{{
                useSupport.tempMessages.length }}</span>
          </div>
          <div class="w-full h-12 bg-white grid grid-cols-3 gap-1 px-4 pb-4 border-b border-slate-200">
            <button @click="() => {
              type = 'new'
              useSupport.tempMessages = useSupport.tickets.tickets_new
              Object.assign(filterDate, {
                from: null,
                to: null
              })

            }
            " :class="type === 'new' ? 'btn-primary' : 'pixa-btn-nofloat'"
              class="w-full h-full bg-primary text-white flex items-center justify-center rounded-md border border-slate-200 uppercase text-[0.6rem]">
              new
            </button>
            <button @click="() => {
              type = 'process'
              useSupport.tempMessages = useSupport.tickets.tickets_in_progress
              Object.assign(filterDate, {
                from: null,
                to: null
              })

            }" :class="type === 'process' ? 'btn-primary' : 'pixa-btn-nofloat'"
              class="w-full h-full bg-primary text-white flex items-center justify-center rounded-md border border-slate-200 uppercase text-[0.6rem]">
              in process
            </button>
            <button @click="() => {
              type = 'closed'
              useSupport.tempMessages = useSupport.tickets.tickets_closed
              Object.assign(filterDate, {
                from: null,
                to: null
              })

            }" :class="type === 'closed' ? 'btn-primary' : 'pixa-btn-nofloat'"
              class="w-full h-full bg-primary text-white flex items-center justify-center rounded-md border border-slate-200 uppercase text-[0.6rem]">
              closed
            </button>
          </div>
          <div class="w-full flex-1 overflow-auto flex flex-col">
            <div class="w-full h-fit">
              <ticket-item v-for="item in useSupport.tempMessages" :key="item.id" :item="item" :type="type" />
            </div>
          </div>
        </div>



        <div class="flex-1 h-full col-span-3 overflow-hidden">
          <router-view></router-view>
        </div>


      </div>

    </div>

  </div>
</template>

<script setup>
import plusIcon from '@/assets/icons/plusIcon.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import ticketItem from '@/components/support/ticketItem.vue';
import { useSupportStore } from '@/stores/support';
import { onMounted, reactive, ref } from 'vue';
import addNewSupport from '@/components/support/addNewSupport.vue';
import { useWidgetStore } from '@/stores/widget';
import arrowIcon from '@/assets/icons/arrowIcon.vue';
import calendarIcon from '@/assets/icons/calendarIcon.vue';
import dateFilterModal from '@/components/commun/dateFilterModal.vue';
import { format, isAfter, isBefore } from 'date-fns';
import menuIcon from '@/assets/icons/menuIcon.vue';
import sideMenu from '@/assets/icons/sideMenu.vue';

const useSupport = useSupportStore()
const type = ref('new')
const tempMessages = ref([])
const useWidget = useWidgetStore()
const loading = ref(true)
const inboxs = ref([])
const bfms = ref([])
const returns = ref([])
const ships = ref([])
const filterDate = reactive(
  {
    from: null,
    to: null
  }
)

const types = ref(
  [
    {
      id: 'o',
      designation: 'Other',
      designation_ar: 'نوع اخر'
    }, {
      id: 'b',
      designation: 'Inbox',
      designation_ar: 'الوارد'
    }, {
      id: 'r',
      designation: 'Return',
      designation_ar: 'الإرجاع'
    }, {
      id: 's',
      designation: 'Shipement',
      designation_ar: 'الشحنات'
    }, {
      id: 'bfm',
      designation: 'Buy For Me',
      designation_ar: 'اشترِ لي'
    },
  ]
)

onMounted(async () => {
  try {
    await useSupport.getTickets(localStorage.getItem('ws-user-id'))
    inboxs.value = useSupport.tickets.in_boxs.map(item => (
      {
        id: item.id,
        designation: item.code + ' (' + item.no_tracking + ')',
        designation_ar: item.code + ' (' + item.no_tracking + ')'
      }
    ))

    bfms.value = useSupport.tickets.bfms.map(item => (
      {
        id: item.id,
        designation: item.code,
        designation_ar: item.code
      }
    ))

    returns.value = useSupport.tickets.return_boxs.map(item => (
      {
        id: item.id,
        designation: item.code + ' (' + item.no_tracking + ')',
        designation_ar: item.code + ' (' + item.no_tracking + ')'
      }
    ))

    ships.value = useSupport.tickets.shipps.map(item => (
      {
        id: item.id,
        designation: item.code,
        designation_ar: item.code
      }
    ))

    console.log(useSupport.tickets)


    useSupport.tempMessages = useSupport.tickets.tickets_new
    setTimeout(() => {
      loading.value = false
    }, 300)
  } catch (error) {
    tempMessages.value = []
  }
})


const onFilterItems = (item) => {
  if (item.to) {
    Object.assign(filterDate, item)
    if (type.value === 'new') {
      useSupport.tempMessages = useSupport.tickets.tickets_new.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    } else if (type.value === 'process') {
      useSupport.tempMessages = useSupport.tickets.tickets_in_progress.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    } else {
      useSupport.tempMessages = useSupport.tickets.tickets_closed.filter(i => isAfter(new Date(i.created_at), new Date(item.from)) && isBefore(new Date(i.created_at), new Date(item.to)))
    }

    useWidget.dateFilter = false
  } else {
    Object.assign(filterDate, {
      from: null,
      to: null
    })

    if (type.value === 'new') {
      useSupport.tempMessages = useSupport.tickets.tickets_new
    } else if (type.value === 'process') {
      useSupport.tempMessages = useSupport.tickets.tickets_in_progress
    } else {
      useSupport.tempMessages = useSupport.tickets.tickets_closed
    }
    useWidget.dateFilter = false
  }
}

</script>

<style lang="scss" scoped></style>
