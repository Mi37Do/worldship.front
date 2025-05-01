import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
//import axiosInstance from '@/utils/axiosInstance'

export const useBookStore = defineStore('book', () => {
  const addresses = ref([])
  const filtredAdresses = ref([])
  const cities = ref([])
  const focusedBook = ref(null)
  const tempBooks = ref([])
  const adrFrom = ref([])
  const adrTo = ref([])

  const getAddresses = async (user_id) => {
    let response = null
    try {
      if (user_id) {
        response = await axios.get(`/Dashboard/address_book_dash_API/${user_id}`)
        console.log(response.data.address_book)

        addresses.value = response.data.address_book
        cities.value = response.data.citys.map((item) => ({
          id: item.id,
          designation: item.name,
          designation_ar: item.name_ar,
          code: item.code,
        }))

        filtredAdresses.value = addresses.value

        localStorage.setItem('adr', JSON.stringify(addresses.value))
        localStorage.setItem('cities', JSON.stringify(cities.value))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const filterAdr = () => {
    adrFrom.value = JSON.parse(localStorage.getItem('adr')).filter((item) => item.type === 'from')

    adrFrom.value = adrFrom.value.map((i) => {
      return {
        id: i.id,
        designation: i.name,
      }
    })

    adrTo.value = JSON.parse(localStorage.getItem('adr')).filter((item) => item.type === 'to')

    adrTo.value = adrTo.value.map((i) => {
      return {
        id: i.id,
        designation: i.name,
      }
    })
  }

  return { addresses, getAddresses, cities, tempBooks, filterAdr, adrFrom, adrTo, filtredAdresses }
})
