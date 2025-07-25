<template>
  <div class="register-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow">
            <div class="card-header bg-success text-white text-center">
              <h3 class="mb-0"><i class="bi bi-person-plus me-2"></i>Register</h3>
            </div>

            <div class="card-body p-4">
              <!-- Registration Form -->
              <form @submit.prevent="handleRegister" novalidate>
                <!-- Name Field -->
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': nameError }"
                    id="name"
                    v-model="formData.name"
                    @blur="validateName"
                    placeholder="Enter your full name"
                    required
                  />
                  <div v-if="nameError" class="invalid-feedback">
                    {{ nameError }}
                  </div>
                </div>

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

                <!-- Phone Field -->
                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': phoneError }"
                    id="phone"
                    v-model="formData.phone"
                    @blur="validatePhone"
                    placeholder="Enter your phone number"
                    required
                  />
                  <div v-if="phoneError" class="invalid-feedback">
                    {{ phoneError }}
                  </div>
                </div>

                <!-- Role Selection -->
                <div class="mb-3">
                  <label for="role" class="form-label">Role</label>
                  <select
                    class="form-select"
                    :class="{ 'is-invalid': roleError }"
                    id="role"
                    v-model="formData.role"
                    @change="validateRole"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="user">Community Member</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                  <div v-if="roleError" class="invalid-feedback">
                    {{ roleError }}
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
                      placeholder="Create a password"
                      required
                    />
                    <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                  <div v-if="passwordError" class="invalid-feedback d-block">
                    {{ passwordError }}
                  </div>
                  <div class="form-text">
                    Password must be at least 8 characters with uppercase, lowercase, and number.
                  </div>
                </div>

                <!-- Confirm Password Field -->
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': confirmPasswordError }"
                    id="confirmPassword"
                    v-model="formData.confirmPassword"
                    @blur="validateConfirmPassword"
                    placeholder="Confirm your password"
                    required
                  />
                  <div v-if="confirmPasswordError" class="invalid-feedback">
                    {{ confirmPasswordError }}
                  </div>
                </div>

                <!-- Terms and Conditions -->
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    :class="{ 'is-invalid': termsError }"
                    id="terms"
                    v-model="formData.acceptTerms"
                    @change="validateTerms"
                    required
                  />
                  <label class="form-check-label" for="terms">
                    I agree to the <a href="#" class="text-decoration-none">Terms and Conditions</a>
                  </label>
                  <div v-if="termsError" class="invalid-feedback d-block">
                    {{ termsError }}
                  </div>
                </div>

                <!-- Error Message -->
                <div v-if="registerError" class="alert alert-danger" role="alert">
                  <i class="bi bi-exclamation-triangle me-2"></i>
                  {{ registerError }}
                </div>

                <!-- Success Message -->
                <div v-if="registerSuccess" class="alert alert-success" role="alert">
                  <i class="bi bi-check-circle me-2"></i>
                  {{ registerSuccess }}
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="btn btn-success w-100 mb-3"
                  :disabled="isLoading || !isFormValid"
                >
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-person-plus me-2"></i>
                  {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </form>

              <!-- Login Link -->
              <div class="text-center">
                <p class="mb-0">
                  Already have an account?
                  <router-link to="/login" class="text-decoration-none"> Login here </router-link>
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

// Initialize router and store
const router = useRouter()
const authStore = useAuthStore()

// Form data
const formData = ref({
  name: '',
  email: '',
  phone: '',
  role: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
})

// Validation errors
const nameError = ref('')
const emailError = ref('')
const phoneError = ref('')
const roleError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const termsError = ref('')
const registerError = ref('')
const registerSuccess = ref('')

// UI state
const showPassword = ref(false)
const isLoading = ref(false)

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.email &&
    formData.value.phone &&
    formData.value.role &&
    formData.value.password &&
    formData.value.confirmPassword &&
    formData.value.acceptTerms &&
    !nameError.value &&
    !emailError.value &&
    !phoneError.value &&
    !roleError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !termsError.value
  )
})

// Validation functions
const validateName = () => {
  const name = formData.value.name.trim()

  if (!name) {
    nameError.value = 'Full name is required'
  } else if (name.length < 2) {
    nameError.value = 'Name must be at least 2 characters long'
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    nameError.value = 'Name can only contain letters and spaces'
  } else {
    nameError.value = ''
  }
}

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

const validatePhone = () => {
  const phone = formData.value.phone.trim()
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/

  if (!phone) {
    phoneError.value = 'Phone number is required'
  } else if (!phoneRegex.test(phone)) {
    phoneError.value = 'Please enter a valid phone number'
  } else {
    phoneError.value = ''
  }
}

const validateRole = () => {
  if (!formData.value.role) {
    roleError.value = 'Please select a role'
  } else {
    roleError.value = ''
  }
}

const validatePassword = () => {
  const password = formData.value.password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/

  if (!password) {
    passwordError.value = 'Password is required'
  } else if (!passwordRegex.test(password)) {
    passwordError.value =
      'Password must be at least 8 characters with uppercase, lowercase, and number'
  } else {
    passwordError.value = ''
  }

  // Re-validate confirm password if it exists
  if (formData.value.confirmPassword) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  const password = formData.value.password
  const confirmPassword = formData.value.confirmPassword

  if (!confirmPassword) {
    confirmPasswordError.value = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match'
  } else {
    confirmPasswordError.value = ''
  }
}

const validateTerms = () => {
  if (!formData.value.acceptTerms) {
    termsError.value = 'You must accept the terms and conditions'
  } else {
    termsError.value = ''
  }
}

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Handle form submission
const handleRegister = async () => {
  // Validate all fields
  validateName()
  validateEmail()
  validatePhone()
  validateRole()
  validatePassword()
  validateConfirmPassword()
  validateTerms()

  if (!isFormValid.value) {
    return
  }

  isLoading.value = true
  registerError.value = ''
  registerSuccess.value = ''

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock registration logic
    const userData = {
      id: Date.now(),
      name: formData.value.name,
      email: formData.value.email,
      phone: formData.value.phone,
      role: formData.value.role,
    }

    // Simulate successful registration
    registerSuccess.value = 'Account created successfully! Logging you in...'

    // Auto-login after successful registration
    setTimeout(() => {
      authStore.login(userData)
      router.push('/')
    }, 1000)
  } catch (error) {
    registerError.value = 'An error occurred during registration. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
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
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}

.btn-success {
  background: linear-gradient(135deg, #198754 0%, #157347 100%);
  border: none;
}

.btn-success:hover {
  background: linear-gradient(135deg, #157347 0%, #146c43 100%);
}

.btn-success:disabled {
  opacity: 0.6;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.form-text {
  font-size: 0.875rem;
  color: #6c757d;
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
