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
            'absolute right-12 w-40 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50 top-0']">
          <div class="px-1 py-1">
            <MenuItem>
            <button @click="() => {
              useWidget.orderItems = true
              for (let index = 0; index < item.wh_order.length; index++) {
                const element = item.wh_order[index]
                useInbox.items.push(element)
              }
              console.log(useInbox.items)

            }" :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">
              items
              <ListIcon class="w-5 h-5" />
            </button>
            </MenuItem>

            <MenuItem>
            <button :class="[
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">
              open ticket
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
import billIcon from '@/assets/icons/billIcon.vue';
import commentIcon from '@/assets/icons/commentIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';

const props = defineProps(['item'])
const useWidget = useWidgetStore()
const useInbox = useInboxStore()


</script>
