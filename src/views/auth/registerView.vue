<template>
  <div class="w-full md:h-screen bg-slate-100 flex items-center justify-center">
    <form @submit.prevent="registration()"
      class="w-full md:w-fit h-fit bg-white rounded-lg border border-slate-200 grid md:grid-cols-2 gap-2 px-3 py-9 md:p-3">
      <div class="w-full flex flex-col items-center gap-4  md:col-span-2">
        <img :src="env + useProfile.webConfig.images_logo" class="w-48 flex items-center justify-center" alt="">

        <span class="uppercase font-semibold text-lg my-4">{{ t('commun.register') }}</span>
      </div>



      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.first_name') }} <span class="text-red-500">*</span></span>
        </div>
        <input type="text" required v-model="itemToAdd.first_name"
          class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
      </label>


      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.last_name') }} <span class="text-red-500">*</span></span>
        </div>
        <input type="text" required v-model="itemToAdd.last_name"
          class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
      </label>


      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.email') }} <span class="text-red-500">*</span></span>
        </div>
        <input type="text" required v-model="itemToAdd.email"
          class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
      </label>


      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.phone') }} <span class="text-red-500">*</span></span>
        </div>
        <div class="flex gap-2">
          <commun-combobox :list="phoneInd" :top="true" :selected="itemToAdd.ph_ind" @onSelectedItem="(id) => {
            itemToAdd.ph_ind = id
          }" :required="true" class="hidden" />
          <input type="text" required v-model="itemToAdd.phone"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </div>

      </label>

      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.password') }} <span class="text-red-500">*</span></span>
        </div>
        <div class="flex items-center relative">
          <input type="password" required v-model="itemToAdd.password"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </div>
      </label>

      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.confirm') }} {{ t('commun.password') }} <span
              class="text-red-500">*</span></span>
        </div>
        <div class="flex items-center relative">
          <input type="password" required v-model="passwordVerification"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </div>
      </label>




      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.parentReferralCode') }}</span>
        </div>
        <input type="text" :disabled="route.name === 'register-child'" v-model="itemToAdd.parent_referral_code"
          class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
      </label>

      <div class="w-full h-10 col-span-2 mt-3 flex items-center gap-3">
        <input type="checkbox" required class="w-5 h-5" name="" id="">
        <span class="uppercase">i accept <router-link :to="{ name: 'terms-and-conditions' }" class="text-primary">terms
            and conditions</router-link></span>
      </div>

      <span v-if="message" class="text-red-500 uppercase md:col-span-2">{{ message }}</span>

      <button :disabled="lodingLogin" type="submit" class="btn btn-sm pixa-btn btn-primary w-full mt-4  md:col-span-2">
        <span v-if="lodingLogin" class="loading loading-ring loading-sm"></span>
        <span v-else>{{ t('commun.register') }}</span>
      </button>

      <div class="w-full flex items-center gap-2 my-2 md:col-span-2">
        <span class="flex-1 h-px bg-slate-200"></span>
        <span class="uppercase">{{ t('commun.or') }}</span>
        <span class="flex-1 h-px bg-slate-200"></span>
      </div>

      <router-link :to="{ name: 'login' }" class="btn btn-sm pixa-btn pixa-btn-nofloat w-full md:col-span-2">{{
        t('commun.login') }}</router-link>

    </form>
  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';
import axios from 'axios';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import communCombobox from '@/components/commun/communCombobox.vue';
import { useRoute, useRouter } from 'vue-router';
import { format } from 'date-fns';


const env = import.meta.env.VITE_WORLDSHIP_API
const { t } = useI18n()
const showPassword = ref(false)
const saveLogin = ref(false)
const useProfile = useProfileStore()
const route = useRoute()
const lodingLogin = ref(false)
const router = useRouter()
const itemToAdd = reactive(
  {
    first_name: '',
    last_name: '',
    email: '',
    ph_ind: '+1',
    phone: '',
    password: '',
    username: '',
    parent_referral_code: '',
  }
)
const message = ref('')
const passwordVerification = ref('')

onBeforeMount(() => {
  if (route.name === 'register-child') {
    itemToAdd.parent_referral_code = route.params.ref
  }
})

const phoneInd = ref(
  [{
    id: '+1',
    designation: '+1',
    designation_ar: '+1',
  }, {
    id: '+964',
    designation: '+964',
    designation_ar: '+964',
  }]
)

const registration = async () => {
  lodingLogin.value = true
  message.value = ''
  const formData = new FormData()



  formData.append('first_name', itemToAdd.first_name)
  formData.append('last_name', itemToAdd.last_name)
  formData.append('email', itemToAdd.email)
  formData.append('ph_ind', itemToAdd.ph_ind)
  formData.append('phone', itemToAdd.phone)
  formData.append('password', itemToAdd.password)
  formData.append('username', itemToAdd.username)
  formData.append('parent_referral_code', itemToAdd.parent_referral_code)



  if (itemToAdd.password === passwordVerification.value) {
    try {
      let response = await axios.post(`/register_API
`, formData)
      router.push({ name: 'home' })

    } catch (error) {
      console.error(error)
    }
  } else {
    message.value = 'please make sure your password and password verification are the same'
  }


  lodingLogin.value = false
}


</script>

<style lang="scss" scoped></style>
