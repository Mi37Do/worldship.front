<template>


  <div class="drawer lg:drawer-open bg-[#f6f9ff] w-full h-screen overflow-hidden">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div :class="[
      useWidget.userLanguage === 'en' ? ' pl-4 lg:pl-0 pr-4' : ' pl-4 lg:pr-0 pr-4',
      'drawer-content flex flex-col items-center justify-center pt-4 w-full h-full overflow-hidden']">

      <div class="w-full h-full flex flex-col overflow-hidden">
        <top-app-bar>
          <template #title>
            <span class="pixa-title">{{ $t('commun.profile') }}</span>
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
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <nav class="text-base-content h-full w-72 p-4">
        <div v-auto-animate
          class="w-full h-full bg-white shadow-2xl shadow-primary/5 rounded-lg border border-slate-200 flex flex-col gap-1 p-4">
          <div class="w-full h-12 border-b border-slate-200 mb-2 flex gap-3 pt-1">
            <div
              class="w-8 h-8 bg-primary rounded-md text-white flex items-center justify-center uppercase font-semibold ">
              ws</div>
            <span class="text-xl font-semibold text-primary uppercase">worldship</span>
          </div>


          <button @click="() => {
            router.push({ name: 'app' })
          }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-primary mt-1">
            <angle-right-icon :class="[useWidget.userLanguage === 'en' ? ' rotate-180' : '',]" class="w-5 h-5" />
            <span>{{ $t('commun.goBack') }}</span>
          </button>

          <router-link :to="{ name: 'wallets' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost
          mt-3">
            <wallet-icon class="w-5 h-5" />
            <span>{{ $t('commun.wallets') }}</span>
          </router-link>

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


import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/stores/profile';

const showSubModules = ref(false)
const useWidget = useWidgetStore()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.name === 'transfers' || route.name === 'cards') {
    showSubModules.value = true
  } else showSubModules.value = false

})

watch(() => route, () => {
  if (route.name === 'transfers' || route.name === 'cards') {
    showSubModules.value = true
  } else showSubModules.value = false
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
