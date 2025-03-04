<template>
  <div class="w-full h-full flex flex-col gap-4 items-center overflow-auto">

    <div class="w-full max-w-md h-fit  flex flex-col gap-4">

      <div class="grid grid-cols-3 gap-1 p-1 bg-primary rounded-lg">
        <button @click="tab = 'profile'"
          :class="tab === 'profile' ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-white/20 text-white'"
          class="btn btn-sm pixa-btn border-0">profile</button>
        <button @click="tab = 'edit'"
          :class="tab === 'edit' ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-white/20 text-white'"
          class="btn btn-sm pixa-btn border-0">edit</button>
        <button @click="tab = 'password'"
          :class="tab === 'password' ? 'bg-white hover:bg-white' : 'bg-transparent hover:bg-white/20 text-white'"
          class="btn btn-sm pixa-btn border-0">change password</button>
      </div>

      <div v-if="tab === 'profile'"
        class="w-full h-fit bg-white border border-slate-200 rounded-lg p-3 flex flex-col items-center gap-3 uppercase">
        <div class="w-32 h-32 bg-blue-100 rounded-full mt-10 flex items-center justify-center">
          <user-icon class="w-12 h-12 fill-primary" />
        </div>

        <div class="w-full flex overflow-hidden mt-4">
          <span class="w-32 font-semibold truncate">full name</span>
          <span>{{ useProfile.profile.user.first_name }} {{ useProfile.profile.user.last_name }}</span>
        </div>

        <div class="w-full flex overflow-hidden mt-4">
          <span class="w-32 font-semibold truncate">phone</span>
          <span>{{ useProfile.profile.user.phone }}</span>
        </div>

        <div class="w-full flex overflow-hidden mt-4">
          <span class="w-32 font-semibold truncate">email</span>
          <span>{{ useProfile.profile.user.email }}</span>
        </div>
        <div class="w-full flex overflow-hidden mt-4">
          <span class="w-32 font-semibold truncate">code</span>
          <span>{{ useProfile.profile.user.code }}</span>
        </div>
        <div class="w-full flex overflow-hidden mt-4">
          <span class="w-32 font-semibold truncate">city</span>
          <span>{{ useProfile.profile.user.addresse_site.city }}</span>
        </div>
      </div>

      <form v-if="tab === 'edit'" @submit.prevent="editProfile"
        class="w-full h-fit bg-white rounded-lg border border-slate-200 p-3 flex flex-col gap-3">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">first name </span>
          </div>
          <input type="text" required v-model="useProfile.profile.user.first_name"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">last name </span>
          </div>
          <input type="text" required v-model="useProfile.profile.user.last_name"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">last name </span>
          </div>
          <input type="text" required v-model="useProfile.profile.user.phone"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label> <button :disabled="loadingEdit" type="submit" class="btn btn-sm pixa-btn btn-primary w-full mt-3">
          <span v-if="loadingEdit" class="loading loading-ring loading-sm"></span>
          <span v-else>save</span>
        </button>
      </form>

      <form v-if="tab === 'password'" @submit.prevent="resetPassword"
        class="w-full h-fit bg-white rounded-lg border border-slate-200 p-3 flex flex-col gap-3">
        <span class="pixa-title">new password</span>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text uppercase">new password </span>
          </div>
          <input type="text" required v-model="new_password"
            class="pixa-input w-full placeholder:capitalize ring-inset focus:ring-0 px-4" />
        </label>
        <button :disabled="loadingPassword" type="submit" class="btn btn-sm pixa-btn btn-primary w-full mt-3">
          <span v-if="loadingPassword" class="loading loading-ring loading-sm"></span>
          <span v-else>save</span>
        </button>
      </form>
    </div>

  </div>
</template>

<script setup>
import { useProfileStore } from '@/stores/profile';
import axios from 'axios';
import userIcon from '@/assets/icons/userIcon.vue';
import { reactive, ref } from 'vue';

const useProfile = useProfileStore()
const new_password = ref('')
const loadingPassword = ref(false)
const loadingEdit = ref(false)
const tab = ref('profile')

const editProfile = async () => {
  loadingEdit.value = true
  let formData = new FormData()
  formData.append('first_name', useProfile.profile.user.first_name)
  formData.append('last_name', useProfile.profile.user.last_name)
  formData.append('phone', useProfile.profile.user.phone)
  try {
    let response = await axios.post(`/Dashboard/change_profile_API/${localStorage.getItem('ws-user-id')}`, formData)
  } catch (error) {
    console.error(error)
  }
  loadingEdit.value = false
}

const resetPassword = async () => {
  loadingPassword.value = true
  let formData = new FormData()
  formData.append('new_password', new_password.value)
  try {
    let response = await axios.post(`/Dashboard/change_pswd_API/${localStorage.getItem('ws-user-id')}`, formData)
  } catch (error) {
    console.error(error)
  }
  loadingPassword.value = false
}
</script>

<style lang="scss" scoped></style>
