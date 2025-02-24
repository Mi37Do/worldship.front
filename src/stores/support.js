import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useSupportStore = defineStore('support', () => {
  const tickets = ref([])
  const focusedTicket = ref(null)
  const tempMessages = ref(null)
  const getTickets = async (user_id) => {
    try {
      let response = await axios.post(`/Dashboard/view_suport_ticket_API/${user_id}`)
      tickets.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  return { tickets, getTickets, focusedTicket, tempMessages }
})
