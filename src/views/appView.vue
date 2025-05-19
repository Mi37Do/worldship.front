<template>
  <div class="drawer lg:drawer-open bg-[#f6f9ff] w-full h-screen overflow-hidden">
    <input id="my-drawer-2" :checked="useWidget.openSide" type="checkbox" class="drawer-toggle" />
    <div :class="[
      useWidget.userLanguage === 'en' ? ' pl-4 lg:pl-0 pr-4' : ' pl-4 lg:pr-0 pr-4',
      'drawer-content flex flex-col items-center justify-center pt-4 w-full h-full overflow-hidden']">

      <commun-calculator />

      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>


    </div>
    <div class="drawer-side">
      <label @click="useWidget.openSide = false" aria-label="close sidebar" class="drawer-overlay"></label>
      <nav class="menu text-base-content h-full w-72 md:p-4 flex flex-col gap-2">
        <div v-auto-animate
          class="w-full flex-1 bg-white shadow-2xl shadow-primary/5 md:rounded-lg border border-slate-200 flex flex-col gap-1 p-4">
          <div class="w-full h-fit border-b border-slate-200 mb-2 flex gap-3 pt-1  justify-center">

            <router-link :to="{ name: 'home' }">
              <img :src="env + useProfile.webConfig.images_logo" class="w-48 " alt="">
            </router-link>
          </div>

          <div class="w-full flex-1 flex flex-col gap-1">

            <router-link :to="{ name: 'dashboard' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <apps-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.dashboard') }}</span>
            </router-link>

            <router-link :to="{ name: 'inbox' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <box-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.inbox') }}</span>
            </router-link>

            <router-link :to="{ name: 'shippements' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <plan-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.shippements') }}</span>
            </router-link>

            <router-link :to="{ name: 'costume-shippements' }"
              class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <plan-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.costumShippements') }}</span>
            </router-link>

            <router-link :to="{ name: 'return' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <redo-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.return') }}</span>
            </router-link>

            <router-link :to="{ name: 'dg' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <exclamation-triangle-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.dangerous') }}</span>
            </router-link>

            <router-link :to="{ name: 'byforme' }" class="btn btn-sm pixa-btn flex gap-3 justify-start btn-ghost">
              <cart-icon class="w-[1.5rem] h-[1.5rem]" />
              <span>{{ $t('navigation.links.buyForMe') }}</span>
            </router-link>

            <button @click="showSubModules = !showSubModules"
              class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <bill-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.invoices') }}</span>
            </button>

            <div v-if="showSubModules" class="w-full h-[5.5rem] pl-4 flex gap-4">
              <span class="w-px h-full bg-slate-300"></span>
              <div class="flex-1 flex flex-col gap-2">
                <router-link :to="{ name: 'warehouse-invoices' }"
                  class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
                  <parcel-icon class="w-5 h-5" />
                  <span>{{ $t('navigation.links.warehouse') }}</span>
                </router-link>
                <router-link :to="{ name: 'byforme-invoices' }"
                  class="btn btn-sm pixa-btn flex gap-3 justify-start btn-ghost">
                  <receipt-icon class="w-5 h-5" />
                  <span>{{ $t('navigation.links.buyForMe') }}</span>
                </router-link>
              </div>
            </div>

            <router-link :to="{ name: 'support' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <calling-icon class="w-5 h-5" />
              <span>{{ $t('navigation.links.support') }}</span>
            </router-link>

            <router-link :to="{ name: 'faqs' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost">
              <question-icon class="w-[1.5rem] h-[1.5rem]" />
              <span>{{ $t('commun.faq') }}</span>
            </router-link>

            <button @click="useWidget.calculator = true" class="btn btn-sm pixa-btn btn-primary">calculator</button>
          </div>

          <router-link :to="{ name: 'profile' }" class="btn btn-sm pixa-btn flex gap-4 justify-start btn-ghost mb-6">
            <user-icon class="w-5" /><span>profile</span>
          </router-link>

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
import billIcon from '@/assets/icons/billIcon.vue';
import boxIcon from '@/assets/icons/boxIcon.vue';
import userIcon from '@/assets/icons/userIcon.vue';
import callingIcon from '@/assets/icons/callingIcon.vue';
import exclamationTriangleIcon from '@/assets/icons/exclamationTriangleIcon.vue';
import planIcon from '@/assets/icons/planIcon.vue';
import redoIcon from '@/assets/icons/redoIcon.vue';
import parcelIcon from '@/assets/icons/parcelIcon.vue';
import receiptIcon from '@/assets/icons/receiptIcon.vue';
import cartIcon from '@/assets/icons/cartIcon.vue';
import questionIcon from '@/assets/icons/questionIcon.vue';
import { onMounted, ref, watch } from 'vue';
import appsIcon from '@/assets/icons/appsIcon.vue';
import { useRoute, useRouter } from 'vue-router';
import { useWidgetStore } from '@/stores/widget';
import { useI18n } from 'vue-i18n';
import { useProfileStore } from '@/stores/profile';
import signoutIcon from '@/assets/icons/signoutIcon.vue';
import communCalculator from '@/components/commun/communCalculator.vue';
import Cookies from 'js-cookie';
import axios from 'axios';

const showSubModules = ref(false)
const route = useRoute()
const { t } = useI18n()
const useWidget = useWidgetStore()
const router = useRouter()
const useProfile = useProfileStore()
const env = import.meta.env.VITE_WORLDSHIP_API

onMounted(() => {
  if (route.name === 'byforme-invoices' || route.name === 'warehouse-invoices') {
    showSubModules.value = true
  } else showSubModules.value = false


})

watch(() => route, () => {
  if (route.name === 'byforme-invoices' || route.name === 'warehouse-invoices') {
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
      background-color: #012970;
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
