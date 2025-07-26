<template>
  <div class="dashboard-page">
    <!-- Hero Section -->
    <section class="hero-section bg-success text-white py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="h2 mb-2">Admin Dashboard</h1>
            <p class="mb-0">Welcome to the admin panel</p>
          </div>
          <div class="col-md-4 text-center">
            <div
              class="dashboard-icon bg-light bg-opacity-25 rounded-circle d-inline-flex align-items-center justify-content-center"
              style="width: 80px; height: 80px"
            >
              <i class="bi bi-speedometer2 text-white" style="font-size: 3rem"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard Content -->
    <section class="dashboard-content py-5">
      <div class="container">
        <!-- Admin Information Card -->
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card shadow-sm">
              <div class="card-header bg-success text-white">
                <h5 class="mb-0"><i class="bi bi-person-badge me-2"></i>Admin Information</h5>
              </div>
              <div class="card-body">
                <!-- Admin Profile Display -->
                <div class="row">
                  <div class="col-md-4 text-center mb-3">
                    <div
                      class="admin-avatar bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                      style="width: 100px; height: 100px"
                    >
                      <i class="bi bi-person-circle text-success" style="font-size: 4rem"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h4 class="text-success mb-3">{{ authStore.user?.name || 'Admin User' }}</h4>

                    <div class="info-item mb-3">
                      <label class="form-label fw-bold text-muted">Email:</label>
                      <p class="mb-0">{{ authStore.user?.email || 'admin@example.com' }}</p>
                    </div>

                    <div class="info-item mb-3">
                      <label class="form-label fw-bold text-muted">Role:</label>
                      <span class="badge bg-danger ms-2">{{
                        authStore.user?.role || 'Admin'
                      }}</span>
                    </div>

                    <div class="info-item mb-3">
                      <label class="form-label fw-bold text-muted">Phone:</label>
                      <p class="mb-0">{{ authStore.user?.phone || 'Not provided' }}</p>
                    </div>

                    <div class="info-item mb-3">
                      <label class="form-label fw-bold text-muted">Login Status:</label>
                      <span class="badge bg-success ms-2">
                        <i class="bi bi-check-circle me-1"></i>Active
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Quick Actions -->
                <hr class="my-4" />
                <div class="row">
                  <div class="col-12">
                    <h6 class="text-success mb-3">Quick Actions</h6>
                    <div class="d-flex flex-wrap gap-2">
                      <router-link to="/events" class="btn btn-outline-success">
                        <i class="bi bi-calendar-event me-2"></i>View Events
                      </router-link>
                      <router-link to="/profile" class="btn btn-outline-primary">
                        <i class="bi bi-person me-2"></i>Edit Profile
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Simple Statistics -->
        <div class="row mt-4">
          <div class="col-md-4 mb-3">
            <div class="card text-center border-success">
              <div class="card-body">
                <i class="bi bi-calendar-event text-success" style="font-size: 2rem"></i>
                <h5 class="mt-2 text-success">{{ totalEvents }}</h5>
                <p class="text-muted mb-0">Total Events</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-center border-primary">
              <div class="card-body">
                <i class="bi bi-people text-primary" style="font-size: 2rem"></i>
                <h5 class="mt-2 text-primary">{{ totalUsers }}</h5>
                <p class="text-muted mb-0">Registered Users</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-center border-warning">
              <div class="card-body">
                <i class="bi bi-star text-warning" style="font-size: 2rem"></i>
                <h5 class="mt-2 text-warning">{{ totalRatings }}</h5>
                <p class="text-muted mb-0">Total Ratings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'
import { useUserStore } from '@/stores/users'

// Initialize stores
const authStore = useAuthStore()
const dataStore = useDataStore()
const userStore = useUserStore()

// Simple computed properties for basic statistics
const totalEvents = computed(() => {
  return dataStore.events ? dataStore.events.length : 0
})

const totalUsers = computed(() => {
  return userStore.getAllUsers().length
})

const totalRatings = computed(() => {
  if (!dataStore.events) return 0
  let count = 0
  dataStore.events.forEach((event) => {
    if (event.ratings) {
      count += event.ratings.length
    }
  })
  return count
})

// Initialize on component mount
onMounted(() => {
  console.log('Dashboard loaded for admin:', authStore.user?.name)
})
</script>

<style scoped>
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

.admin-avatar {
  flex-shrink: 0;
}

.info-item label {
  font-size: 0.9rem;
}

.info-item p {
  font-size: 1rem;
  color: #495057;
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

/* Responsive design here*/
@media (max-width: 768px) {
  .dashboard-icon {
    margin-top: 1rem;
  }

  .admin-avatar {
    width: 80px !important;
    height: 80px !important;
  }

  .admin-avatar i {
    font-size: 3rem !important;
  }
}
</style>
