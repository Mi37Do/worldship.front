import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
//import axiosInstance from '@/utils/axiosInstance'

export const useBookStore = defineStore('book', () => {
  const addresses = ref([])
  const cities = ref([])
  const focusedBook = ref(null)
  const tempBooks = ref([])

  const getAddresses = async (user_id) => {
    let response = null
    try {
      if (user_id) {
        response = await axios.get(`/Dashboard/address_book_dash_API/${user_id}`)
        addresses.value = response.data.address_book
        console.log(response.data.citys)

        cities.value = response.data.citys.map((item) => ({
          id: item.id,
          designation: item.name,
          designation_ar: item.name_ar,
          code: item.code,
        }))
        console.log(cities.value)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { addresses, getAddresses, cities, tempBooks }
})
