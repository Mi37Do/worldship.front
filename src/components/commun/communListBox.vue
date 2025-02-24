<template>
  <div>
    <Listbox v-model="selectedItem">
      <div class="relative">
        <ListboxButton class="btn btn-sm pixa-btn w-32 lg:w-48 pixa-btn-nofloat flex items-center justify-between">
          <span class="block truncate">{{list.find(item => item.id === selectedItem).designation}}</span>
          <span class="pointer-events-none flex items-center ">
            <sort-icon class="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="item in list" :key="item.id" :value="item.id"
              as="template">
              <li @click="onSelectedItem(item.id)" :class="[
                active ? 'bg-blue-100 text-primary' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]">
                <span :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate uppercase',
                ]">{{ item.designation }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 fill-primary">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import CheckIcon from '@/assets/icons/checkIcon.vue';
import sortIcon from '@/assets/icons/sortIcon.vue';

const props = defineProps(['list', 'selected'])
const emits = defineEmits(['onSelectedItem'])
const selectedItem = ref(props.selected)

const onSelectedItem = (id) => {
  selectedItem.value = id
  emits('onSelectedItem', selectedItem.value)
}
</script>
