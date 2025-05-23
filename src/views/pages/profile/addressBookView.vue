<template>
  <div v-if="loading" class="w-full h-full flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>

  <div v-else class="w-full h-full flex flex-col overflow-hidden">
    <add-adress-book :type="route.name.replace('-addresses', '')" />
    <deleteModal :item="useBook.focusedBook" @deleteItem="onDeleteItem" />
    <div class="w-full flex-1 pb-4 flex flex-col gap-4 overflow-hidden">
      <div class="w-full h-fit flex items-center justify-between">
        <div class="flex gap-1 items-center p-1 bg-white border border-slate-200 rounded-lg">
          <router-link :to="{ name: 'from-addresses' }"
            :class="route.name === 'from-addresses' ? 'btn-primary' : 'btn-ghost'" class="btn btn-sm pixa-btn">from
            address</router-link>
          <router-link :to="{ name: 'to-addresses' }"
            :class="route.name === 'to-addresses' ? 'btn-primary' : 'btn-ghost'" class="btn btn-sm pixa-btn">to
            address</router-link>
          <!--
          <router-link :to="{ name: 'billing-addresses' }"
            :class="route.name === 'billing-addresses' ? 'btn-primary' : 'btn-ghost'"
            class="btn btn-sm pixa-btn">billing
            address</router-link> -->
        </div>
        <div class="flex gap-2">

          <button @click="useWidget.addAddressBook.open = true" class="btn btn-sm pixa-btn btn-primary">
            <plus-icon class="w-5 h-5" />
            {{ $t('commun.addAddress') }}</button>
        </div>
      </div>

      <div class="w-full flex-1 flex flex-col overflow-hidden">
        <router-view></router-view>
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
import communListBox from '@/components/commun/communListBox.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const useWidget = useWidgetStore()
const useBook = useBookStore()
const loading = ref(true)
const { t } = useI18n()
const route = useRoute()

const selectedType = ref('all')

onMounted(async () => {
  try {
    await useBook.getAddresses(localStorage.getItem('ws-user-id'))
    loading.value = false
  } catch (error) {
    loading.value = true
  }
})


const types = ref(
  [
    {
      id: 'all',
      designation: 'all',
      designation_ar: 'الكل'
    }, {
      id: 'from',
      designation: 'from',
      designation_ar: 'مدفوع'
    }, {
      id: 'to',
      designation: 'to',
      designation_ar: 'غير مدفوع'
    },
  ]
)

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
