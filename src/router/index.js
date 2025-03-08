import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import profileRoutes from './profile'
import { useProfileStore } from '@/stores/profile'
import Cookies from 'js-cookie'
import landingRoutes from './landing'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      children: landingRoutes,
      redirect: { name: 'home-view' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/loginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/registerView.vue'),
    },
    {
      path: '/app',
      name: 'app',
      meta: { requireAuth: true },
      component: () => import('@/views/appView.vue'),
      redirect: { name: 'dashboard' },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/pages/dashboardView.vue'),
        },
        { path: '/inbox', name: 'inbox', component: () => import('@/views/pages/inboxView.vue') },
        {
          path: '/shippements',
          name: 'shippements',
          component: () => import('@/views/pages/shippementsView.vue'),
        },
        {
          path: '/shippement/:id',
          name: 'shippement',
          component: () => import('@/views/pages/shippementView.vue'),
        },
        {
          path: '/return',
          name: 'return',
          component: () => import('@/views/pages/returnsView.vue'),
        },
        {
          path: '/byforme',
          name: 'byforme',
          component: () => import('@/views/pages/byformeView.vue'),
          redirect: { name: 'table-buyForMe' },
          children: [
            {
              path: 'table',
              name: 'table-buyForMe',
              component: () => import('@/views/pages/buyForMe/buyForMeTable.vue'),
            },
            {
              path: 'add',
              name: 'add-buyForMe',
              component: () => import('@/views/pages/buyForMe/addBuyForMe.vue'),
            },
            {
              path: ':id',
              name: 'buyForMe',
              component: () => import('@/views/pages/buyForMe/buyForMeView.vue'),
            },
          ],
        },
        {
          path: '/support',
          name: 'support',
          component: () => import('@/views/pages/supportView.vue'),
          children: [
            {
              path: 'chat/:id',
              name: 'chat',
              component: () => import('@/views/pages/chatView.vue'),
            },
          ],
        },
        {
          path: '/warehouse-invoices',
          name: 'warehouse-invoices',
          component: () => import('@/views/pages/invoices/wareHouseInvoicesView.vue'),
        },
        {
          path: '/byforme-invoices',
          name: 'byforme-invoices',
          component: () => import('@/views/pages/invoices/byformeInvoicesView.vue'),
        },
        {
          path: 'faqs',
          name: 'faqs',
          component: () => import('@/views/pages/profile/faqsView.vue'),
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { requireAuth: true },
      component: () => import('@/views/profileView.vue'),

      redirect: { name: 'user' },
      children: profileRoutes,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const useProfile = useProfileStore()

  await useProfile.getWebConfig()

  /***/
  if (localStorage.getItem('ws-user-id') && Cookies.get('token')) {
    try {
      await useProfile.getProfile(localStorage.getItem('ws-user-id'))
    } catch (error) {
      console.error(error)
    }
  }

  if (to.meta.requireAuth && !useProfile.isAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
