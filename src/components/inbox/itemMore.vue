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
            'absolute  w-48 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 top-0']">
          <div class="px-1 py-1">
            <MenuItem class="lg:hidden">
            <button @click="() => {
              useInbox.focusedInbox = item
              console.log(item);

              for (let index = 0; index < item.wh_order.length; index++) {
                const element = item.wh_order[index]
                useInbox.items.push({
                  id: element.id,
                  name: element.name_id.name,
                  qty: element.qty,
                  images: element.images,
                  price: element.price,

                  code: element.name_id.code,
                  is_valid: element.state === 'v' ? true : false
                })
              }

              useWidget.orderItems = true
            }
            " :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">
              items
              <ListIcon class="w-5 h-5" />
            </button>
            </MenuItem>
            <MenuItem>
            <button @click="() => {
              useInbox.focusedInbox = item
              useWidget.returnInbox = true
            }" :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">
              {{ t('commun.return') }}
              <RedoIcon class="w-5 h-5" />
            </button>
            </MenuItem>

            <MenuItem>
            <button @click="() => {
              useInbox.focusedInbox = item
              useWidget.addNote = true
            }" :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">
              {{ t('commun.myNote') }}
              <ClipboardIcon class="w-5 h-5" />
            </button>
            </MenuItem>

            <MenuItem>
            <button @click="openTickets" :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">

              {{ t('commun.openTicket') }}
              <comment-icon class="w-5 h-5" />
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
import commentIcon from '@/assets/icons/commentIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import CartIcon from '@/assets/icons/cartIcon.vue';
import RedoIcon from '@/assets/icons/redoIcon.vue';
import ClipboardIcon from '@/assets/icons/clipboardIcon.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CheckIcon from '@/assets/icons/checkIcon.vue';
import CheckCircleIcon from '@/assets/icons/checkCircleIcon.vue';
import TimesCircleIcon from '@/assets/icons/timesCircleIcon.vue';
import { useI18n } from 'vue-i18n';

const props = defineProps(['item'])
const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const router = useRouter()
const { t } = useI18n()

const openTickets = async () => {

  if (props.item.suport_ticket) {
    router.push({ name: 'chat', params: { id: props.item.suport_ticket.id } })
  } else {
    useWidget.supportTicket.open = true
    useWidget.supportTicket.id = props.item.id
    useWidget.supportTicket.designation = props.item.code
  }
}

</script>
