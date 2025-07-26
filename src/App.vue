<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div class="container">
        <!-- Logo and Brand -->
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <i class="bi bi-heart-pulse me-2 fs-4"></i>
          <span class="fw-bold">Indigenous Health Charity</span>
        </router-link>

        <!-- Mobile Toggle Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav me-auto"></div>
          <ul class="navbar-nav me-3">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="bi bi-house me-1"></i>Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">
                <i class="bi bi-info-circle me-1"></i>About Us
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/events">
                <i class="bi bi-calendar-event me-1"></i>Events
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/support">
                <i class="bi bi-telephone me-1"></i>Support
              </router-link>
            </li>
          </ul>

          <!-- Authentication Links -->
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!authStore.isAuthenticated">
              <router-link class="nav-link" to="/login">
                <i class="bi bi-box-arrow-in-right me-1"></i>Login
              </router-link>
            </li>
            <li class="nav-item" v-if="!authStore.isAuthenticated">
              <router-link class="nav-link" to="/register">
                <i class="bi bi-person-plus me-1"></i>Register
              </router-link>
            </li>
            <li class="nav-item dropdown" v-if="authStore.isAuthenticated">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle me-1"></i>
                {{ authStore.user.name }}
                <span class="badge bg-secondary ms-1">{{ authStore.user.role }}</span>
              </a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
                <li>
                  <router-link
                    class="dropdown-item"
                    to="/dashboard"
                    v-if="authStore.hasRole('admin')"
                    >Dashboard</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="flex-grow-1">
      <router-view :key="$route.fullPath" />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-light py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>Indigenous Health Charity</h5>
            <p class="mb-0">
              Supporting Indigenous communities with comprehensive health services.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-1">All Rights Reserved.</p>
            <p class="mb-1">
              Other partners website: <a href="#" class="text-light">WWW.xxx.com</a>
            </p>
            <p class="mb-1">Share Us: QQ Wechat RedNote</p>
            <p class="mb-0">Contact Us: XXXXX</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

// Initialize stores and router
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Watch for route changes to ensure proper navigation
watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    console.log('Route changed from', oldPath, 'to', newPath)
    // Force scroll to top on route change
    window.scrollTo(0, 0)

    // Force a small delay to ensure DOM updates
    setTimeout(() => {
      // Additional check to ensure page content is updated
      const routerView = document.querySelector('router-view')
      if (routerView) {
        routerView.style.opacity = '0'
        setTimeout(() => {
          routerView.style.opacity = '1'
        }, 50)
      }
    }, 100)
  },
  { immediate: true }, // Watch immediately on component mount
)

// Handle user logout
const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Main content should take up remaining space */
main {
  flex: 1;
  width: 100%;
}

/* Custom navbar styling */
.navbar {
  z-index: 1030; /* Ensure navbar stays on top */
}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #fff !important;
}

/* Footer styling */
footer {
  margin-top: auto; /* Push footer to bottom */
  width: 100%;
}

footer a {
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}

/* Ensure no unwanted margins or padding */
.container-fluid {
  padding: 0;
}
</style>
