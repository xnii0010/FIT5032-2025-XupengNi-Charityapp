<template>
  <div class="event-detail-page" v-if="event">
    <!-- Hero Section -->
    <section class="hero-section text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12">
            <nav aria-label="breadcrumb" class="mb-3">
              <ol class="breadcrumb text-white-50">
                <li class="breadcrumb-item">
                  <router-link to="/" class="text-white-50 text-decoration-none">Home</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/events" class="text-white-50 text-decoration-none"
                    >Events</router-link
                  >
                </li>
                <li class="breadcrumb-item active text-white" aria-current="page">
                  {{ event.title }}
                </li>
              </ol>
            </nav>
            <span class="badge bg-light text-dark mb-3">{{ event.category }}</span>
            <h1 class="display-4 fw-bold mb-4">{{ event.title }}</h1>
            <p class="lead">{{ event.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Details Section -->
    <section class="event-details-section py-5">
      <div class="container">
        <div class="row">
          <!-- Main Content -->
          <div class="col-lg-8">
            <!-- Event Information -->
            <div class="card shadow-sm mb-4">
              <div class="card-body">
                <h3 class="card-title text-purple mb-4">
                  <i class="bi bi-info-circle me-2"></i>Event Information
                </h3>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <div class="info-item">
                      <i class="bi bi-calendar text-purple me-2"></i>
                      <strong>Date:</strong> {{ formatDate(event.date) }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="info-item">
                      <i class="bi bi-clock text-purple me-2"></i>
                      <strong>Time:</strong> {{ event.time || '9:00 AM - 5:00 PM' }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="info-item">
                      <i class="bi bi-geo-alt text-purple me-2"></i>
                      <strong>Location:</strong> {{ event.location }}
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="info-item">
                      <i class="bi bi-people text-purple me-2"></i>
                      <strong>Capacity:</strong> {{ event.capacity || 'Unlimited' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Event Description -->
            <div class="card shadow-sm mb-4">
              <div class="card-body">
                <h3 class="card-title text-purple mb-4">
                  <i class="bi bi-file-text me-2"></i>About This Program
                </h3>
                <div class="event-content">
                  <p>{{ event.fullDescription || event.description }}</p>

                  <h5 class="mt-4 mb-3">What You'll Learn:</h5>
                  <ul class="list-unstyled">
                    <li v-for="(item, index) in learningPoints" :key="index" class="mb-2">
                      <i class="bi bi-check-circle text-purple me-2"></i>{{ item }}
                    </li>
                  </ul>

                  <h5 class="mt-4 mb-3">Who Should Attend:</h5>
                  <ul class="list-unstyled">
                    <li v-for="(item, index) in targetAudience" :key="index" class="mb-2">
                      <i class="bi bi-person-check text-purple me-2"></i>{{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Reviews Section -->
            <div class="card shadow-sm">
              <div class="card-body">
                <h3 class="card-title text-purple mb-4">
                  <i class="bi bi-star me-2"></i>Reviews & Ratings
                </h3>

                <!-- Overall Rating -->
                <div class="overall-rating mb-4 p-3 bg-light rounded">
                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <div class="d-flex align-items-center">
                        <div class="rating-display me-3">
                          <span
                            v-for="star in 5"
                            :key="star"
                            class="star large"
                            :class="{ filled: star <= Math.round(averageRating) }"
                          >
                            ★
                          </span>
                        </div>
                        <div>
                          <h4 class="mb-0">{{ averageRating }}</h4>
                          <small class="text-muted">{{ event.ratings.length }} reviews</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="rating-breakdown">
                        <div
                          v-for="rating in [5, 4, 3, 2, 1]"
                          :key="rating"
                          class="d-flex align-items-center mb-1"
                        >
                          <span class="me-2">{{ rating }}★</span>
                          <div class="progress flex-grow-1 me-2" style="height: 8px">
                            <div
                              class="progress-bar bg-purple"
                              :style="{ width: getRatingPercentage(rating) + '%' }"
                            ></div>
                          </div>
                          <small class="text-muted">{{ getRatingCount(rating) }}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- User Rating Form -->
                <div
                  v-if="authStore.isAuthenticated && !dataStore.hasUserRated(event.id)"
                  class="user-rating-form mb-4 p-3 border rounded"
                >
                  <h5 class="mb-3">Rate This Program</h5>
                  <div class="rating-input mb-3">
                    <label class="form-label">Your Rating:</label>
                    <div class="d-flex align-items-center">
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="star-input large"
                        :class="{ active: star <= userRating }"
                        @click="setUserRating(star)"
                      >
                        ★
                      </span>
                      <span class="ms-2 text-muted" v-if="userRating"
                        >{{ userRating }} star{{ userRating > 1 ? 's' : '' }}</span
                      >
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="reviewComment" class="form-label">Your Review (Optional):</label>
                    <textarea
                      id="reviewComment"
                      v-model="reviewComment"
                      class="form-control"
                      rows="3"
                      placeholder="Share your experience with this program..."
                    ></textarea>
                  </div>
                  <button class="btn btn-purple" @click="submitRating" :disabled="!userRating">
                    <i class="bi bi-star me-2"></i>Submit Rating
                  </button>
                </div>

                <!-- User's Existing Rating -->
                <div
                  v-if="dataStore.hasUserRated(event.id)"
                  class="user-existing-rating mb-4 p-3 bg-purple bg-opacity-10 rounded"
                >
                  <h5 class="text-purple mb-2">Your Rating</h5>
                  <div class="d-flex align-items-center">
                    <span
                      v-for="star in 5"
                      :key="star"
                      class="star"
                      :class="{ filled: star <= dataStore.getUserRating(event.id) }"
                    >
                      ★
                    </span>
                    <span class="ms-2">{{ dataStore.getUserRating(event.id) }} stars</span>
                  </div>
                </div>

                <!-- Login Prompt -->
                <div
                  v-if="!authStore.isAuthenticated"
                  class="login-prompt p-3 bg-light rounded text-center"
                >
                  <p class="mb-2">Want to rate this program?</p>
                  <router-link to="/login" class="btn btn-purple">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Login to Rate
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-lg-4">
            <!-- Quick Actions -->
            <div class="card shadow-sm mb-4">
              <div class="card-body">
                <h5 class="card-title text-purple mb-3">
                  <i class="bi bi-lightning me-2"></i>Quick Actions
                </h5>
                <div class="d-grid gap-2">
                  <button class="btn btn-purple" @click="registerForEvent">
                    <i class="bi bi-calendar-plus me-2"></i>Register for Event
                  </button>
                  <button class="btn btn-outline-purple" @click="exportToCSV">
                    <i class="bi bi-download me-2"></i>Export Event Data
                  </button>
                  <router-link to="/support" class="btn btn-outline-purple">
                    <i class="bi bi-question-circle me-2"></i>Ask Questions
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Related Events -->
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title text-purple mb-3">
                  <i class="bi bi-collection me-2"></i>Related Programs
                </h5>
                <div
                  v-for="relatedEvent in relatedEvents"
                  :key="relatedEvent.id"
                  class="related-event mb-3"
                >
                  <router-link :to="`/events/${relatedEvent.id}`" class="text-decoration-none">
                    <div class="card border-0 bg-light">
                      <div class="card-body p-3">
                        <h6 class="card-title text-purple mb-1">{{ relatedEvent.title }}</h6>
                        <small class="text-muted">{{ formatDate(relatedEvent.date) }}</small>
                        <div class="mt-2">
                          <span
                            v-for="star in 5"
                            :key="star"
                            class="star small"
                            :class="{
                              filled:
                                star <= Math.round(dataStore.getAverageRating(relatedEvent.id)),
                            }"
                          >
                            ★
                          </span>
                          <small class="text-muted ms-1">
                            {{ dataStore.getAverageRating(relatedEvent.id) }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </router-link>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'

// Initialize stores and router
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const dataStore = useDataStore()

// Component state
const userRating = ref(0)
const reviewComment = ref('')

// Get event from store
const event = computed(() => {
  const eventId = parseInt(route.params.id)
  return dataStore.events.find((e) => e.id === eventId)
})

// Computed properties
const averageRating = computed(() => {
  if (!event.value) return 0
  return dataStore.getAverageRating(event.value.id)
})

const relatedEvents = computed(() => {
  if (!event.value) return []
  return dataStore.events
    .filter((e) => e.id !== event.value.id && e.category === event.value.category)
    .slice(0, 3)
})

// Sample data for event details
const learningPoints = computed(() => {
  if (!event.value) return []

  const points = {
    Health: [
      'Traditional healing practices and modern healthcare integration',
      'Nutrition and healthy eating for Indigenous families',
      'Mental health awareness and support strategies',
      'Preventive care and early intervention techniques',
    ],
    Community: [
      'Community engagement and leadership skills',
      'Cultural preservation and celebration methods',
      'Building stronger community networks',
      'Youth mentorship and development programs',
    ],
  }

  return points[event.value.category] || points['Health']
})

const targetAudience = computed(() => {
  if (!event.value) return []

  return [
    'Indigenous community members',
    'Healthcare professionals',
    'Community leaders and elders',
    'Family members and caregivers',
    'Anyone interested in Indigenous health and wellbeing',
  ]
})

// Rating functions
const setUserRating = (rating) => {
  userRating.value = rating
}

const submitRating = () => {
  if (userRating.value && event.value) {
    dataStore.addRating(event.value.id, userRating.value, reviewComment.value)
    userRating.value = 0
    reviewComment.value = ''
  }
}

const getRatingCount = (rating) => {
  if (!event.value) return 0
  return event.value.ratings.filter((r) => r.rating === rating).length
}

const getRatingPercentage = (rating) => {
  if (!event.value || event.value.ratings.length === 0) return 0
  const count = getRatingCount(rating)
  return (count / event.value.ratings.length) * 100
}

const registerForEvent = () => {
  alert('Register for event function will be implemented here.')
}

// Export functions - Export event data to CSV format
const exportToCSV = () => {
  try {
    const csvData = [
      ['Field', 'Value'],
      ['ID', event.value.id || 'N/A'],
      ['Title', event.value.title || 'N/A'],
      ['Description', event.value.description || 'N/A'],
      ['Date', event.value.date ? formatDate(event.value.date) : 'N/A'],
      ['Location', event.value.location || 'N/A'],
      ['Organizer', event.value.organizer || 'N/A'],
      ['Category', event.value.category || 'N/A'],
      ['Capacity', event.value.capacity || 'N/A'],
      ['Total Ratings', event.value.ratings ? event.value.ratings.length : 'N/A'],
    ]

    // Convert to CSV string with proper escaping
    const csvContent = csvData
      .map((row) =>
        row
          .map((field) => {
            const stringField = String(field)
            // Escape quotes and wrap in quotes if contains comma, quote, or newline
            if (
              stringField.includes(',') ||
              stringField.includes('"') ||
              stringField.includes('\n')
            ) {
              return `"${stringField.replace(/"/g, '""')}"`
            }
            return stringField
          })
          .join(','),
      )
      .join('\n')

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = `event_${event.value.id}_data.csv`

    // Trigger download
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)

    URL.revokeObjectURL(url)
  } catch (error) {
    alert('Failed to export event data. Please try again.')
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

.breadcrumb-item + .breadcrumb-item::before {
  color: rgba(255, 255, 255, 0.5);
}

/* Info items */
.info-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
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

.star.large {
  font-size: 1.5rem;
}

.star.small {
  font-size: 0.8rem;
}

.star-input {
  color: #ddd;
  font-size: 1.5rem;
  margin-right: 2px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.star-input:hover,
.star-input.active {
  color: var(--purple-gold);
}

.star-input.large {
  font-size: 2rem;
}

/* Rating breakdown */
.rating-breakdown .progress {
  background-color: #e9ecef;
}

/* Related events */
.related-event .card:hover {
  background-color: #f8f9fa !important;
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Event content */
.event-content {
  line-height: 1.6;
}

.event-content ul li {
  padding: 0.25rem 0;
}

/* Cards */
.card {
  border: none;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }

  .hero-image {
    margin-top: 2rem;
  }

  .overall-rating .col-md-6:last-child {
    margin-top: 1rem;
  }

  .star-input.large {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .d-grid.gap-2 {
    gap: 0.5rem !important;
  }

  .info-item {
    font-size: 0.9rem;
  }
}
</style>
