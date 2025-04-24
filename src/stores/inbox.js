import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRoute } from 'vue-router'
//import axiosInstance from '@/utils/axiosInstance'

export const useInboxStore = defineStore('inbox', () => {
  const inboxs = ref([])
  const focusedInbox = ref(null)
  const shippements = ref([])
  const returns = ref([])
  const focusedShippement = ref(null)
  const items = ref([])
  const focusedBuyForMe = ref(null)
  const inboxsToShip = ref([])
  const filtredShippements = ref([])
  const filtredReturns = ref([])
  const filtredInboxs = ref([])
  const filterBuyForMes = ref([])
  const buyForMes = ref([])
  const packageOptions = ref([])
  const focusedItem = ref(null)
  const route = useRoute()
  const costumeShipItem = ref(null)

  const getInbox = async (user_id) => {
    let response = null
    inboxsToShip.value = []
    try {
      if (user_id) {
        response = await axios.get(`/Warehouse/InBoxsAll/${user_id}/`)
        inboxs.value = response.data.reverse()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getShippements = async (user_id, id) => {
    shippements.value = []
    packageOptions.value = null
    let response = null
    try {
      if (user_id) {
        response = await axios.get(
          route.name === 'shippements'
            ? `/Warehouse/ShipmentsAll/${user_id}/`
            : `/Shipments/ShipmentsAll/${user_id}/`,
        )
        shippements.value = response.data
      }
      if (id) {
        response = await axios.get(
          route.name === 'shippement'
            ? `/Warehouse/Shipments/${id}/`
            : `/Shipments/Shipments/${id}/`,
        )
        focusedShippement.value = response.data.shippments_details
        packageOptions.value = response.data.package_options
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getReturns = async (user_id) => {
    let response = null
    try {
      if (user_id) {
        response = await axios.get(`/Warehouse/ReturnInBoxsAll/${user_id}/`)
        returns.value = response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getBuyForMes = async (user_id, id) => {
    let response = null
    try {
      if (user_id) {
        response = await axios.get(`/BuyForMe/BuyForMesAll/${user_id}/`)
        buyForMes.value = response.data
        filterBuyForMes.value = response.data
      }
      if (id) {
        response = await axios.get(`/BuyForMe/BuyForMes/${id}/`)
        focusedBuyForMe.value = response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    inboxs,
    getInbox,
    shippements,
    getShippements,
    focusedShippement,
    returns,
    getReturns,
    items,
    getBuyForMes,
    buyForMes,
    focusedBuyForMe,
    focusedInbox,
    packageOptions,
    focusedItem,
    inboxsToShip,
    filterBuyForMes,
    filtredShippements,
    filtredInboxs,
    filtredReturns,
    costumeShipItem,
  }
})
