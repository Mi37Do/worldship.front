<template>
  <div class="w-fit text-right ">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="btn btn-sm pixa-btn btn-ghost w-10 p-0">
          <bell-icon class="w-7 h-7" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems
          class="absolute right-0 mt-2 w-72 max-h-60 overflow-auto origin-top-right divide-y no-scrollbar divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">

          <div class="px-1 py-1">
            <MenuItem v-for="item in useWidget.notifications" :key="item">
            <div class="w-full h-fit border-b flex gap-3 items-center py-1.5 hover:bg-slate-50 px-3">
              <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <PlanIcon v-if="item.type_n === 'w'" class="w-5 fill-primary" />
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

const enabled = ref(false)
const useWidget = useWidgetStore()
const languages = ref(['ar', 'en'])

onBeforeMount(() => {
  const initLanguage = useWidget.getLanguage()
  useWidget.setLanguage(initLanguage)
})


</script>
