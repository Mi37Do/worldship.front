<template>
  <div class="w-full h-screen bg-slate-100 flex items-center justify-center">
    <form @submit.prevent="login(loginUser, saveLogin)"
      class="w-80 h-fit bg-white rounded-lg border border-slate-200 flex flex-col items-center gap-2 p-3">

      <img :src="env + useProfile.webConfig.images_logo" class="w-48 " alt="">

      <span class="uppercase font-semibold text-lg my-8">welcome</span>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text uppercase">username or email address <span class="text-red-500">*</span></span>
        </div>
        <input type="text" required v-model="loginUser.username"
          class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text uppercase">password <span class="text-red-500">*</span></span>
        </div>
        <div class="flex items-center relative">
          <input :type="showPassword ? 'text' : 'password'" required v-model="loginUser.password"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
          <button type="button" @click="showPassword = !showPassword"
            class="btn btn-sm btn-square absolute right-1 btn-ghost">
            <eye-icon v-if="showPassword" class="w-5 h-5" />
            <eye-slash-icon v-else class="w-5 h-5" />
          </button>
        </div>
      </label>

      <label class="form-control w-full mt-4">
        <div class="w-full flex gap-2 items-center">
          <input type="checkbox" v-model="saveLogin" name="" id="" class="w-4 h-4">
          <span class="flex-1 uppercase">remember me</span>
        </div>

      </label>

      <button type="submit" class="btn btn-sm pixa-btn btn-primary w-full mt-4">login</button>
    </form>
  </div>
</template>

<script setup>
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import eyeSlashIcon from '@/assets/icons/eyeSlashIcon.vue';
import { useProfileStore } from '@/stores/profile';
import { reactive, ref } from 'vue';


const env = import.meta.env.VITE_WORLDSHIP_API
const showPassword = ref(false)
const saveLogin = ref(false)
const useProfile = useProfileStore()
const lodingLogin = ref(false)
const loginUser = reactive(
  {
    username: '',
    password: ''
  }
)

const login = async (user, saveData) => {
  lodingLogin.value = true
  await useProfile.login(user, saveData)
}
</script>

<style lang="scss" scoped></style>
