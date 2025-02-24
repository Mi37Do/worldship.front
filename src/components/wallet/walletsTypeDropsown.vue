<template>
  <div class="w-full">
    <Listbox v-model="selectedType">
      <div class="relative mt-1">
        <ListboxButton
          class=" w-full cursor-default btn btn-sm pixa-btn pixa-btn-nofloat flex items-center justify-between">
          <span class=" truncate flex items-center gap-2">
            <div v-if="list.find(item => item.id === selectedType).type_payment === 'w'"
              class="w-8 h-5 flex justify-center">
              <wallet-icon class="w-5 h-5 fill-primary" />
            </div>
            <img v-else :src="env + list.find(item => item.id === selectedType).image" class="w-8" alt="">
            <span> {{ list.find(item => item.id === selectedType).name }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <angle-icon class="h-5 w-5 text-gray-400 -rotate-90" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="typex in list" :key="typex.id" :value="typex.id"
              as="template">
              <li @click="handleSelectedType(typex.id)" :class="[
                active ? 'bg-primary/10 text-primary' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]">
                <span :class="[
                  selected ? 'font-medium' : 'font-normal',
                  ' truncate flex gap-2 items-center',
                ]">
                  <div v-if="typex.type_payment === 'w'" class="w-8 h-5 flex justify-center">
                    <wallet-icon class="w-5 h-5 fill-primary" />
                  </div>
                  <img v-else :src="env + typex.image" class="w-8" alt="">
                  {{ typex.name }}
                </span>
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
import { ref, watch } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import angleIcon from '@/assets/icons/angleIcon.vue';
import CheckIcon from '@/assets/icons/checkIcon.vue';
import walletIcon from '@/assets/icons/walletIcon.vue';

const props = defineProps(['list', 'selected'])
const emits = defineEmits(['onSelectedType'])
const env = import.meta.env.VITE_WORLDSHIP_API

const selectedType = ref(props.list[0].id)

watch(() => props.selected, () => {
  selectedType.value = props.selected
})

const handleSelectedType = (type) => {
  selectedType.value = type
  emits('onSelectedType', selectedType.value)
}
</script>
