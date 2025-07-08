<template>
  <div class="w-full h-full flex flex-col overflow-y-hidden overflow-x-hidden">
    <top-app-bar>
      <template #title>
        <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
          <side-menu />
        </button>
        <span class="pixa-title flex-1">{{ $t('navigation.links.dashboard') }}</span>
      </template>
    </top-app-bar>

    <div :style="backgroundStyle" class="w-full flex-1 py-4 flex flex-col gap-4 overflow-hidden ">
      <div class="w-full h-10 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <div class="w-1 h-6 bg-primary"></div>
          <span class="pixa-title">{{ $t('commun.generalStatistics') }}</span>
        </div>
      </div>

      <div class="w-full flex-1 flex flex-col lg:flex-row-reverse gap-4 overflow-y-auto overflow-x-hidden">

        <div
          class="w-full h-fit lg:w-[400px] xl:w-[550px] bg-white rounded-lg border border-slate-200 flex flex-col items-center gap-4 p-4">

          <div class="w-28 h-28 bg-slate-300 rounded-md p-0.5">
            <img :src="env + useProfile.profile.user.addresse_site.image" alt="" class="w-full h-full object-cover">
          </div>


          <div class="w-full h-fit mt-4 flex flex-col gap-4 uppercase">
            <div class="w-full flex gap-4">
              <span class="w-32 font-semibold my-auto">{{ $t('commun.name') }}</span>
              <span class="flex-1 flex items-center gap-2">
                <span class="flex-1 truncate">{{ useProfile.profile.user.first_name }} {{
                  useProfile.profile.user.last_name
                }}</span>
                <div :class="[copied && typeCopied === 'name' ? 'tooltip' : '']" data-tip="copied">
                  <!--
                  <button
                    @click="copyText(useProfile.profile.user.first_name + ' ' + useProfile.profile.user.last_name, 'name')"
                    class="btn btn-sm btn-square btn-ghost">
                    <copy-icon class="w-5 h-5" />
                  </button> -->
                </div>

              </span>
            </div>

            <div class="w-full flex gap-4">
              <span class="w-32 font-semibold  my-auto">{{ $t('commun.addressLine') }} 1</span>
              <span class="flex-1 flex items-center gap-2">
                <span class="flex-1">{{ useProfile.profile.user.addresse_site.adr }}</span>
                <div :class="[copied && typeCopied === 'adr1' ? 'tooltip' : '']" data-tip="copied">
                  <!--
                  <button @click="copyText(useProfile.profile.user.addresse_site.adr, 'adr1')"
                    class="btn btn-sm btn-square btn-ghost">
                    <copy-icon class="w-5 h-5" />
                  </button>-->
                </div>
              </span>
            </div>

            <div class="w-full flex gap-4">
              <span class="w-32 font-semibold  my-auto">{{ $t('commun.addressLine') }} 2</span>
              <span class="flex-1 flex items-center gap-2">
                <span class="flex-1 truncate">{{ useProfile.profile.user.code
                }}</span>
                <div :class="[copied && typeCopied === 'code' ? 'tooltip' : '']" data-tip="copied">
                  <!--
                  <button @click="copyText(useProfile.profile.user.code, 'code')"
                    class="btn btn-sm btn-square btn-ghost">
                    <copy-icon class="w-5 h-5" />
                  </button>-->
                </div>
              </span>
            </div>

            <div class="w-full flex gap-4">
              <span class="w-32 font-semibold  my-auto">{{ $t('commun.city') }}</span>
              <span class="flex-1 flex items-center gap-2">
                <span class="flex-1 truncate">{{ useProfile.profile.user.addresse_site.city }}</span>
                <div :class="[copied && typeCopied === 'city' ? 'tooltip' : '']" data-tip="copied">
                  <!--
                  <button @click="copyText(useProfile.profile.user.addresse_site.city, 'city')"
                    class="btn btn-sm btn-square btn-ghost">
                    <copy-icon class="w-5 h-5" />
                  </button>-->
                </div>
              </span>
            </div>

            <div class="w-full flex gap-4">
              <span class="w-32 font-semibold  my-auto">{{ $t('commun.state') }}</span>
              <span class="flex-1 flex items-center gap-2">
                <span class="flex-1 truncate">{{ useProfile.profile.user.addresse_site.state }}</span>
                <div :class="[copied && typeCopied === 'state' ? 'tooltip' : '']" data-tip="copied">
                  <!--
                  <button @click="copyText(useProfile.profile.user.addresse_site.state, 'state')"
                    class="btn btn-sm btn-square btn-ghost">
                    <copy-icon class="w-5 h-5" />
                  </button>-->
                </div>
              </span>
            </div>

            <div class="w-full flex gap-4">
              <span class="w-32 font-semibold  my-auto">{{ $t('commun.zip') }}</span>
              <span class="flex-1 flex items-center gap-2">
                <span class="flex-1 truncate">{{ useProfile.profile.user.addresse_site.zip_code }}</span>
                <div :class="[copied && typeCopied === 'zip' ? 'tooltip' : '']" data-tip="copied">
                  <!--
                  <button @click="copyText(useProfile.profile.user.addresse_site.zip_code, 'zip')"
                    class="btn btn-sm btn-square btn-ghost">
                    <copy-icon class="w-5 h-5" />
                  </button>-->
                </div>
              </span>
            </div>

            <div class="w-full flex gap-4">
              <span class="w-32 font-semibold  my-auto">{{ $t('commun.phone') }}</span>
              <span class="flex-1 flex items-center gap-2">
                <span class="flex-1 truncate">{{ formatPhoneNumber(useProfile.profile.user.addresse_site.phone)
                }}</span>
                <div :class="[copied && typeCopied === 'phone' ? 'tooltip' : '']" data-tip="copied">
                  <!--
                  <button @click="copyText(useProfile.profile.user.addresse_site.phone, 'phone')"
                    class="btn btn-sm btn-square btn-ghost">
                    <copy-icon class="w-5 h-5" />
                  </button>-->
                </div>
              </span>
            </div>

          </div>

          <button @click="copyText(useProfile.profile.user.first_name + ' ' + useProfile.profile.user.last_name + ', ' +
            useProfile.profile.user.addresse_site.adr + ', ' +
            useProfile.profile.user.code + ', ' +
            useProfile.profile.user.addresse_site.city + ', ' +
            useProfile.profile.user.addresse_site.state + ', ' +
            useProfile.profile.user.addresse_site.zip_code + ', ' +
            useProfile.profile.user.phone, 'full')" class="btn btn-sm pixa-btn mt-4 btn-primary w-full">copy</button>

        </div>

        <div class="flex-1 h-full flex flex-col gap-3 md:overflow-hidden">
          <div class="w-full h-fit grid xl:grid-cols-2 gap-4">
            <div class="w-full h-fit bg-white rounded-lg border border-slate-200 flex flex-col gap-2 p-4">
              <div class="w-full flex gap-4 items-center">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-primary to-[#0247ab] rounded-md flex items-center justify-center">
                  <WalletIcon class="w-5 h-5 fill-white" />
                </div>
                <span class="text-lg font-semibold uppercase">{{ $t('commun.wallets') }}</span>
              </div>

              <div class="w-full flex gap-4 items-center">
                <span class="w-10"></span>
                <span class="text-2xl font-bold">$ {{ numberFormat(useProfile.profile.wallets.total_wallets) }} </span>
              </div>

            </div>
            <div class="w-full h-fit bg-white rounded-lg border border-slate-200 flex flex-col gap-2 p-4">
              <div class="w-full flex gap-4 items-center">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-primary to-[#0247ab] rounded-md flex items-center justify-center">
                  <box-icon class="w-5 h-5 fill-white" />
                </div>
                <span class="text-lg font-semibold uppercase">{{ $t('navigation.links.inbox') }}</span>
              </div>

              <div class="w-full flex gap-4 items-center">
                <span class="w-10"></span>
                <span class="text-2xl font-bold">0</span>
              </div>

            </div>
            <div class="w-full h-fit bg-white rounded-lg border border-slate-200 flex flex-col gap-2 p-4">
              <div class="w-full flex gap-4 items-center">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-primary to-[#0247ab] rounded-md flex items-center justify-center">
                  <planIcon class="w-5 h-5 fill-white" />
                </div>
                <span class="text-lg font-semibold uppercase">{{ $t('navigation.links.shippements') }}</span>
              </div>

              <div class="w-full flex gap-4 items-center">
                <span class="w-10"></span>
                <span class="text-2xl font-bold">0</span>
              </div>

            </div>
            <div class="w-full h-fit bg-white rounded-lg border border-slate-200 flex flex-col gap-2 p-4">
              <div class="w-full flex gap-4 items-center">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-primary to-[#0247ab] rounded-md flex items-center justify-center">
                  <CartIcon class="w-5 h-5 fill-white" />
                </div>
                <span class="text-lg font-semibold uppercase">{{ $t('navigation.links.buyForMe') }}</span>
              </div>

              <div class="w-full flex gap-4 items-center">
                <span class="w-10"></span>
                <span class="text-2xl font-bold">0</span>
              </div>

            </div>

          </div>

          <div
            class="h-[900px] md:flex-1 bg-white rounded-lg border border-slate-200 flex flex-col gap-2 p-4 overflow-hidden">
            <div class="w-full h-full overflow-y-auto overflow-x-hidden">
              <div v-for="item in useWidget.notifications" :key="item.id"
                class="w-full h-fit border-b flex gap-3 items-center py-1.5 hover:bg-slate-50 px-3">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <PlanIcon v-if="item.type_n === 's' || item.type_n === 'cs'" class="w-5 fill-primary" />
                  <box-icon v-if="item.type_n === 'in'" class="w-5 fill-primary" />
                  <bill-icon v-if="item.type_n === 'i'" class="w-5 fill-primary" />
                  <cart-icon v-if="item.type_n === 'b'" class="w-5 fill-primary" />
                  <support-icon v-if="item.type_n === 't'" class="w-5 fill-primary" />
                </div>
                <div class="flex flex-1 gap-1 flex-col overflow-hidden">
                  <span class="truncate font-semibold">{{ item.name }}</span>
                  <span class="truncate">{{ item.details }} </span>
                </div>

                <span class="flex flex-col">
                  <span>{{ format(item.created_at, 'dd-MM-yyyy') }}</span>
                  <span>{{ format(item.created_at, 'HH:mm') }}</span>
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import planIcon from '@/assets/icons/planIcon.vue';
import topAppBar from '@/components/navigations/topAppBar.vue';
import boxIcon from '@/assets/icons/boxIcon.vue';
import WalletIcon from '@/assets/icons/walletIcon.vue';
import CartIcon from '@/assets/icons/cartIcon.vue';
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/stores/profile';
import PlanIcon from '@/assets/icons/planIcon.vue'
import billIcon from '@/assets/icons/billIcon.vue'
import cartIcon from '@/assets/icons/cartIcon.vue'
import supportIcon from '@/assets/icons/supportIcon.vue'
import { onMounted, ref } from 'vue';
import { formatPhoneNumber } from '@/utils/phoneUtils';
import sideMenu from '@/assets/icons/sideMenu.vue';
import { useWidgetStore } from '@/stores/widget';
import { format } from 'date-fns';

const { t } = useI18n()
const useProfile = useProfileStore()
const copied = ref(false)
const useWidget = useWidgetStore()
const typeCopied = ref('')
const env = import.meta.env.VITE_WORLDSHIP_API

onMounted(async () => {
  await useProfile.getProfile(localStorage.getItem('ws-user-id'))
})

function backgroundStyle() {
  return {
    backgroundImage: `url(${env + useProfile.config_web.backgroud_dash_image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px', // Set a height for the element
    color: 'white' // Optional: text color for better visibility
  };
}

const copyText = async (item, type) => {
  try {
    await navigator.clipboard.writeText(item);
    copied.value = true;
    typeCopied.value = type
    // Optionally, reset the success message after a few seconds
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

</script>

<style lang="scss" scoped></style>
