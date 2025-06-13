<template>
  <div v-if="loading" class="w-full h-full flex justify-center items-center">
    <span class="loading loading-ring loading-sm"></span>
  </div>
  <div v-else class="w-full h-full grid grid-cols-3">
    <div class="w-full h-full border-r border-slate-200 flex flex-col overflow-hidden col-span-2">
      <div
        class="w-full h-16 p-4 flex items-center justify-between gap-4 border-b border-slate-200 shadow-2xl shadow-primary/5">
        <span class="pixa-title">{{ useSupport.focusedTicket.name }}</span>


        <span :class="[
          useSupport.focusedTicket.type_s === 'inbox' ? 'bg-primary/10 text-primary' :
            useSupport.focusedTicket.type_s === 'buy for me' ? 'bg-indigo-100 text-indigo-600' :
              'bg-emerald-100 text-emerald-600',
          'h-full w-fit px-2 text-center font-semibold rounded flex items-center']">{{
            useSupport.focusedTicket.type_s }}</span>
      </div>
      <div class="w-full flex-1 overflow-auto flex flex-col">
        <div class="w-full h-fit flex flex-col gap-1 p-2">
          <ChatItem v-for="item in tempMessages" :key="item" :item="item" :user="useSupport.focusedTicket.user_id" />
        </div>
      </div>
      <div class="w-full p-4 flex flex-col gap-4  border-t border-slate-200">
        <div v-if="imagePreview" class="w-20 h-20 bg-slate-200 rounded-md overflow-hidden relative">
          <button @click="() => {
            imagePreview = null
            messageToSend.upload = null
          }" class="btn btn-sm btn-square absolute top-1 right-1 btn-ghost">
            <times-icon class="w-5 h-5" />
          </button>
          <img :src="imagePreview" class="w-full h-full object-cover" alt="">
        </div>

        <div class="w-full h-fit rounded-t-lg flex gap-2 ">
          <input type="text" v-model="messageToSend.message" class="pixa-input flex-1 px-2">

          <div class="btn btn-sm pixa-btn w-10 btn-ghost p-0 relative">
            <input type="file" required @change="handleFileChange" class="absolute w-full h-full inset-0 opacity-0">
            <paper-clip-icon class="w-5 h-5" />
          </div>

          <button @click="sendMessage" :disabled="loadingAdd" class="btn btn-sm pixa-btn w-10 btn-primary p-0">
            <span v-if="loadingAdd" class="loading loading-ring loading-sm"></span>
            <message-icon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="w-full h-full items-center overflow-hidden">
      <div class="w-full h-full flex flex-col overflow-auto p-4">

        <div class="w-full h-fit flex flex-col py-4 gap-4 items-center">
          <div class="w-24 h-24 bg-slate-100 rounded-full outline outline-2 outline-slate-200 overflow-hidden">
            <img :src="useSupport.focusedTicket.user_id.image" class="w-full object-cover h-full" alt="">
          </div>
          <span class="uppercase font-semibold text-lg">{{ useSupport.focusedTicket.user_id.first_name }} {{
            useSupport.focusedTicket.user_id.last_name
            }}</span>
          <div class="w-full h-fit fill-slate-600 flex flex-col gap-2">
            <div class="flex gap-2">
              <phone-icon class="w-5 h-5" />
              <span class="flex-1 mt-0.5">{{ useSupport.focusedTicket.user_id.phone }}</span>
            </div>
            <div class="flex gap-2">
              <location-icon class="w-5 h-5" />
              <span class="flex-1 mt-0.5">{{ useSupport.focusedTicket.user_id.email }}</span>
            </div>
            <div class="flex gap-2">
              <copy-icon class="w-5 h-5" />
              <span class="flex-1 mt-0.5">{{ useSupport.focusedTicket.user_id.code }}</span>
            </div>
          </div>
        </div>


        <div class="w-full flex flex-col gap-4 border-t border-slate-200 pt-4">
          <span class="uppercase font-semibold">media files</span>
          <!--   -->
          <div
            v-viewer="{ button: true, title: false, movable: false, rotatable: false, scalable: false, keyboard: true }"
            class="w-full ">
            <div class="w-full grid grid-cols-3 gap-2">
              <div v-for="i in files" :key="i" class="w-full h-20  bg-slate-100 rounded-md overflow-hidden">
                <img :src="env + i" class="w-full h-full object-cover" alt="">
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import copyIcon from '@/assets/icons/copyIcon.vue';
import locationIcon from '@/assets/icons/locationIcon.vue';
import messageIcon from '@/assets/icons/messageIcon.vue';
import paperClipIcon from '@/assets/icons/paperClipIcon.vue';
import phoneIcon from '@/assets/icons/phoneIcon.vue';
import ChatItem from '@/components/support/chatItem.vue';
import { useSupportStore } from '@/stores/support';
import axios from 'axios';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { objectToFormData } from '@/utils/formDataUtils'
import timesIcon from '@/assets/icons/timesIcon.vue';

const files = ref([])
const router = useRouter()
const route = useRoute()
const imagePreview = ref('')
const useSupport = useSupportStore()
const loading = ref(true)
const env = import.meta.env.VITE_WORLDSHIP_API
const tempMessages = ref([])
const loadingAdd = ref(false)
const messageToSend = reactive(
  {
    ref: null,
    message: '',
    upload: null
  }
)
const fileName = ref('')

onBeforeMount(async () => {
  if (!route.params.id) {
    router.push({ name: 'support' })
  } else {
    loading.value = true
    await getMessages()
    loading.value = false
  }
})


const sendMessage = async () => {
  messageToSend.ref = route.params.id
  const formData = new FormData()

  formData.append('ref', messageToSend.ref)
  formData.append('message', messageToSend.message)
  formData.append('upload', messageToSend.upload)

  if (messageToSend.message || messageToSend.upload) {
    loadingAdd.value = true
    try {
      let response = await axios.post(`/Dashboard/send_support_ticket_message_API/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      await getMessages()
      Object.assign(messageToSend, {
        ref: null,
        message: '',
        upload: null
      })
      imagePreview.value = ''
    } catch (error) {
      console.error(error)
    }
    loadingAdd.value = false
  }
}

watch(() => route, async () => {
  loading.value = true
  await getMessages()
  loading.value = false
}, { deep: true })

const getMessages = async () => {
  files.value = []
  try {
    let response = await axios.get(`/Dashboard/view_message_suport_ticket_API/${route.params.id}`)

    useSupport.focusedTicket = response.data.ticket

    tempMessages.value = useSupport.focusedTicket.support_ticket_message.reverse()


    for (let index = 0; index < tempMessages.value.length; index++) {
      const element = tempMessages.value[index]
      if (element.joint_message) files.value.push(element.joint_message)
    }
  } catch (error) {

  }


}


const handleFileChange = (event) => {
  messageToSend.upload = event.target.files[0]; // Get the first file
  if (messageToSend.upload) {
    fileName.value = messageToSend.upload.name; // Set the file name
    imagePreview.value = URL.createObjectURL(messageToSend.upload)
  } else {
    fileName.value = ''; // Clear the file name if no file is selected
  }
}

</script>

<style lang="scss" scoped></style>
