<template>
  <div v-if="loading" class="w-full h-full flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>
  <div v-else class="w-full bg-slate-100 flex flex-col items-center justify-center py-32">

    <span class="text-4xl font-bold text-primary">faq's</span>

    <div v-auto-animate class="w-full px-4 pt-8 max-w-screen-lg flex-1">
      <div v-for="item in faqs.config_web.faq" :key="item.id" :item="item"
        class="mx-auto w-full rounded-2xl bg-white p-2 flex flex-col gap-4 mb-4">
        <span class="pixa-title "> {{ item.name }}</span>
        <div v-for="faq in item.faq_r" :key="faq.id" class="w-full">
          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="flex w-full justify-between rounded-lg bg-primary/5 px-4 py-2 text-left text-sm font-medium text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring focus-visible:ring-primary">
              <span>{{ faq.name }}</span>
              <angle-icon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 fill-primary -rotate-90" />
            </DisclosureButton>
            <DisclosurePanel class="px-4 pb-2 pt-4 text-sm text-gray-500">
              <span>{{ faq.response_question }}</span>
            </DisclosurePanel>
          </Disclosure>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useProfileStore } from '@/stores/profile';
import angleIcon from '@/assets/icons/angleIcon.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';


const useProfile = useProfileStore()
const faqs = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    let response = await axios.get('/Dashboard/view_faqs_API')
    faqs.value = response.data
    loading.value = false
  } catch (error) {
    console.error(error)
  }
})

</script>

<style lang="scss" scoped></style>
