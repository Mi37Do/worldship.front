<template>
  <input type="checkbox" id="userDeleteModal" :checked="useWidget.dateFilter" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="modal-box flex flex-col md:max-w-fit h-fit gap-2 items-center justify-center p-4">
      <form @submit.prevent="dateFilter('submit')" class="w-full flex flex-col h-fit gap-4 items-center ">
        <div class="flex items-center justify-between w-full">
          <span class="pixa-title">date filter</span>
          <button type="button" @click="closeModal" class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0">
            <times-icon class="w-5 h-5" />
          </button>
        </div>

        <div class="w-full flex-1 grid md:grid-cols-2 gap-2 mb-2">
          <VDatePicker v-model="dateFilterItem.from" mode="date" borderless expanded />
          <VDatePicker v-model="dateFilterItem.to" :min-date="dateFilterItem.from" mode="date" borderless expanded />
        </div>

        <div class="w-full grid grid-cols-2 gap-2">
          <button :disabled="loadingFilter" type="submit" class="btn btn-sm pixa-btn btn-primary border-0 w-full">

            <span v-if="loadingFilter" class="loading loading-ring loading-sm"></span>
            <span v-else>filter</span>
          </button>
          <button :disabled="loadingFilter" type="button" @click="dateFilter('reset')"
            class="btn btn-sm pixa-btn pixa-btn-nofloat border-0 w-full">

            <span v-if="loadingFilter" class="loading loading-ring loading-sm"></span>
            <span v-else>reset filter</span>
          </button>
        </div>


      </form>

    </div>
  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget'
import paperClipIcon from '@/assets/icons/paperClipIcon.vue';
import timesIcon from '@/assets/icons/timesIcon.vue';
import { reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { objectToFormData } from '@/utils/formDataUtils'
import { useInboxStore } from '@/stores/inbox';

const emits = defineEmits(['filterItems'])
const useWidget = useWidgetStore()
const loadingFilter = ref(false)
const useInbox = useInboxStore()
const dateFilterItem = reactive(
  {
    from: new Date(),
    to: null
  }
)
const route = useRoute()

const closeModal = () => {
  Object.assign(dateFilterItem, {
    from: new Date(),
    to: null
  })
  dateFilter('reset')
  useWidget.dateFilter = false
}

const dateFilter = (type) => {
  loadingFilter.value = true
  if (type === 'reset') {
    Object.assign(dateFilterItem, {
      from: new Date(),
      to: null
    })
  }
  emits('filterItems', dateFilterItem)
}

watch(() => useWidget.dateFilter, () => {
  if (useWidget.dateFilter) return
  else
    loadingFilter.value = false
})

</script>


<style lang="scss" scoped></style>
