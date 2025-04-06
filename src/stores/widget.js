import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useWidgetStore = defineStore('widget', () => {
  const openSide = ref(false)
  const orderItems = ref(false)
  const invoiceDetail = ref(false)
  const addWallet = ref(false)
  const addBuyForMe = ref(false)
  const addNote = ref(false)
  const buyForMeInbox = ref(false)
  const returnInbox = ref(false)
  const ship = ref(false)
  const newPayment = ref(false)
  const addCard = ref(false)
  const dateFilter = ref(false)
  const tracking = ref(false)
  const supportTicket = reactive({
    open: false,
    id: null,
    designation: '',
  })
  const addSupport = ref(false)
  const addItem = reactive({
    open: false,
    add: true,
  })
  const addAddressBook = reactive({
    open: false,
    add: true,
  })

  const deleteModal = reactive({
    id: null,
    designation: null,
    open: false,
  })

  const sendBuyForMe = ref(false)

  const userLanguage = ref('en')
  const { locale } = useI18n()

  const toggleLanguage = () => {
    const activeLanguage = localStorage.getItem('user-language')
    if (activeLanguage === 'ar') setLanguage('fr')
    else if (activeLanguage === 'ar') setLanguage('fr')
    else setLanguage('ar')
  }

  const setLanguage = (language) => {
    localStorage.setItem('user-language', language)
    locale.value = language
    userLanguage.value = language
  }

  const getLanguage = () => {
    return localStorage.getItem('user-language')
  }

  return {
    orderItems,
    invoiceDetail,
    addWallet,
    addAddressBook,
    userLanguage,
    toggleLanguage,
    getLanguage,
    setLanguage,
    deleteModal,
    addBuyForMe,
    sendBuyForMe,
    addItem,
    ship,
    addNote,
    returnInbox,
    buyForMeInbox,
    supportTicket,
    addSupport,
    newPayment,
    dateFilter,
    openSide,
    addCard,
    tracking,
  }
})
