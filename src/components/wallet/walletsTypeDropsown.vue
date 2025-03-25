<template>
  <div class="w-full">
    <Listbox v-model="selectedType">
      <div class="relative mt-1">
        <ListboxButton
          class="w-full cursor-default btn btn-sm pixa-btn pixa-btn-nofloat flex items-center justify-between">
          <span class="truncate flex items-center gap-2">
            <div v-if="selectedItem?.type_payment === 'w'" class="w-8 h-5 flex justify-center">
              <wallet-icon class="w-5 h-5 fill-primary" />
            </div>
            <img v-else :src="env + selectedItem?.image" class="w-8" alt="">
            <span>{{ selectedItem?.name }}</span>
          </span>
          <angle-icon class="h-5 w-5 text-gray-400 -rotate-90" />
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <ListboxOption v-for="typex in list" :key="typex.id" :value="typex.id" v-slot="{ active, selected }">
              <li :class="[
                active ? 'bg-primary/10 text-primary' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]">
                <span :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'truncate flex gap-2 items-center',
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
import { ref, computed, watch } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import angleIcon from '@/assets/icons/angleIcon.vue';
import CheckIcon from '@/assets/icons/checkIcon.vue';
import walletIcon from '@/assets/icons/walletIcon.vue';

const props = defineProps(['list', 'selected']);
const emits = defineEmits(['onSelectedType']);
const env = import.meta.env.VITE_WORLDSHIP_API;

const selectedType = ref(props.selected || props.list[0]?.id);

// Compute selected item for cleaner template
const selectedItem = computed(() =>
  props.list.find(item => item.id === selectedType.value)
);

// Handle external changes
watch(() => props.selected, (newVal) => {
  selectedType.value = newVal;
});

// Emit changes
watch(selectedType, (newVal) => {
  emits('onSelectedType', newVal);
});
</script>
