<template>
  <Switch v-model="enabled" :class="enabled ? 'bg-primary' : 'bg-slate-400'"
    class="relative h-7 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 text-white uppercase font-medium flex items-center">
    <span class="sr-only">Use setting</span>
    <span aria-hidden="true" :class="enabled ? 'translate-x-[3.35rem]' : 'translate-x-[0.1rem]'"
      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
    <span v-if="enabled" class="mr-auto ml-2 absolute text-xs">true</span>
    <span v-else class="ml-auto mr-2 text-xs">false</span>
  </Switch>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

const props = defineProps(['enabled'])
const emits = defineEmits(['selectedEnabled'])
const enabled = ref(false)

onMounted(() => {
  enabled.value = props.enabled
})


watch(() => enabled.value, () => {
  emits('selectedEnabled', enabled.value)
})
</script>
