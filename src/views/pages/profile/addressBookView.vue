<template>
  <div v-if="loading" class="w-full h-full flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>

  <div v-else class="w-full h-full flex flex-col overflow-hidden">
    <add-adress-book />
    <deleteModal :item="useBook.focusedBook" @deleteItem="onDeleteItem" />
    <div class="w-full flex-1 pb-4 flex flex-col gap-4 overflow-hidden">
      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>
          <span class="pixa-title">{{ $t('commun.addressBook') }}</span>
        </div>
        <div class="flex gap-2">
          <button @click="useWidget.addAddressBook.open = true" class="btn btn-sm pixa-btn btn-primary">
            <plus-icon class="w-5 h-5" />
            {{ $t('commun.addAddress') }}</button>
        </div>
      </div>

      <div class="w-full flex-1 flex flex-col overflow-hidden">
        <div :class="[useWidget.userLanguage === 'ar' ? 'text-right  pl-7' : ' pr-7']"
          class="w-full h-12 rounded-lg border border-slate-200 px-4 hidden lg:grid grid-cols-6 gap-2 uppercase font-bold text-primary bg-white">
          <span class="h-8  my-auto flex items-center">{{ $t('commun.name') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.phone') }}</span>
          <span class="h-8  my-auto flex items-center">{{ $t('commun.secondPhone') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.city') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.addressLine') }}</span>
          <span class="h-8 my-auto flex items-center">{{ $t('commun.instructions') }}</span>
        </div>

        <div class="w-full flex-1 overflow-auto flex flex-col">
          <div class="w-full h-fit flex flex-col gap-2 pt-2">
            <itemData v-for="item in useBook.addresses" :key="item" :item="item" />
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import plusIcon from '@/assets/icons/plusIcon.vue';
import addAdressBook from '@/components/addressBook/addAdressBook.vue';
import itemData from '@/components/addressBook/itemData.vue';
import { useWidgetStore } from '@/stores/widget';
import { onMounted, ref } from 'vue';
import { useBookStore } from '@/stores/addressBook';
import deleteModal from '@/components/commun/deleteModal.vue';
import { useI18n } from 'vue-i18n';
import { objectToFormData } from '@/utils/formDataUtils'
import axios from 'axios';

const useWidget = useWidgetStore()
const useBook = useBookStore()
const loading = ref(true)
const { t } = useI18n()

onMounted(async () => {
  try {
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})

const onDeleteItem = async (id) => {
  let deleteObject = {
    ref_adr: id
  }
  try {
    let formData = objectToFormData(deleteObject)
    let response = await axios.post(`/Dashboard/address_book_dash_API/${localStorage.getItem('ws-user-id')}`, formData)
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
    Object.assign(useWidget.deleteModal, {
      id: null,
      designation: null,
      open: false,
    })
  } catch (error) {
    console.error(error);

  }
}
</script>

<style lang="scss" scoped></style>
