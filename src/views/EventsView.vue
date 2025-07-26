<template>
  <div class="events-page">
    <!-- Hero Section -->
    <section class="hero-section bg-success text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4">Our Programs & Events</h1>
            <p class="lead">
              Discover our ongoing health programs and upcoming community events designed to support
              Indigenous communities across Australia.
            </p>
          </div>
          <div class="col-lg-4 text-center">
            <div class="hero-image bg-light bg-opacity-25 rounded p-4">
              <i class="bi bi-calendar-event text-white" style="font-size: 4rem"></i>
              <p class="text-white mt-2 mb-0">Community Events</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section py-4 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 class="mb-0">Filter Events</h5>
          </div>
          <div class="col-md-6">
            <div class="d-flex gap-2 flex-wrap">
              <button
                class="btn btn-sm"
                :class="selectedFilter === 'all' ? 'btn-success' : 'btn-outline-success'"
                @click="setFilter('all')"
              >
                All Events
              </button>
              <button
                class="btn btn-sm"
                :class="selectedFilter === 'Health' ? 'btn-success' : 'btn-outline-success'"
                @click="setFilter('Health')"
              >
                Health Programs
              </button>
              <button
                class="btn btn-sm"
                :class="selectedFilter === 'Community' ? 'btn-success' : 'btn-outline-success'"
                @click="setFilter('Community')"
              >
                Community Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Grid -->
    <section class="events-grid py-5">
      <div class="container">
        <div class="row">
          <div v-for="event in filteredEvents" :key="event.id" class="col-lg-6 col-xl-4 mb-4">
            <div class="card h-100 shadow-sm event-card">
              <!-- Event Image -->
              <div
                class="card-img-top bg-light d-flex align-items-center justify-content-center"
                style="height: 200px"
              >
                <div class="text-center text-muted">
                  <i class="bi bi-image" style="font-size: 3rem"></i>
                  <p class="mt-2 mb-0">{{ event.category }} Program</p>
                </div>
              </div>

              <!-- Event Content -->
              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <span class="badge bg-success">{{ event.category }}</span>
                  <small class="text-muted">{{ formatDate(event.date) }}</small>
                </div>

                <h5 class="card-title">{{ event.title }}</h5>
                <p class="card-text flex-grow-1">{{ event.description }}</p>

                <!-- Event Details -->
                <div class="event-details mb-3">
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-geo-alt text-success me-2"></i>
                    <small>{{ event.location }}</small>
                  </div>
                  <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-calendar text-success me-2"></i>
                    <small>{{ formatDate(event.date) }}</small>
                  </div>
                </div>

                <!-- Rating Display -->
                <div class="rating-display mb-3">
                  <div class="d-flex align-items-center">
                    <div class="me-2">
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="star"
                        :class="{
                          filled: star <= Math.round(dataStore.getAverageRating(event.id)),
                        }"
                      >
                        ★
                      </span>
                    </div>
                    <small class="text-muted">
                      {{ dataStore.getAverageRating(event.id) }}
                      ({{ event.ratings.length }} reviews)
                    </small>
                  </div>
                </div>

                <!-- User Rating (for authenticated users) -->
                <div
                  v-if="authStore.isAuthenticated && !dataStore.hasUserRated(event.id)"
                  class="user-rating mb-3"
                >
                  <label class="form-label small">Rate this program:</label>
                  <div class="rating-input">
                    <span
                      v-for="star in 5"
                      :key="star"
                      class="star-input"
                      :class="{ active: star <= userRatings[event.id] }"
                      @click="setRating(event.id, star)"
                    >
                      ★
                    </span>
                    <button
                      v-if="userRatings[event.id]"
                      class="btn btn-sm btn-success ms-2"
                      @click="submitRating(event.id)"
                    >
                      Rate
                    </button>
                  </div>
                </div>

                <div v-if="dataStore.hasUserRated(event.id)" class="mb-3">
                  <small class="text-success">
                    <i class="bi bi-check-circle me-1"></i>
                    You rated: {{ dataStore.getUserRating(event.id) }} stars
                  </small>
                </div>

                <!-- Action Buttons -->
                <div class="mt-auto">
                  <router-link :to="`/events/${event.id}`" class="btn btn-success w-100">
                    <i class="bi bi-eye me-2"></i>View Details
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section bg-success text-white py-5">
      <div class="container text-center">
        <h2 class="mb-4">Want to Get Involved?</h2>
        <p class="lead mb-4">
          Join our community and help make a difference in Indigenous health and wellbeing.
        </p>
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <router-link to="/register" class="btn btn-light btn-lg">
            <i class="bi bi-person-plus me-2"></i>Join Us
          </router-link>
          <router-link to="/support" class="btn btn-outline-light btn-lg">
            <i class="bi bi-envelope me-2"></i>Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'

// Initialize stores
const authStore = useAuthStore()
const dataStore = useDataStore()

// Filter state
const selectedFilter = ref('all')

// Rating functionality
const userRatings = reactive({})

// Watch for authentication changes
watch(
  () => authStore.isAuthenticated,
  (newValue, oldValue) => {
    // If user logged out (was authenticated, now not)
    if (oldValue && !newValue) {
      // Clear local rating state
      Object.keys(userRatings).forEach((key) => delete userRatings[key])
    }
  },
)

// Computed property for filtered events
const filteredEvents = computed(() => {
  if (selectedFilter.value === 'all') {
    return dataStore.events
  }
  return dataStore.events.filter((event) => event.category === selectedFilter.value)
})

// Set filter function
const setFilter = (filter) => {
  selectedFilter.value = filter
}

// Rating functions
const setRating = (eventId, rating) => {
  userRatings[eventId] = rating
}

const submitRating = (eventId) => {
  if (userRatings[eventId]) {
    dataStore.addRating(eventId, userRatings[eventId])
    delete userRatings[eventId]
  }
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
/* Hero section styling */
.hero-section {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
}

.hero-image {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Event card styling */
.event-card {
  border: none;
}

/* Rating stars styling */
.star {
  color: #ddd;
  font-size: 1rem;
  margin-right: 1px;
}

.star.filled {
  color: var(--purple-gold);
}

.star-input {
  color: #ddd;
  font-size: 1rem;
  margin-right: 1px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.star-input:hover,
.star-input.active {
  color: var(--purple-gold);
}

.rating-input {
  display: flex;
  align-items: center;
}

/* Button styling */
.btn-success {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-outline-success {
  color: var(--purple-primary);
  border-color: var(--purple-primary);
}

.btn-outline-success:hover {
  background-color: var(--purple-primary);
  border-color: var(--purple-primary);
}

.btn-outline-success:focus {
  color: var(--purple-text-secondary);
  background-color: var(--purple-bg-secondary);
}

.btn-outline-success:not(:disabled):not(.disabled):active {
  background-color: var(--purple-primary);
  border-color: var(--purple-primary);
}

/* Event details styling */
.event-details small {
  color: var(--purple-text-secondary);
}

/* Call to action section */
.cta-section {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
}

/* Responsive design */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }

  .hero-image {
    margin-top: 2rem;
  }

  .filter-section .col-md-6:last-child {
    margin-top: 1rem;
  }

  .d-flex.gap-3 {
    flex-direction: column;
    gap: 1rem !important;
  }
}

@media (max-width: 576px) {
  .d-flex.gap-2 {
    flex-direction: column;
    gap: 0.5rem !important;
  }

  .btn-sm {
    width: 100%;
  }
}
</style>
