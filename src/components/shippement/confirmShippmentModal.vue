<template>
  <input type="checkbox" :checked="useWidget.confirmShip" class="modal-toggle" />
  <div class="modal" role="dialog">
    <div class="w-full max-w-lg h-fit modal-box flex flex-col p-4 relative">

      <button type="button" @click="useWidget.confirmShip = false"
        class="btn btn-sm pixa-btn w-10 pixa-btn-nofloat p-0 absolute right-3 top-3">
        <times-icon class="w-5 h-5" />
      </button>

      <div class="w-full h-40 flex flex-col gap-3 items-center justify-center ">
        <span class="text-md font-semibold uppercase mt-14">do you really need to ship this !</span>

        <div class="w-full grid grid-cols-2 gap-3 mt-auto">
          <button @click="createCostume" class="btn btn-primary btn-sm pixa-btn">confirm</button>
          <button @click="closeModal" class="btn pixa-btn-nofloat btn-sm pixa-btn">discard</button>
        </div>
      </div>


    </div>

  </div>
</template>

<script setup>
import { useWidgetStore } from '@/stores/widget';
import timesIcon from '@/assets/icons/timesIcon.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const useWidget = useWidgetStore()

const router = useRouter()

const createCostume = async () => {

  try {
    let response = await axios.get(`/Shipments/create_ship_API/${useWidget.costumeShip.weight}/${useWidget.costumeShip.l}/${useWidget.costumeShip.w}/${useWidget.costumeShip.h}/${useWidget.costumeShip.weightUnit}/${useWidget.costumeShip.lengthUnit}/${localStorage.getItem('ws-user-id')}/`)
    closeModal()
    router.push({ name: 'costume-shippement', params: { id: response.data.result } })
  } catch (error) {
    console.error(error)
  }
}


const closeModal = () => {

  useWidget.confirmShip = false
  useWidget.costumeShip = null

}
</script>

<style lang="scss" scoped></style>
