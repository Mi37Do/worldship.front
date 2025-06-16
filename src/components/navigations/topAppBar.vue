<template>
  <div
    class="w-full h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-between pr-3 pl-4 shadow-2xl shadow-primary/5 gap-4">
    <slot name="title"></slot>

    <div class="flex gap-1 items-center flex-1">
      <div class="hidden lg:flex flex-col mr-4 flex-1 overflow-hidden">
        <router-link :to="{ name: 'add' }" class="flex gap-2 items-center justify-end">
          <span class="font-semibold">$ {{ numberFormat(useProfile.profile.wallets.total_wallets) }} </span>
          <wallet-icon class="w-5 h-5 fill-slate-500" />
        </router-link>

      </div>

      <span class="w-px h-8 bg-gray-200 mr-2"></span>

      <language-switcher />

      <notification-dropdown />

      <router-link :to="{ name: 'profile' }" class="btn btn-sm pixa-btn w-10 p-0 btn-ghost hidden lg:flex">
        <user-icon class="w-5 h-5" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import copyIcon from '@/assets/icons/copyIcon.vue';
import notificationDropdown from './notificationDropdown.vue';
import walletIcon from '@/assets/icons/walletIcon.vue';
import userIcon from '@/assets/icons/userIcon.vue';
import bellIcon from '@/assets/icons/bellIcon.vue';
import languageSwitcher from './languageSwitcher.vue'
import { useProfileStore } from '@/stores/profile';

const useProfile = useProfileStore()

</script>

<style lang="scss" scoped></style>
