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

              /***/
              if (route.name === 'shippements') {
                for (let index = 0; index < item.warehouse_order_ids.length; index++) {
                  const element = item.warehouse_order_ids[index]
                  for (let i = 0; i < element.wh_order.length; i++) {
                    const elementx = element.wh_order[i]
                    useInbox.items.push({
                      id: elementx.id,
                      name: elementx.name_id.name,
                      qty: elementx.qty,
                      images: elementx.images,
                      price: elementx.price,
                      code: elementx.name_id.code,
                    })
                  }
                }
              } else {
                for (let index = 0; index < item.sh_package.length; index++) {
                  const element = item.sh_package[index]
                  useInbox.items.push({
                    id: element.id,
                    name: element.name_id.name,
                    qty: element.qty,
                    images: element.images,
                    price: element.price,
                    code: element.name_id.code,
                  })
                }
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
            <router-link
              :to="{ name: route.name.includes('costume') ? 'costume-shippement' : 'shippement', params: { id: item.id } }"
              :class="[
                'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
              ]">
              detail
              <eye-icon class="w-5 h-5" />
            </router-link>
            </MenuItem>

            <MenuItem>
            <button @click="() => {
              useWidget.tracking = true
              useInbox.focusedShippement = item

              console.log(useInbox.focusedShippement)

            }" :class="[
              item.label_shipp ? '' : 'btn-disabled',
              'btn btn-sm pixa-btn btn-ghost flex justify-between w-full items-center capitalize pixa-menu-btn',
            ]">
              tracking
              <plan-icon class="w-5 h-5" />
            </button>
            </MenuItem>

            <MenuItem>
            <button @click="openTickets" :class="[
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
import planIcon from '@/assets/icons/planIcon.vue';
import commentIcon from '@/assets/icons/commentIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps(['item'])
const useWidget = useWidgetStore()
const useInbox = useInboxStore()
const router = useRouter()
const route = useRoute()

const openTickets = async () => {
  console.log(props.item)
  if (props.item.suport_ticket) {
    router.push({ name: 'chat', params: { id: props.item.suport_ticket.id } })
  } else {
    useWidget.supportTicket.open = true
    useWidget.supportTicket.id = props.item.id
    useWidget.supportTicket.designation = props.item.code
  }
}
</script>
