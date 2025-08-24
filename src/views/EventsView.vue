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

    <!-- Filter and Search Section -->
    <section class="filter-section py-4 bg-light">
      <div class="container">
        <!-- Individual Column Search -->
        <div class="row mb-4">
          <div class="col-12">
            <div class="row g-3">
              <div class="col-md-3">
                <div class="input-group">
                  <span class="input-group-text bg-success text-white">
                    <i class="bi bi-card-text"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by title..."
                    v-model="searchQueries.title"
                    @input="handleSearch"
                  />
                  <button
                    v-if="searchQueries.title"
                    class="btn btn-outline-secondary btn-sm"
                    type="button"
                    @click="clearSearch('title')"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group">
                  <span class="input-group-text bg-info text-white">
                    <i class="bi bi-file-text"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by description..."
                    v-model="searchQueries.description"
                    @input="handleSearch"
                  />
                  <button
                    v-if="searchQueries.description"
                    class="btn btn-outline-secondary btn-sm"
                    type="button"
                    @click="clearSearch('description')"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group">
                  <span class="input-group-text bg-warning text-white">
                    <i class="bi bi-geo-alt"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by location..."
                    v-model="searchQueries.location"
                    @input="handleSearch"
                  />
                  <button
                    v-if="searchQueries.location"
                    class="btn btn-outline-secondary btn-sm"
                    type="button"
                    @click="clearSearch('location')"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>

              <div class="col-md-3">
                <div class="input-group">
                  <span class="input-group-text bg-primary text-white">
                    <i class="bi bi-people"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by organizer..."
                    v-model="searchQueries.organizer"
                    @input="handleSearch"
                  />
                  <button
                    v-if="searchQueries.organizer"
                    class="btn btn-outline-secondary btn-sm"
                    type="button"
                    @click="clearSearch('organizer')"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="text-center mt-3" v-if="hasAnySearch">
              <button class="btn btn-outline-danger btn-sm" @click="clearAllSearches">
                <i class="bi bi-x-circle me-1"></i>Clear All Searches
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Buttons -->
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

    <!-- Events Table -->
    <section class="events-table py-5">
      <div class="container">
        <!-- Events Table -->
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-success">
              <tr>
                <th scope="col">Event</th>
                <th scope="col">Category</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Organizer</th>
                <th scope="col">Capacity</th>
                <th scope="col">Rating</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in paginatedEvents" :key="event.id" class="event-row">
                <!-- Event Info -->
                <td>
                  <div class="event-info">
                    <h6 class="mb-1 fw-bold">{{ event.title }}</h6>
                    <p class="mb-0 text-muted small">{{ event.description }}</p>
                  </div>
                </td>

                <!-- Category -->
                <td>
                  <span class="badge bg-success">{{ event.category }}</span>
                </td>

                <!-- Date -->
                <td>
                  <small class="text-muted">
                    <i class="bi bi-calendar me-1"></i>
                    {{ formatDate(event.date) }}
                  </small>
                </td>

                <!-- Location -->
                <td>
                  <small class="text-muted">
                    <i class="bi bi-geo-alt me-1"></i>
                    {{ event.location }}
                  </small>
                </td>

                <!-- Organizer -->
                <td>
                  <small class="text-muted">{{ event.organizer }}</small>
                </td>

                <!-- Capacity -->
                <td>
                  <small class="text-muted"> {{ event.registered }}/{{ event.capacity }} </small>
                </td>

                <!-- Rating -->
                <td>
                  <div class="rating-display">
                    <div class="d-flex align-items-center">
                      <div class="me-2">
                        <span
                          v-for="star in 5"
                          :key="star"
                          class="star small"
                          :class="{
                            filled: star <= Math.round(dataStore.getAverageRating(event.id)),
                          }"
                        >
                          ★
                        </span>
                      </div>
                      <small class="text-muted">
                        {{ dataStore.getAverageRating(event.id) }}
                      </small>
                    </div>

                    <!-- User Rating (for authenticated users) -->
                    <div
                      v-if="authStore.isAuthenticated && !dataStore.hasUserRated(event.id)"
                      class="user-rating mt-1"
                    >
                      <div class="rating-input">
                        <span
                          v-for="star in 5"
                          :key="star"
                          class="star-input small"
                          :class="{ active: star <= userRatings[event.id] }"
                          @click="setRating(event.id, star)"
                        >
                          ★
                        </span>
                        <button
                          v-if="userRatings[event.id]"
                          class="btn btn-xs btn-success ms-1"
                          @click="submitRating(event.id)"
                          style="font-size: 0.7rem; padding: 2px 6px"
                        >
                          Rate
                        </button>
                      </div>
                    </div>

                    <div v-if="dataStore.hasUserRated(event.id)" class="mt-1">
                      <small class="text-success">
                        <i class="bi bi-check-circle me-1"></i>
                        Rated: {{ dataStore.getUserRating(event.id) }}
                      </small>
                    </div>
                  </div>
                </td>

                <!-- Actions -->
                <td>
                  <router-link :to="`/events/${event.id}`" class="btn btn-sm btn-success">
                    <i class="bi bi-eye me-1"></i>View
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-4">
          <div class="text-muted">
            Showing {{ startIndex + 1 }} to
            {{ Math.min(startIndex + itemsPerPage, filteredEvents.length) }} of
            {{ filteredEvents.length }} events
          </div>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button
                  class="page-link"
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                >
                  Previous
                </button>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <button class="page-link" @click="goToPage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button
                  class="page-link"
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
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

// Search state
const searchQueries = reactive({
  title: '',
  description: '',
  location: '',
  organizer: '',
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 10

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

// Computed property for filtered and searched events
const filteredEvents = computed(() => {
  let events = dataStore.events

  // Apply category filter
  if (selectedFilter.value !== 'all') {
    events = events.filter((event) => event.category === selectedFilter.value)
  }

  // Apply search filter
  if (searchQueries.title.trim()) {
    const query = searchQueries.title.toLowerCase().trim()
    events = events.filter((event) => event.title.toLowerCase().includes(query))
  }

  if (searchQueries.description.trim()) {
    const query = searchQueries.description.toLowerCase().trim()
    events = events.filter((event) => event.description.toLowerCase().includes(query))
  }

  if (searchQueries.location.trim()) {
    const query = searchQueries.location.toLowerCase().trim()
    events = events.filter((event) => event.location.toLowerCase().includes(query))
  }

  if (searchQueries.organizer.trim()) {
    const query = searchQueries.organizer.toLowerCase().trim()
    events = events.filter((event) => event.organizer.toLowerCase().includes(query))
  }

  return events
})

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredEvents.value.length / itemsPerPage)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage
})

const paginatedEvents = computed(() => {
  const start = startIndex.value
  const end = start + itemsPerPage
  return filteredEvents.value.slice(start, end)
})

// Check if any search is active
const hasAnySearch = computed(() => {
  return (
    searchQueries.title.trim() ||
    searchQueries.description.trim() ||
    searchQueries.location.trim() ||
    searchQueries.organizer.trim()
  )
})

// Set filter function
const setFilter = (filter) => {
  selectedFilter.value = filter
  currentPage.value = 1 // Reset to first page when filter changes
}

// Search functions
const handleSearch = () => {
  currentPage.value = 1 // Reset to first page when search changes
}

const clearSearch = (column) => {
  if (column && searchQueries[column] !== undefined) {
    searchQueries[column] = ''
  }
  currentPage.value = 1
}

const clearAllSearches = () => {
  searchQueries.title = ''
  searchQueries.description = ''
  searchQueries.location = ''
  searchQueries.organizer = ''
  currentPage.value = 1 // Reset to first page when all searches are cleared
}

// Pagination functions
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
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

/* Search bar styling */
.input-group-text {
  border: none;
}

.form-control {
  border: 2px solid #e9ecef;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: var(--purple-primary);
  box-shadow: 0 0 0 0.2rem rgba(var(--purple-primary-rgb), 0.25);
}

.btn-outline-secondary {
  border-left: none;
  border-color: #e9ecef;
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  border-color: #e9ecef;
  color: #6c757d;
}

.hero-image {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Event table styling */
.event-row {
  transition: background-color 0.2s ease;
}

.event-row:hover {
  background-color: rgba(var(--bs-success-rgb), 0.1);
}

.event-info h6 {
  color: var(--purple-primary);
}

.event-info p {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-success {
  --bs-table-bg: var(--purple-primary);
  --bs-table-color: white;
}

.table th {
  border-bottom: 2px solid var(--purple-primary-dark);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.875rem;
}

.table td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
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
