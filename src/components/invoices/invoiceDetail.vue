<template>
  <input type="checkbox" :checked="useWidget.invoiceDetail" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="w-full max-w-2xl h-full modal-box flex flex-col p-4">



      <div class="h-full w-full  flex flex-col">
        <div class="w-full h-14 flex items-center justify-between pb-4 border-b border-slate-200">
          <span class="pixa-title">invoice</span>
          <button @click="() => {
            useWidget.invoiceDetail = false
            useInvoices.focusedInvoice = null
          }" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>
        <div v-if="!useInvoices.focusedInvoice" class="w-full flex-1 flex justify-center items-center">
          <span class="loading loading-ring loading-sm"></span>
        </div>

        <div v-else ref="pdfContent" class="w-full flex-1 overflow-auto border-b border-slate-200 py-4">

          <!--
        <div class="w-full border boder-slate-200 rounded-md min-h-full p-4 flex flex-col gap-4 uppercase">
          <div class="w-full h-12 mb-2 flex items-center gap-3">
            <div
              class="w-8 h-8 bg-primary rounded-md text-white flex items-center justify-center uppercase font-semibold ">
              ws</div>
            <span class="text-xl font-semibold text-primary uppercase">worldship</span>

            <span class="flex-1 text-right">date: {{ format(new Date(), 'dd-MM-yyyy | hh:mm') }}</span>
          </div>
          <span class="text-center font-bold text-2xl">invoice</span>

          <div class="w-full h-fit mt-4 grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <div class="flex gap-2">
                <span class="w-16 font-semibold">to:</span>
                <span>laksari salah eddine</span>
              </div>
              <div class="flex gap-2">
                <span class="w-16 font-semibold">city:</span>
                <span>baghdad</span>
              </div>
              <div class="flex gap-2">
                <span class="w-16 font-semibold">phone:</span>

                <span>{{ formatPhoneNumber('+213798426898') }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex gap-2">
                <span class="w-16 font-semibold">n°:</span>
                <span>#00000015</span>
              </div>
              <div class="flex gap-2">
                <span class="w-16 font-semibold">order id:</span>
                <span>#00000015</span>
              </div>
            </div>
          </div>



          <div class="w-full mt-4 flex flex-col">
            <div class="w-full h-14 border-b border-slate-200 grid grid-cols-4 gap-4 font-semibold">
              <span class="my-auto">qty</span>
              <span class="my-auto">Items</span>
              <span class="my-auto">Hs-Code</span>
              <span class="my-auto">Subtotal</span>
            </div>

            <div v-for="item in 4" :key="item" class="w-full h-12 border-b border-slate-200 grid grid-cols-4 gap-4">
              <span class="my-auto">{{ item }}</span>
              <span class="my-auto">Item {{ item }}</span>
              <span class="my-auto">Hs-{{ item }}</span>
              <span class="my-auto">{{ numberFormat(item) }}$</span>
            </div>
          </div>


          <div class="w-full h-fit mt-4 grid grid-cols-2 gap-4">
            <span></span>

            <div class="w-full grid grid-cols-2 gap-2">
              <span class="font-semibold h-10 flex items-center">Subtotal</span>
              <span class="text-right my-auto">{{ numberFormat(2965) }} $</span>

              <span class="font-semibold h-10 flex items-center">Insurance </span>
              <span class="text-right my-auto">{{ numberFormat(2965) }} $</span>

              <span class="font-semibold h-10 flex items-center">Coins </span>
              <span class="text-right my-auto">{{ numberFormat(0) }} $</span>

              <span class="font-semibold h-10 flex items-center">Shipping Cost </span>
              <span class="text-right my-auto">{{ numberFormat(2965) }} $</span>

              <span class="font-bold h-10 flex items-center">Total </span>

              <span class="text-right my-auto font-bold">{{ numberFormat(2965) }} $</span>
            </div>
          </div>

        </div>
 -->


          <div class="w-full border boder-slate-200 rounded-md min-h-full p-4 flex flex-col gap-4 uppercase">
            <div class="w-full mb-2 flex items-center justify-between gap-3">

              <span class="flex flex-col h-fit">
                <span class="font-semibold">issue date:</span>
                <span class="capitalize">{{ format(useInvoices.focusedInvoice.updated_at, 'MMM-dd-yyyy') }}</span>
              </span>

              <div class="flex flex-col gap-1 items-end">

                <img :src="useProfile.logoBase64" class="w-20" alt="">

                <span class="text-xs">{{ useProfile.webConfig.email }} {{ useProfile.webConfig.phone }} </span>
              </div>

            </div>

            <span class="w-full h-2 bg-primary"></span>

            <span class="font-bold text-2xl my-4">invoice {{ useInvoices.focusedInvoice.code }}</span>

            <div class="w-full grid grid-cols-3 gap-2">
              <span v-for="i in 3" :key="i" class="w-full h-px bg-slate-300"></span>
            </div>

            <div class="w-full h-fit mt-4 grid grid-cols-2 gap-4">

              <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                  <span class="w-16 font-semibold">costumer:</span>
                </div>

                <span>{{ route.name === 'warehouse-invoices' ? useInvoices.focusedInvoice.wh_pk.user.first_name + ' ' +
                  useInvoices.focusedInvoice.wh_pk.user.last_name :
                  useInvoices.focusedInvoice.bfm_pk.user.first_name +
                  useInvoices.focusedInvoice.bfm_pk.user.last_name }} </span>

                <span>{{ route.name === 'warehouse-invoices' ? useInvoices.focusedInvoice.wh_pk.user.email :
                  useInvoices.focusedInvoice.bfm_pk.user.email }}</span>

                <span>{{ formatPhoneNumber(route.name === 'warehouse-invoices' ?
                  useInvoices.focusedInvoice.wh_pk.user.phone :
                  useInvoices.focusedInvoice.bfm_pk.user.phone) }}</span>
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                  <span class="w-16 font-semibold">payment:</span>
                </div>

                <span class="capitalize">{{ format(useInvoices.focusedInvoice.updated_at, 'MMM-dd-yyyy') }}</span>

                <span>$ {{ numberFormat(route.name === 'warehouse-invoices' ?
                  useInvoices.focusedInvoice.wh_pk.total_price :
                  useInvoices.focusedInvoice.bfm_pk.total_price) }}</span>
              </div>
            </div>



            <div class="w-full mt-4 flex flex-col">
              <div class="w-full h-14 border-b border-slate-200 grid grid-cols-5 gap-4 font-semibold">
                <span class="my-auto col-span-2">Items</span>
                <span class="my-auto">qty</span>
                <span class="my-auto">price</span>
                <span class="my-auto">amount</span>
              </div>

              <div v-for="item in useInvoices.items
" :key="item.id" class="w-full h-12 border-b border-slate-200 grid grid-cols-5 gap-4">
                <span class="my-auto col-span-2">{{ route.name === 'warehouse-invoices' ? item.name_id.name : item.name
                  }}</span>
                <span class="my-auto">{{ item.qty
                  }}</span>
                <span class="my-auto">$ {{ numberFormat(item.price) }}</span>
                <span class="my-auto">$ {{ numberFormat(item.qty * item.price) }}</span>
              </div>
            </div>


            <div class="w-full h-fit mt-4 grid grid-cols-2 gap-4">
              <span></span>

              <div class="w-full grid grid-cols-2 gap-2">
                <span class="font-semibold h-10 flex items-center">total due</span>
                <span class="text-right my-auto"> $ {{ numberFormat(route.name === 'warehouse-invoices' ?
                  useInvoices.focusedInvoice.wh_pk.total_price : useInvoices.focusedInvoice.bfm_pk.total_price) }}
                </span>


              </div>
            </div>

          </div>


        </div>
        <button v-if="useInvoices.focusedInvoice" @click="generatePDF"
          class="btn btn-sm pixa-btn w-full btn-primary mt-4">print</button>
      </div>


    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import timesIcon from '@/assets/icons/timesIcon.vue';
import { format } from 'date-fns';
import { formatPhoneNumber } from '@/utils/phoneUtils';
import { useInvoicesStore } from '@/stores/invoices';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useProfileStore } from '@/stores/profile';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';


const useInvoices = useInvoicesStore()
const useWidget = useWidgetStore()
const route = useRoute()
const printableDiv = ref(null)
const useProfile = useProfileStore()
const pdfContent = ref(null)

const generatePDF = async () => {
  const element = pdfContent.value;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save('generated.pdf');
};
</script>

<style lang="scss" scoped></style>
