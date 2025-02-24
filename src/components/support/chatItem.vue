<template>
  <div class="w-full h-fit flex gap-4 p-4 rounded-lg">
    <div class="w-12 h-12 bg-slate-100 rounded-full overflow-hidden flex items-center justify-center">
      <!--
      <img v-if="item.image" :src="item.image" class="h-full object-cover" alt="">-->
      <support-user-icon v-if="item.type_m === 'a'" class="w-6 h-6 fill-primary" />
      <user-icon v-else class="w-6 h-6 fill-primary/50" />
    </div>
    <div class="flex-1 h-fit flex flex-col gap-2">
      <span :class="[
        item.type_m === 'a' ? 'text-primary' : '',
        'font-semibold']">
        {{ item.type_m === 'c' ? user.first_name + ' ' + user.last_name : 'support tickets' }}</span>
      <span>{{ item.message }}</span>

      <div v-if="item.joint_message" class="w-full max-h-fit rounded-md overflow-hidden border border-slate-200 mt-2">

        <img :src="env + item.joint_message" class="w-full h-full" alt=""
          v-viewer="{ button: true, navbar: false, title: false, toolbar: false, tooltip: false, movable: false, zoomable: false, rotatable: false, scalable: false, keyboard: true }">
      </div>
    </div>

    <div class="h-fit flex flex-col">
      <span>{{ format(item.created_at, 'dd-MM-yyyy') }}</span>
      <span>{{ format(item.created_at, 'HH:mm') }}</span>
    </div>


  </div>
</template>

<script setup>
import supportUserIcon from "@/assets/icons/supportUserIcon.vue";
import userIcon from "@/assets/icons/userIcon.vue";
import { format } from "date-fns";

const props = defineProps(['item', 'user'])
const env = import.meta.env.VITE_WORLDSHIP_API
</script>

<style lang="scss" scoped></style>
