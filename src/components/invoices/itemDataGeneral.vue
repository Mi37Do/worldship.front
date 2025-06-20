<template>
  <div
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-4 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">
    <span class="h-8 my-auto flex items-center truncate">{{ item.code }}</span>
    <!---->
    <span class="h-8 my-auto flex items-center truncate">{{ item.pay_type ? item.pay_type.name : '-----' }}</span>
    <span class="h-8 my-auto flex items-center truncate">$ {{
      numberFormat(item.total_price) }} </span>
    <div class="flex items-center justify-between my-auto ">
      <span :class="[
        item.state === 'py' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
      ]" class=" flex items-center truncate w-fit px-3 rounded  py-1">{{ item.state
        === 'py' ? 'payed' : 'pending' }}</span>

      <button @click="openDetails" class="btn btn-sm pixa-btn w-10 btn-ghost p-0">
        <eye-icon class="w-5 h-5" />
      </button>
    </div>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { formatPhoneNumber } from '@/utils/phoneUtils';
import { useRoute } from 'vue-router';
import { useInvoicesStore } from '@/stores/invoices';

const useWidget = useWidgetStore()
const route = useRoute()
const props = defineProps(['item'])
const useInvoices = useInvoicesStore('')

const openDetails = async () => {
  useInvoices.items = []
  useWidget.invoiceDetail = true
  await useInvoices.getInvoices('gnrl', null, props.item.id)

  for (let j = 0; j < useInvoices.focusedInvoice.gr_invoice.length; j++) {
    const elementx = useInvoices.focusedInvoice.gr_invoice[j];
    useInvoices.items.push(elementx)
  }


}

</script>

<style lang="scss" scoped></style>
