<template>


  <div class="drawer lg:drawer-open bg-[#f6f9ff] w-full h-screen overflow-hidden">
    <input id="my-drawer-2" :checked="useWidget.openSide" type="checkbox" class="drawer-toggle" />
    <div :class="[
      useWidget.userLanguage === 'en' ? ' pl-4 lg:pl-0 pr-4' : ' pl-4 lg:pr-0 pr-4',
      'drawer-content flex flex-col items-center justify-center pt-4 w-full h-full overflow-hidden']">

      <div class="w-full h-full flex flex-col overflow-hidden">
        <top-app-bar>
          <template #title>

            <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost md:hidden">
              <side-menu />
            </button>
            <span class="pixa-title flex-1">{{ $t('commun.profile') }}</span>
          </template>
        </top-app-bar>


        <div class="w-full flex-1 overflow-auto pt-4">
          <!--  -->
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </div>
      </div>


    </div>
    <div class="drawer-side">
      <label @click="useWidget.openSide = false" aria-label="close sidebar" class="drawer-overlay"></label>
      <nav class="text-base-content h-full w-72 md:p-4">
        <div v-auto-animate
          class="w-full h-full bg-white shadow-2xl shadow-primary/5 md:rounded-lg border border-slate-200 flex flex-col gap-1 p-4">
          <div class="w-full h-fit border-b border-slate-200 mb-2 flex gap-3 pt-1  justify-center">
            <img :src="env + useProfile.webConfig.images_logo" class="w-48 " alt="">
          </div>

          <div class="w-full flex-1 flex flex-col gap">


            <button @click="() => {
              router.push({ name: 'app' })
            }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-primary mt-1">
              <angle-right-icon :class="[useWidget.userLanguage === 'en' ? ' rotate-180' : '',]" class="w-5 h-5" />
              <span>{{ $t('commun.goBack') }}</span>
            </button>

            <router-link :to="{ name: 'user' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost
          mt-3">
              <userIcon class="w-5 h-5" />
              <span>{{ $t('commun.profile') }}</span>
            </router-link>



            <button @click="showWallet = !showWallet" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <wallet-icon class="w-5 h-5" />
              <span>{{ $t('commun.wallets') }}</span>
            </button>

            <div v-if="showWallet" class="w-full h-[5.5rem] pl-4 flex gap-4">
              <span class="w-px h-full bg-slate-300"></span>
              <div class="flex-1 flex flex-col gap-2">
                <router-link :to="{ name: 'add' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
                  <addWallet class="w-5 h-5" />
                  <span>{{ $t('commun.addWallet') }}</span>
                </router-link>
                <router-link :to="{ name: 'history' }" class="btn btn-sm pixa-btn flex gap-3 justify-start btn-ghost">
                  <ListIcon class="w-5 h-5" />
                  <span>{{ $t('commun.history') }}</span>
                </router-link>
              </div>
            </div>

            <router-link :to="{ name: 'address-book' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <book-icon class="w-5 h-5" />
              <span>{{ $t('commun.addressBook') }}</span>
            </router-link>

            <router-link :to="{ name: 'coins' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <usd-circle-icon class="w-5 h-5" />
              <span>{{ $t('commun.coins') }}</span>
            </router-link>

            <router-link :to="{ name: 'referrals' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <users-icon class="w-5 h-5" />
              <span>{{ $t('commun.referrals') }}</span>
            </router-link>

            <button @click="showSubModules = !showSubModules"
              class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <transaction-icon class="w-5 h-5" />
              <span>{{ $t('commun.cards') }} & {{ $t('commun.transfers') }}</span>
            </button>

            <div v-if="showSubModules" class="w-full h-[5.5rem] pl-4 flex gap-4">
              <span class="w-px h-full bg-slate-300"></span>
              <div class="flex-1 flex flex-col gap-2">
                <router-link :to="{ name: 'cards' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
                  <CreditCardIcon class="w-5 h-5" />
                  <span>{{ $t('commun.cards') }}</span>
                </router-link>
                <router-link :to="{ name: 'transfers' }" class="btn btn-sm pixa-btn flex gap-3 justify-start btn-ghost">
                  <exchange-icon class="w-5 h-5" />
                  <span>{{ $t('commun.transfers') }}</span>
                </router-link>
              </div>
            </div>


          </div>

          <button @click="async () => {
            let response = await axios.get(`/logout_API`)
            Cookies.remove('token')
            router.push({ name: 'login' })
          }" class="btn btn-sm pixa-btn flex justify-start bv red-btn-ghost">
            <signout-icon class="w-5 h-5" />
            <span>signout</span>
          </button>

        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import topAppBar from '@/components/navigations/topAppBar.vue';
import walletIcon from '@/assets/icons/walletIcon.vue';
import usdCircleIcon from '@/assets/icons/usdCircleIcon.vue';
import bookIcon from '@/assets/icons/bookIcon.vue';
import CreditCardIcon from '@/assets/icons/creditCardIcon.vue';
import questionIcon from '@/assets/icons/questionIcon.vue';
import usersIcon from '@/assets/icons/usersIcon.vue';
import transactionIcon from '@/assets/icons/transactionIcon.vue';
import exchangeIcon from '@/assets/icons/exchangeIcon.vue';
import angleRightIcon from '@/assets/icons/angleRightIcon.vue';
import userIcon from '@/assets/icons/userIcon.vue';
import addWallet from '@/assets/icons/addWallet.vue';
import signoutIcon from '@/assets/icons/signoutIcon.vue';

import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/stores/profile';
import sideMenu from '@/assets/icons/sideMenu.vue';
import ListIcon from '@/assets/icons/listIcon.vue';

const showWallet = ref(false)
const showSubModules = ref(false)
const useWidget = useWidgetStore()
const { t } = useI18n()
const route = useRoute()
const useProfile = useProfileStore()
const router = useRouter()
const env = import.meta.env.VITE_WORLDSHIP_API

onMounted(async () => {
  if (route.name === 'transfers' || route.name === 'cards') {
    showSubModules.value = true
  } else showSubModules.value = false

})

watch(() => route, () => {
  if (route.name === 'transfers' || route.name === 'cards') {
    showSubModules.value = true
  } else showSubModules.value = false

  if (route.name === 'add' || route.name === 'history') {
    showWallet.value = true
  } else showWallet.value = false
}, { deep: true })
</script>

<style lang="scss" scoped>
nav {
  a {
    color: #577399;
    fill: #577399;

    &.router-link-exact-active {
      background-color: #0056d3;
      color: #fff;
      fill: #fff;
    }

    &.router-link-active {
      background-color: rgba($color: #0056d3, $alpha: 0.1);
      color: #012970;
      fill: #012970;
    }
  }
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease-out;
}
</style>
