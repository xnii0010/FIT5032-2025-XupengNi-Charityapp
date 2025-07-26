<template>
  <div class="login-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow">
            <div class="card-header bg-primary text-white text-center">
              <h3 class="mb-0"><i class="bi bi-box-arrow-in-right me-2"></i>Login</h3>
            </div>

            <div class="card-body p-4">
              <!-- Login Form -->
              <form @submit.prevent="handleLogin" novalidate>
                <!-- Email Field -->
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': emailError }"
                    id="email"
                    v-model="formData.email"
                    @blur="validateEmail"
                    placeholder="Enter your email"
                    required
                  />
                  <div v-if="emailError" class="invalid-feedback">
                    {{ emailError }}
                  </div>
                </div>

                <!-- Password Field -->
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      :class="{ 'is-invalid': passwordError }"
                      id="password"
                      v-model="formData.password"
                      @blur="validatePassword"
                      placeholder="Enter your password"
                      required
                    />
                    <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                  <div v-if="passwordError" class="invalid-feedback d-block">
                    {{ passwordError }}
                  </div>
                </div>

                <!-- Remember Me -->
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberMe"
                    v-model="formData.rememberMe"
                  />
                  <label class="form-check-label" for="rememberMe"> Remember me </label>
                </div>

                <!-- Error Message -->
                <div v-if="loginError" class="alert alert-danger" role="alert">
                  <i class="bi bi-exclamation-triangle me-2"></i>
                  {{ loginError }}
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="btn btn-primary w-100 mb-3"
                  :disabled="isLoading || !isFormValid"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                  {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>

                <!-- Demo Accounts -->
                <div class="text-center mb-3">
                  <small class="text-muted">Demo Accounts:</small>
                  <div class="d-flex gap-2 mt-2">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary"
                      @click="fillDemoUser"
                    >
                      User Demo
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-success"
                      @click="fillDemoAdmin"
                    >
                      Admin Demo
                    </button>
                  </div>
                </div>
              </form>

              <!-- Register Link -->
              <div class="text-center">
                <p class="mb-0">
                  Don't have an account?
                  <router-link to="/register" class="text-decoration-none">
                    Register here
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/users'

// Initialize router and stores
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

// Form data and validation
const formData = ref({
  email: '',
  password: '',
  rememberMe: false,
})

// Validation errors
const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')

// UI state
const showPassword = ref(false)
const isLoading = ref(false)

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    formData.value.email && formData.value.password && !emailError.value && !passwordError.value
  )
})

// Email validation function
const validateEmail = () => {
  const email = formData.value.email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) {
    emailError.value = 'Email is required'
  } else if (!emailRegex.test(email)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

// Password validation function
const validatePassword = () => {
  const password = formData.value.password

  if (!password) {
    passwordError.value = 'Password is required'
  } else if (password.length < 6) {
    passwordError.value = 'Password must be at least 6 characters long'
  } else {
    passwordError.value = ''
  }
}

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Demo account functions - now using data from users.json
const fillDemoUser = () => {
  formData.value.email = 'user@example.com'
  formData.value.password = 'password123'
  emailError.value = ''
  passwordError.value = ''
}

const fillDemoAdmin = () => {
  formData.value.email = 'admin@example.com'
  formData.value.password = 'admin123'
  emailError.value = ''
  passwordError.value = ''
}

// Handle form submission
const handleLogin = async () => {
  // Validate all fields
  validateEmail()
  validatePassword()

  if (!isFormValid.value) {
    return
  }

  isLoading.value = true
  loginError.value = ''

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Use user store to authenticate
    const { email, password } = formData.value
    const authenticatedUser = userStore.authenticateUser(email, password)

    if (authenticatedUser) {
      // Successful login
      authStore.login(authenticatedUser)

      // Redirect to appropriate page based on role
      if (authenticatedUser.role === 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
    } else {
      loginError.value = 'Invalid email or password'
    }
  } catch (error) {
    loginError.value = 'An error occurred during login. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
}

.card {
  border: none;
  border-radius: 10px;
}

.card-header {
  border-radius: 10px 10px 0 0 !important;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--purple-primary);
  box-shadow: 0 0 0 0.2rem var(--purple-shadow-light);
}

.btn-primary {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--purple-primary-dark) 0%, var(--purple-primary-darker) 100%);
}

.btn-primary:disabled {
  opacity: 0.6;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Demo buttons styling */
.btn-outline-primary,
.btn-outline-success {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
}

/* Responsive design */
@media (max-width: 576px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .card-body {
    padding: 1.5rem !important;
  }
}
</style>
