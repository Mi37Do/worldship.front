import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useInvoicesStore = defineStore('invoices', () => {
  const invoices = ref([])
  const focusedInvoice = ref(null)
  const transactions = ref([])
  const cards = ref([])
  const items = ref([])
  const focusedCard = ref(null)

  const getInvoices = async (type, userId, invoiceId) => {
    try {
      if (type === 'bfm') {
        if (userId) {
          const response = await axios.get(`/Invoice/BFMInvoiceAll/${userId}/`)
          invoices.value = response.data
        } else {
          const response = await axios.get(`/Invoice/BFMInvoice/${invoiceId}/`)
          focusedInvoice.value = response.data
        }
      } else if (type === 'cstm') {
        if (userId) {
          const response = await axios.get(`/Invoice/CuShipInvoiceAll/${userId}/`)
          invoices.value = response.data
        } else {
          const response = await axios.get(`/Invoice/CuShipInvoice/${invoiceId}/`)
          focusedInvoice.value = response.data
        }
      } else {
        if (userId) {
          const response = await axios.get(`/Invoice/ShipInvoiceAll/${userId}/`)
          invoices.value = response.data
        } else {
          const response = await axios.get(`/Invoice/ShipInvoice/${invoiceId}/`)
          focusedInvoice.value = response.data
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getTransactions = async (userId) => {
    try {
      const response = await axios.get(`/Dashboard/TransactionAll/${userId}/`)
      transactions.value = response.data
    } catch (error) {}
  }

  const getCards = async (userId) => {
    try {
      const response = await axios.get(`/Dashboard/CardsAll/${userId}/`)
      cards.value = response.data
    } catch (error) {}
  }

  return {
    invoices,
    focusedInvoice,
    transactions,
    cards,
    getInvoices,
    getTransactions,
    getCards,
    items,
    focusedCard,
  }
})
