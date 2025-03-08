<template>
  <div class="w-full h-screen bg-slate-100 flex items-center justify-center">
    <form @submit.prevent="login(itemToAdd, saveLogin)"
      class="w-fit h-fit bg-white rounded-lg border border-slate-200 grid grid-cols-2 gap-2 p-3">
      <div class="w-full flex flex-col items-center gap-4  md:col-span-2">
        <img :src="env + useProfile.webConfig.images_logo" class="w-48 flex items-center justify-center" alt="">

        <span class="uppercase font-semibold text-lg my-4">welcome</span>
      </div>


      <label class="form-control w-full md:min-w-96 md:col-span-2">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.username') }}<span class="text-red-500">*</span></span>
        </div>
        <input type="text" required v-model="itemToAdd.username"
          class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
      </label>


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
        <input type="text" required v-model="itemToAdd.phone"
          class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
      </label>

      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.password') }} <span class="text-red-500">*</span></span>
        </div>
        <div class="flex items-center relative">
          <input type="text" required v-model="itemToAdd.password"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </div>
      </label>

      <label class="form-control w-full md:min-w-96">
        <div class="label">
          <span class="label-text uppercase">{{ t('commun.confirm') }} {{ t('commun.password') }} <span
              class="text-red-500">*</span></span>
        </div>
        <div class="flex items-center relative">
          <input type="text" required v-model="itemToAdd.password"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </div>
      </label>

      <button type="submit" class="btn btn-sm pixa-btn btn-primary w-full mt-4  md:col-span-2">register</button>

      <div class="w-full flex items-center gap-2 my-2 md:col-span-2">
        <span class="flex-1 h-px bg-slate-200"></span>
        <span>OR</span>
        <span class="flex-1 h-px bg-slate-200"></span>
      </div>

      <router-link :to="{ name: 'login' }"
        class="btn btn-sm pixa-btn pixa-btn-nofloat w-full md:col-span-2">login</router-link>

    </form>
  </div>
</template>

<script setup>
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import eyeSlashIcon from '@/assets/icons/eyeSlashIcon.vue';
import { useProfileStore } from '@/stores/profile';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';


const env = import.meta.env.VITE_WORLDSHIP_API
const { t } = useI18n()
const showPassword = ref(false)
const saveLogin = ref(false)
const useProfile = useProfileStore()
const lodingLogin = ref(false)
const itemToAdd = reactive(
  {
    first_name: '',
    last_name: '',
    email: '',
    ph_ind: '',
    phone: '',
    password: '',
    username: '',
    parent_referral_code: '',
  }
)

const login = async (user, saveData) => {
  lodingLogin.value = true
  await useProfile.login(user, saveData)
}
</script>

<style lang="scss" scoped></style>
