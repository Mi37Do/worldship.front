const landingRoutes = [
  {
    path: '/',
    name: 'home-view',
    component: () => import('@/views/landing/homeView.vue'),
  },
  {
    path: 'terms-and-conditions',
    name: 'terms-and-conditions',
    component: () => import('@/views/auth/termsView.vue'),
  },
  {
    path: 'faq',
    name: 'faq-landing',
    component: () => import('@/views/auth/faqView.vue'),
  },
]

export default landingRoutes
