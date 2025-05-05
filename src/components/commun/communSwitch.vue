<template>
  <SwitchGroup as="div" class="flex gap-x-4">
    <div class="flex h-6 items-center">
      <Switch v-model="localEnabled" :class="[
        localEnabled ? 'bg-primary' : 'bg-gray-200',
        'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      ]">
        <span aria-hidden="true" :class="[
          localEnabled ? 'translate-x-3.5' : 'translate-x-0',
          'size-4 transform rounded-full bg-white ring-1 shadow-xs ring-gray-900/5 transition duration-200 ease-in-out'
        ]" />
      </Switch>
    </div>
  </SwitchGroup>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { Switch, SwitchGroup } from '@headlessui/vue'

const props = defineProps({
  enabled: Boolean
})
const emits = defineEmits(['selectedEnabled'])

const localEnabled = ref(false)

watchEffect(() => {
  localEnabled.value = props.enabled
})

watch(() => localEnabled.value, (val) => {
  emits('selectedEnabled', val)
})
</script>
