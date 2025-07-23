// Authentication store using Pinia
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State variables for user authentication
  const user = ref(null)
  const isAuthenticated = ref(false)

  // Load user data from localStorage on store initialization
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    isAuthenticated.value = true
  }

  // Computed property to get user role
  const userRole = computed(() => {
    return user.value?.role || null
  })

  // Login function
  const login = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    // Persist user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout function
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    // Remove user data from localStorage
    localStorage.removeItem('user')
  }

  // Check if user has specific role
  const hasRole = (role) => {
    return user.value?.role === role
  }

  return {
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
    hasRole,
  }
})
