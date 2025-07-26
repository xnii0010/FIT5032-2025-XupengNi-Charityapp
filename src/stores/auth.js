import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
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
    // Clear user ratings data when logging out
    localStorage.removeItem('userRatings')

    // Also clear the data store's user ratings if available
    try {
      import('./data').then(({ useDataStore }) => {
        const dataStore = useDataStore()
        if (dataStore.clearUserRatings) {
          dataStore.clearUserRatings()
        }
      })
    } catch (error) {
      console.log('Data store not available during logout')
    }
  }

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
