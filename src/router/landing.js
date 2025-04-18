const landingRoutes = [
  {
    path: '/',
    name: 'home-view',
    component: () => import('@/views/landing/homeView.vue'),
  },
  {
    path: 'wallets',
    name: 'wallets',
    component: () => import('@/views/pages/profile/walletsView.vue'),
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

export default landingRoutes
