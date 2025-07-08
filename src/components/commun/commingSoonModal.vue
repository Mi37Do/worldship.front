<template>
  <input type="checkbox" :checked="useWidget.commingSoon" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="w-full max-w-lg h-fit modal-box flex flex-col p-4 relative">

      <button type="button" @click="useWidget.commingSoon = false"
        class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0 absolute right-3 top-3">
        <times-icon class="w-5 h-5" />
      </button>

      <div class="w-full h-40 flex items-center justify-center text-lg font-semibold uppercase">
        <span>under construction !</span>
      </div>


    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import timesIcon from '@/assets/icons/timesIcon.vue';
const useWidget = useWidgetStore()

</script>

<style lang="scss" scoped></style>
