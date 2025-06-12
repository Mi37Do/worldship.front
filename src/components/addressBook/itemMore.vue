<template>
  <div ref="more">
    <Menu as="div" class="relative inline-block text-left ">
      <div class="z-0">
        <MenuButton class="btn btn-sm btn-square btn-ghost p-0">
          <menu-icon class="w-5 h-5" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems
          :class="[
            useWidget.userLanguage === 'en' ? ' origin-top-right right-12' : ' origin-top-left left-12',
            'absolute  w-40 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 top-0']">
          <div class="px-1 py-1">
            <MenuItem>
            <button @click="() => {
              useBook.focusedBook = item
              Object.assign(useWidget.addAddressBook, {
                open: true,
                add: false
              })
            }" :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">
              {{ t('commun.edit') }}
              <EditIcon class="w-5 h-5" />
            </button>
            </MenuItem>

            <MenuItem>
            <button @click="() => {
              useBook.focusedBook = item
              Object.assign(useWidget.deleteModal, {
                open: true,
                id: item.id,
                designation: item.name
              })
            }" :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn-delete',
            ]">
              {{ t('commun.delete') }}
              <TrashIcon class="w-5 h-5" />
            </button>
            </MenuItem>
          </div>

        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import menuIcon from '@/assets/icons/menuIcon.vue'
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import ListIcon from '@/assets/icons/listIcon.vue';
import billIcon from '@/assets/icons/billIcon.vue';
import commentIcon from '@/assets/icons/commentIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import EditIcon from '@/assets/icons/editIcon.vue';
import TrashIcon from '@/assets/icons/trashIcon.vue';
import { useBookStore } from '@/stores/addressBook';
import { useI18n } from 'vue-i18n';

const props = defineProps(['item'])
const { t } = useI18n()
const useWidget = useWidgetStore()
const useBook = useBookStore()

</script>
