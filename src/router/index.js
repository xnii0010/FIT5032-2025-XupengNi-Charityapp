import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home - Indigenous Health Charity' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About Us - Indigenous Health Charity' },
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/SupportView.vue'),
      meta: { title: 'Support - Indigenous Health Charity' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login - Indigenous Health Charity',
        requiresGuest: true, // Only accessible when not logged in
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Register - Indigenous Health Charity',
        requiresGuest: true, // Only accessible when not logged in
      },
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      meta: { title: 'Events - Indigenous Health Charity' },
    },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: () => import('../views/EventDetailView.vue'),
      meta: { title: 'Event Details - Indigenous Health Charity' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        title: 'Profile - Indigenous Health Charity',
        requiresAuth: true, // Only accessible when logged in
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: 'Dashboard - Indigenous Health Charity',
        requiresAuth: true,
        requiresRole: 'admin', // Only accessible for admin users
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
      meta: { title: 'Search Results - Indigenous Health Charity' },
    },
    // Catch-all route for 404 pages
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Page Not Found - XNI Health Charity' },
    },
  ],
})

// Navigation guards for authentication and authorization
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login page
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Check if route requires guest (not logged in)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect to home page
    next({ name: 'home' })
    return
  }

  // Check if route requires specific role
  if (to.meta.requiresRole && !authStore.hasRole(to.meta.requiresRole)) {
    // Redirect to home page if user doesn't have required role
    next({ name: 'home' })
    return
  }

  next()
})

export default router
