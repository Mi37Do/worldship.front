<template>
  <div
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2 lg:grid-cols-4 gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">
    <span class="h-8 my-auto flex items-center truncate">{{ item.code }}</span>
    <!---->
    <span class="h-8 my-auto flex items-center truncate">{{ item.pay_type ? item.pay_type.name : '-----' }}</span>
    <span class="h-8 my-auto flex items-center truncate">$ {{ route.name === 'warehouse-invoices' ?
      numberFormat(item.wh_pk.total_price) : route.name === 'byforme-invoices' ? numberFormat(item.bfm_pk.total_price) :
        numberFormat(item.sh_pk.total_price) }} </span>
    <div class="flex items-center justify-between my-auto ">
      <span :class="[
        item.state
          === 'wa' ? 'bg-purple-100 text-purple-600' :
          item.state === 'a' ? 'bg-emerald-100 text-emerald-600' :
            item.state === 'na' ? 'bg-red-100 text-red-600' : ''
      ]" class=" flex items-center truncate w-fit px-3 rounded  py-1">{{ item.state
        === 'wa' ? 'Need To Approved' : item.state
          === 'a' ? 'approved' : item.state
            === 'na' ? 'not approved' : item.state }}</span>

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
  await useInvoices.getInvoices(route.name === 'warehouse-invoices' ? 'wrhs' : route.name === 'byforme-invoices' ? 'bfm' : 'cstm', null, props.item.id)

  if (route.name === 'warehouse-invoices') {
    for (let index = 0; index < useInvoices.focusedInvoice.wh_pk.warehouse_order_ids.length; index++) {
      const element = useInvoices.focusedInvoice.wh_pk.warehouse_order_ids[index]

      for (let j = 0; j < element.wh_order.length; j++) {
        const elementx = element.wh_order[j];
        useInvoices.items.push(elementx)
      }

    }
  } else if (route.name === 'byforme-invoices') {
    for (let index = 0; index < useInvoices.focusedInvoice.bfm_pk.b4m_order.length; index++) {
      const element = useInvoices.focusedInvoice.bfm_pk.b4m_order[index]
      useInvoices.items.push(element)
    }
  } else {
    for (let index = 0; index < useInvoices.focusedInvoice.sh_pk
      .sh_package
      .length; index++) {
      const element = useInvoices.focusedInvoice.sh_pk
        .sh_package
      [index]
      useInvoices.items.push(element)
    }
  }


}

</script>

<style lang="scss" scoped></style>
