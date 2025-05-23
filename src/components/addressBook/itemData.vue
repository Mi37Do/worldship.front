<template>
  <div :class="[useWidget.userLanguage === 'ar' ? 'pl-2 pr-4' : ' pl-4 pr-2', 'lg:grid-cols-8'
  ]"
    class="w-full py-3 border bg-white rounded-md border-slate-200 px-4 grid grid-cols-2  gap-2 uppercase font-medium lg:hover:bg-slate-50 transition-all duration-150 cursor-pointer relative">
    <span class="h-8 my-auto flex items-center truncate">{{ item.name }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ formatPhoneNumber(item.phone) }} </span>
    <span v-if="item.type !== 'b'" class="h-8 my-auto flex items-center truncate">{{ item.company_name }} </span>

    <span class="h-8 my-auto flex items-center truncate gap-2">
      <div v-if="item.type !== 'to'">
        <img v-if="countries.find(i => i.id ===
          item.countrie)" :src="countries.find(i => i.id ===
            item.countrie).image" class="w-6" alt="">
        <no-image-icon v-else class="w-6 h-6 fill-slate-500" />
      </div>
      <span v-if="item.type === 'to'">{{useProfile.countries.find(i => i.id ===
        item.countrie) ? countries.find(i => i.id ===
          item.countrie).designation : '-----'}}</span>
      <span v-else>{{countries.find(i => i.id ===
        item.countrie) ? countries.find(i => i.id ===
          item.countrie).name : '-----'}}</span>

    </span>
    <span v-if="item.type !== 'to'" class="h-8 my-auto flex items-center truncate">{{ item.zip_code }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.type === 'to' && item.city_id ? item.city_id.name :
      item.city_c }}</span>
    <span class="h-8 my-auto flex items-center truncate">{{ item.adr }} </span>

    <span v-if="item.type === 'to'" class="h-8 my-auto flex items-center truncate">{{ item.adr_l2 || '----' }} </span>
    <div class="flex items-center justify-between my-auto ">
      <span v-if="item.type === 'to'" class="h-8 my-auto flex items-center truncate">{{ item.instructions || '----' }}
      </span>


      <span v-else class="h-8 my-auto flex items-center truncate">{{ item.adr_l2 || '----' }} </span>
      <item-more :item="item" />
    </div>

  </div>
</template>

<script setup>
import { format } from 'date-fns';
import eyeIcon from '@/assets/icons/eyeIcon.vue';
import itemMore from './itemMore.vue';
import { useWidgetStore } from '@/stores/widget';
import { formatPhoneNumber } from '@/utils/phoneUtils';
import noImageIcon from '@/assets/icons/noImageIcon.vue';
import { useRoute } from 'vue-router';
import countries from '@/assets/countries.json'
import { useProfileStore } from '@/stores/profile';

const useWidget = useWidgetStore()
const useProfile = useProfileStore()
const props = defineProps(['item', 'index'])
const route = useRoute()
</script>

<style lang="scss" scoped></style>
