<template>
  <div class="w-full h-10 relative overflow-hidden flex items-center transition-all duration-200">

    <button @click="searchQuery" :class="[useWidget.userLanguage === 'ar' ? 'left-1' : ' right-1']"
      class="btn btn-sm bg-primary/10 absolute text-primary hover:bg-primary/20 btn-sm-small ">{{
        $t('commun.search') }}</button>
    <button @click="clearSearch" :class="[
      useWidget.userLanguage === 'ar' ? query ? 'right-1' : '-right-8' : query ? 'left-1' : '-left-8',
      ,
      'btn btn-sm btn-square btn-ghost btn-sm-small  absolute  transition-all duration-200']">
      <times-icon class="w-5 h-5" />
    </button>
    <input type="text" v-model="query" :class="[
      useWidget.userLanguage === 'ar' ? ' pl-20' : ' pr-20',

      useWidget.userLanguage === 'ar' ? query ? 'pr-10' : 'pr-4' : query ? 'pl-10' : 'pl-4',
      'pixa-input w-full transition-all duration-200']">
  </div>
</template>

<script setup>
import timesIcon from '@/assets/icons/timesIcon.vue';
import { useWidgetStore } from '@/stores/widget';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const query = ref('')
const { t } = useI18n()
const emits = defineEmits(['searchQuery'])
const useWidget = useWidgetStore()

const clearSearch = () => {
  query.value = ''
  emits('searchQuery', query.value)
}

const searchQuery = () => {
  emits('searchQuery', query.value)
}
</script>

<style lang="scss" scoped></style>
