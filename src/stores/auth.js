import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { onAuthStateChange, logoutUser } from '@/firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(true) // Add loading state for auth initialization

  let unsubscribe = null

  // Initialize auth state listener
  const initializeAuth = () => {
    unsubscribe = onAuthStateChange((firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser
        isAuthenticated.value = true
        // Persist user data in localStorage
        localStorage.setItem('user', JSON.stringify(firebaseUser))
      } else {
        // User is not authenticated
        user.value = null
        isAuthenticated.value = false
        // Remove user data from localStorage
        localStorage.removeItem('user')
        // Clear user ratings data when logging out
        localStorage.removeItem('userRatings')
      }
      isLoading.value = false
    })
  }

  // Load user data from localStorage on store initialization (fallback)
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
      isAuthenticated.value = true
    } catch (error) {
      console.error('Error parsing stored user data:', error)
      localStorage.removeItem('user')
    }
  }

  // Computed property to get user role
  const userRole = computed(() => {
    return user.value?.role || null
  })

  // Login function (now just updates local state, actual login handled by Firebase)
  const login = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    // Persist user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Logout function with Firebase integration
  const logout = async () => {
    try {
      // Sign out from Firebase
      await logoutUser()
      
      // Clear local state
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
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const hasRole = (role) => {
    return user.value?.role === role
  }

  // Cleanup function to unsubscribe from auth state listener
  const cleanup = () => {
    if (unsubscribe) {
      unsubscribe()
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    userRole,
    login,
    logout,
    hasRole,
    initializeAuth,
    cleanup,
  }
})
