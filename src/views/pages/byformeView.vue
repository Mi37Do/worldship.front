<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <top-app-bar>
      <template #title>
        <button @click="useWidget.openSide = true" class="btn btn-sm btn-square btn-ghost  md:hidden">
          <side-menu />
        </button>
        <span class="pixa-title flex-1">{{ $t('navigation.links.buyForMe') }}</span>
      </template>
    </top-app-bar>

    <div class="w-full flex-1 overflow-hidden">
      <router-view></router-view>
    </div>

  </div>
</template>

<script setup>
import topAppBar from '@/components/navigations/topAppBar.vue';
import item from '@/components/byforme/item.vue';
import PlusIcon from '@/assets/icons/plusIcon.vue';
import itemsModal from '@/components/shippement/itemsModal.vue';
import { useWidgetStore } from '@/stores/widget';
import { useInboxStore } from '@/stores/inbox';
import { onMounted, ref } from 'vue';
import sideMenu from '@/assets/icons/sideMenu.vue';

const useWidget = useWidgetStore()
const loading = ref(true)

onMounted(async () => {

})
</script>

<style lang="scss" scoped></style>
