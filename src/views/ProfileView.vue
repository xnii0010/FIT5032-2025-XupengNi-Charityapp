<template>
  <div class="profile-page">
    <!-- Hero Section -->
    <section class="hero-section bg-success text-white py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="h2 mb-2">My Profile</h1>
            <p class="mb-0">View and manage your account information</p>
          </div>
          <div class="col-md-4 text-center">
            <div
              class="profile-avatar bg-light bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center"
              style="width: 80px; height: 80px"
            >
              <i class="bi bi-person-circle text-white" style="font-size: 3rem"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Profile Content -->
    <section class="profile-content py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <!-- Personal Information Card -->
            <div class="card shadow-sm">
              <div class="card-header bg-success text-white">
                <h5 class="mb-0"><i class="bi bi-person me-2"></i>Personal Information</h5>
              </div>
              <div class="card-body">
                <!-- User Profile Display -->
                <div class="row">
                  <div class="col-md-4 text-center mb-4">
                    <div
                      class="user-avatar bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                      style="width: 120px; height: 120px"
                    >
                      <i class="bi bi-person-circle text-success" style="font-size: 5rem"></i>
                    </div>
                    <h4 class="text-success mt-3 mb-1">{{ authStore.user?.name || 'User' }}</h4>
                    <span class="badge bg-primary">{{ authStore.user?.role || 'User' }}</span>
                  </div>
                  <div class="col-md-8">
                    <div class="info-section">
                      <div class="info-item mb-3">
                        <label class="form-label fw-bold text-muted">
                          <i class="bi bi-envelope me-2"></i>Email Address:
                        </label>
                        <p class="mb-0">{{ authStore.user?.email || 'Not provided' }}</p>
                      </div>

                      <div class="info-item mb-3">
                        <label class="form-label fw-bold text-muted">
                          <i class="bi bi-telephone me-2"></i>Phone Number:
                        </label>
                        <p class="mb-0">{{ authStore.user?.phone || 'Not provided' }}</p>
                      </div>

                      <div class="info-item mb-3">
                        <label class="form-label fw-bold text-muted">
                          <i class="bi bi-person-badge me-2"></i>User Role:
                        </label>
                        <p class="mb-0">
                          <span class="badge" :class="getRoleBadgeClass(authStore.user?.role)">
                            {{ authStore.user?.role || 'User' }}
                          </span>
                        </p>
                      </div>

                      <div class="info-item mb-3">
                        <label class="form-label fw-bold text-muted">
                          <i class="bi bi-calendar me-2"></i>Member Since:
                        </label>
                        <p class="mb-0">{{ formatJoinDate() }}</p>
                      </div>

                      <div class="info-item mb-3">
                        <label class="form-label fw-bold text-muted">
                          <i class="bi bi-check-circle me-2"></i>Account Status:
                        </label>
                        <p class="mb-0">
                          <span class="badge bg-success">
                            <i class="bi bi-check-circle me-1"></i>Active
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <hr class="my-4" />
                <div class="row">
                  <div class="col-12">
                    <h6 class="text-success mb-3">Account Actions</h6>
                    <div class="d-flex flex-wrap gap-2">
                      <button class="btn btn-outline-success" @click="editProfile">
                        <i class="bi bi-pencil me-2"></i>Edit Profile
                      </button>
                      <button class="btn btn-outline-primary" @click="changePassword">
                        <i class="bi bi-shield-lock me-2"></i>Change Password
                      </button>
                      <router-link to="/events" class="btn btn-outline-info">
                        <i class="bi bi-calendar-event me-2"></i>View Events
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

// Initialize store
const authStore = useAuthStore()

const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-danger'
    case 'volunteer':
      return 'bg-warning'
    default:
      return 'bg-primary'
  }
}

const formatJoinDate = () => {
  // Simple date formatting - in a real app this would come from user data
  const currentDate = new Date()
  return currentDate.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const editProfile = () => {
  alert('Edit profile functionality would be implemented here')
}

const changePassword = () => {
  alert('Change password functionality would be implemented here')
}
</script>

<style scoped>
/* Simple styling for the profile page */
.hero-section {
  background: linear-gradient(135deg, #198754 0%, #157347 100%);
}

.card {
  border: none;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.btn-success {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--purple-shadow-medium) !important;
}

.user-avatar {
  flex-shrink: 0;
}

.info-item label {
  font-size: 0.9rem;
}

.info-item p {
  font-size: 1rem;
  color: #495057;
}

.info-section {
  padding: 1rem 0;
}

/* Responsive design here */
@media (max-width: 768px) {
  .profile-avatar {
    margin-top: 1rem;
  }

  .user-avatar {
    width: 100px !important;
    height: 100px !important;
  }

  .user-avatar i {
    font-size: 4rem !important;
  }

  .info-section {
    padding: 0.5rem 0;
  }
}

@media (max-width: 576px) {
  .user-avatar {
    width: 80px !important;
    height: 80px !important;
  }

  .user-avatar i {
    font-size: 3rem !important;
  }

  .d-flex.gap-2 {
    flex-direction: column;
  }

  .d-flex.gap-2 .btn {
    margin-bottom: 0.5rem;
  }
}
</style>
