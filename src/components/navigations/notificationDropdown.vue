<template>
  <div class="w-fit text-right ">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="btn btn-sm pixa-btn btn-ghost w-10 p-0 relative">
          <div class="w-4 h-4 bg-red-500 absolute right-1 top-1 rounded-full text-white text-[0.6rem]">{{
            useWidget.notifications.length > 9 ? '+9' : useWidget.notifications.length }}</div>
          <bell-icon class="w-7 h-7" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems
          class="absolute right-0 mt-2 w-72 h-96 flex flex-col origin-top-right divide-y no-scrollbar divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">

          <div class="p-2">
            <commun-dropdown :list="list" :selected="selected" class="uppercase" @on-selected-item="(id) => {
              //  selected = id
              if (id === 'all') {
                useWidget.filtredNotifications = useWidget.notifications
              } else {
                useWidget.filtredNotifications = useWidget.notifications.filter(i => i.type_n === id)
              }
            }" />
          </div>

          <div class="w-full flex-1 overflow-hidden">
            <div class="w-full h-full overflow-auto ">

              <div class="px-1 py-1">

                <MenuItem v-for="item in useWidget.filtredNotifications" :key="item">
                <div class="w-full h-fit border-b flex gap-3 items-center py-1.5 hover:bg-slate-50 px-3">
                  <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <PlanIcon v-if="item.type_n === 's' || item.type_n === 'cs'" class="w-5 fill-primary" />
                    <box-icon v-if="item.type_n === 'in'" class="w-5 fill-primary" />
                    <bill-icon v-if="item.type_n === 'i'" class="w-5 fill-primary" />
                    <ChartIcon v-if="item.type_n === 'b'" class="w-5 fill-primary" />
                    <support-icon v-if="item.type_n === 's'" class="w-5 fill-primary" />
                  </div>
                  <div class="flex flex-1 gap-1 flex-col overflow-hidden">
                    <span class="truncate font-semibold">{{ item.name }}</span>
                    <div class="w-full flex justify-between">

                      <span>{{ format(item.created_at, 'HH:mm ') }}</span>

                      <span>{{ format(item.created_at, 'dd-MM-yyyy ') }}</span>

                    </div>
                  </div>
                </div>
                </MenuItem>

              </div>
            </div>
          </div>



        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ref, onBeforeMount } from 'vue'
import languageIcon from '@/assets/icons/languageIcon.vue'
import { useWidgetStore } from '@/stores/widget'
import bellIcon from '@/assets/icons/bellIcon.vue'
import { format } from 'date-fns'
import PlanIcon from '@/assets/icons/planIcon.vue'
import communDropdown from '../commun/communDropdown.vue'
import boxIcon from '@/assets/icons/boxIcon.vue'
import billIcon from '@/assets/icons/billIcon.vue'
import ChartIcon from '@/assets/icons/chartIcon.vue'
import supportIcon from '@/assets/icons/supportIcon.vue'

const enabled = ref(false)
const useWidget = useWidgetStore()
const languages = ref(['ar', 'en'])

const selected = ref('all')

const list = ref(
  [{
    id: 'all',
    designation: 'all'
  },
  {
    id: 'in',
    designation: 'InBox'
  },
  {
    id: 's',
    designation: 'Shipment'
  }, {
    id: 'cs',
    designation: 'Custom shipment'
  }, {
    id: 'b',
    designation: 'BuyForMe'
  }, {
    id: 'i',
    designation: 'Invoice'
  }, {
    id: 't',
    designation: 'Support Ticket'
  }
  ]
)

onBeforeMount(() => {
  const initLanguage = useWidget.getLanguage()
  useWidget.setLanguage(initLanguage)

  console.log(useWidget.filtredNotifications);

})


</script>
