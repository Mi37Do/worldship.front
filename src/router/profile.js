const profileRoutes = [
  {
    path: 'welcome',
    name: 'welcome-profile',
    component: () => import('@/views/pages/profile/profileLanding.vue'),
  },
  {
    path: 'user',
    name: 'user',
    component: () => import('@/views/pages/profile/userView.vue'),
  },
  {
    path: 'wallets',
    name: 'wallets',
    component: () => import('@/views/pages/profile/walletsView.vue'),
    redirect: { name: 'add' },
    children: [
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/pages/wallets/historyView.vue'),
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/pages/wallets/addWalletView.vue'),
      },
    ],
  },
  {
    path: 'address-book',
    name: 'address-book',
    component: () => import('@/views/pages/profile/addressBookView.vue'),
  },
  {
    path: 'coins',
    name: 'coins',
    component: () => import('@/views/pages/profile/coinsView.vue'),
  },
  {
    path: 'referrals',
    name: 'referrals',
    component: () => import('@/views/pages/profile/referralsView.vue'),
  },
  {
    path: 'cards',
    name: 'cards',
    component: () => import('@/views/pages/profile/cardsView.vue'),
  },
  {
    path: 'transfers',
    name: 'transfers',
    component: () => import('@/views/pages/profile/transfersView.vue'),
  },
]

export default profileRoutes
