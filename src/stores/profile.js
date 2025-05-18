import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { objectToFormData } from '@/utils/formDataUtils'
import { useRouter } from 'vue-router'
import { useBookStore } from './addressBook'

export const useProfileStore = defineStore('profile', () => {
  const refferals = ref(null)
  const wallets = ref(null)
  const profile = ref(null)
  const isAuth = ref(false)
  const coins = ref(null)
  const router = useRouter()
  const totalCoins = ref(null)
  const sponsors = ref(null)
  const services = ref(null)
  const webConfig = ref(null)
  const prohibItems = ref(null)
  const logoBase64 = ref('')
  const locations = ref([])
  const countries = ref([])

  const useBook = useBookStore()

  const loginError = reactive({
    open: false,
    message: '',
  })

  const env = import.meta.env.VITE_WORLDSHIP_API

  const getRefferals = async (user_id) => {
    let response = null
    try {
      if (user_id) {
        response = await axios.get(`/Dashboard/view_referrals_API/${user_id}`)
        refferals.value = response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getProfile = async (user_id) => {
    if (Cookies.get('token')) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + Cookies.get('token')
      let response = null
      try {
        if (user_id) {
          response = await axios.get(`/Dashboard/view_profile_API/${user_id}`)
          isAuth.value = true

          profile.value = response.data

          useBook.addresses = JSON.parse(localStorage.getItem('adr'))

          useBook.cities = JSON.parse(localStorage.getItem('cities'))

          wallets.value = response.data.wallets.wallet_details.reverse()
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      isAuth.value = false
      router.push({ name: 'login' })
    }
  }

  const getCoins = async (user_id) => {
    let response = null
    try {
      if (user_id) {
        response = await axios.get(`/Dashboard/view_coins_API/${user_id}`)
        totalCoins.value = response.data.coins.total_coins
        coins.value = response.data.coins
      }
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (user, saveData) => {
    let formData = objectToFormData(user)

    if (saveData) {
      localStorage.setItem('ws-user', user.username)
      localStorage.setItem('ws-password', user.password)
      localStorage.setItem('ws-saved', saveData)
    }

    Object.assign(loginError, {
      open: false,
      message: '',
    })

    try {
      let response = await axios.post(`/login_API`, formData)
      console.log(response)
      if (response.data.rslt === 0) {
        Object.assign(loginError, {
          open: true,
          message: 'invalide credentials, please retry login',
        })
        console.log('error')
      } else {
        Cookies.set('token', response.data.token)
        localStorage.setItem('ws-user-id', response.data.user.id)

        await useBook.getAddresses(response.data.user.id)

        router.push({ name: 'app' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getWebConfig = async () => {
    let response = await axios.get(`/config_web_API`)
    console.log(response.data.config_web.info_inbox)

    services.value = response.data.services
    webConfig.value = response.data.config_web
    sponsors.value = response.data.sponsor
    prohibItems.value = response.data.prohibited_items
    countries.value = response.data.countries
    countries.value = countries.value.map((item) => {
      return {
        id: item.id,
        designation: item.name,
        designation_ar: item.name_ar,
      }
    })
    locations.value = response.data.pick_up_local

    let responseImage = await fetch(env + webConfig.value.images_logo)
    if (!responseImage.ok) {
      throw new Error('Network response was not ok')
    }
    const blob = await responseImage.blob()
    const reader = new FileReader()

    reader.onloadend = () => {
      logoBase64.value = reader.result // This will be the Base64 string
    }

    reader.readAsDataURL(blob)
  }

  return {
    refferals,
    getRefferals,
    profile,
    getProfile,
    coins,
    getCoins,
    wallets,
    totalCoins,
    login,
    isAuth,
    getWebConfig,
    webConfig,
    logoBase64,
    services,
    prohibItems,
    sponsors,
    locations,
    loginError,
    countries,
  }
})
