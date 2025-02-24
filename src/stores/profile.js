import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Cookies from 'js-cookie'
import { objectToFormData } from '@/utils/formDataUtils'
import { useRouter } from 'vue-router'

export const useProfileStore = defineStore('profile', () => {
  const refferals = ref(null)
  const wallets = ref(null)
  const profile = ref(null)
  const isAuth = ref(false)
  const coins = ref(null)
  const router = useRouter()
  const totalCoins = ref(null)
  const webConfig = ref(null)

  const getRefferals = async (user_id) => {
    let response = null
    try {
      if (user_id) {
        response = await axios.get(`/Dashboard/view_referrals_API/${user_id}`)
        refferals.value = response.data
        console.log(refferals.value)
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

    try {
      let response = await axios.post(`/login_API`, formData)
      Cookies.set('token', response.data.token)
      localStorage.setItem('ws-user-id', response.data.user.id)
      router.push({ name: 'app' })
    } catch (error) {
      console.error(error)
    }
  }

  const getWebConfig = async () => {
    let response = await axios.get(`/config_web_API`)
    webConfig.value = response.data.config_web
    console.log(webConfig.value)
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
  }
})
