import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import numberFormat from '@/utils/numberFormatFilter.js'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createI18n } from 'vue-i18n'
import EN from '@/languages/en.json'
import AR from '@/languages/ar.json'
import axios from 'axios'
import VueViewer from 'v-viewer'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import 'viewerjs/dist/viewer.css'

axios.defaults.baseURL = import.meta.env.VITE_WORLDSHIP_API

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  lobalInjection: true,
  /***/
  messages: {
    en: EN,
    ar: AR,
  },
})

const app = createApp(App)

app.use(createPinia())
app.mixin(numberFormat)
app.use(i18n)
app.use(VueViewer)
app.use(VCalendar, {})
app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
