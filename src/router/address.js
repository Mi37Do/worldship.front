const addressRoutes = [
  {
    path: 'from',
    name: 'from-addresses',
    component: () => import('@/views/pages/profile/addresses/fromAddressView.vue'),
  },
  {
    path: 'to',
    name: 'to-addresses',
    component: () => import('@/views/pages/profile/addresses/toAddressView.vue'),
  },
  {
    path: 'billing',
    name: 'billing-addresses',
    component: () => import('@/views/pages/profile/addresses/billingAddressView.vue'),
  },
]

export default addressRoutes
