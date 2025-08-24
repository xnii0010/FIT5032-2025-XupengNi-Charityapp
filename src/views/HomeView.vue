<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container-fluid h-100">
        <div class="row h-100 align-items-center justify-content-center">
          <div class="col-lg-8 col-xl-6 text-white text-center hero-content">
            <div class="px-4 px-lg-5">
              <h1 class="display-3 fw-bold mb-4 hero-title">Our Charity</h1>
              <p class="lead mb-4 hero-subtitle">
                Supporting Indigenous communities with comprehensive health services, traditional
                medicine integration, and community wellness programs.
              </p>
              <div class="hero-buttons d-flex justify-content-center gap-3 flex-wrap">
                <router-link to="/about" class="btn btn-light btn-lg">
                  <i class="bi bi-info-circle me-2"></i>About Us
                </router-link>
                <router-link to="/events" class="btn btn-outline-light btn-lg">
                  <i class="bi bi-calendar-event me-2"></i>Our Events
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator">
        <i class="bi bi-chevron-down text-white"></i>
      </div>
    </section>

    <!-- Featured Events Section -->
    <section class="featured-events py-5">
      <div class="container">
        <h2 class="text-center mb-5">Featured Programs</h2>

        <!-- Event Cards Display -->
        <div class="events-container">
          <!-- Event Slides -->
          <div class="events-slides">
            <div
              v-for="(slide, slideIndex) in eventSlides"
              :key="slideIndex"
              class="events-slide"
              :class="{ active: slideIndex === currentSlide }"
            >
              <div class="row">
                <div v-for="(event, eventIndex) in slide" :key="event.id" class="col-lg-6 mb-4">
                  <div class="card h-100 shadow-sm">
                    <div class="card-header bg-dark text-white">
                      <h5 class="card-title mb-0">{{ event.title }}</h5>
                    </div>

                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-8">
                          <p class="card-text">{{ event.description }}</p>
                          <div class="mb-3">
                            <small class="text-muted">
                              <i class="bi bi-geo-alt me-1"></i>{{ event.location }}
                              <span class="ms-3">
                                <i class="bi bi-calendar me-1"></i>{{ formatDate(event.date) }}
                              </span>
                            </small>
                          </div>

                          <!-- Rating Display -->
                          <div class="mb-3">
                            <div class="d-flex align-items-center">
                              <div class="me-2">
                                <span
                                  v-for="star in 5"
                                  :key="star"
                                  class="star"
                                  :class="{
                                    filled:
                                      star <= Math.round(dataStore.getAverageRating(event.id)),
                                  }"
                                >
                                  ★
                                </span>
                              </div>
                              <span class="text-muted">
                                {{ dataStore.getAverageRating(event.id) }}
                                ({{ event.ratings.length }} reviews)
                              </span>
                            </div>
                          </div>

                          <!-- User Rating Section (only for authenticated users) -->
                          <div
                            v-if="authStore.isAuthenticated && !dataStore.hasUserRated(event.id)"
                            class="mb-3"
                          >
                            <label class="form-label">Rate this program:</label>
                            <div class="rating-input">
                              <span
                                v-for="star in 5"
                                :key="star"
                                class="star-input"
                                :class="{ active: star <= userRatings[event.id] }"
                                @click="setRating(event.id, star)"
                                @mouseover="hoverRating(event.id, star)"
                                @mouseleave="resetHover(event.id)"
                              >
                                ★
                              </span>
                              <button
                                v-if="userRatings[event.id]"
                                class="btn btn-sm btn-primary ms-2"
                                @click="submitRating(event.id)"
                              >
                                Submit Rating
                              </button>
                            </div>
                          </div>

                          <div v-if="dataStore.hasUserRated(event.id)" class="mb-3">
                            <small class="text-success">
                              <i class="bi bi-check-circle me-1"></i>
                              You rated this program: {{ dataStore.getUserRating(event.id) }} stars
                            </small>
                          </div>

                          <router-link :to="`/events/${event.id}`" class="btn btn-primary">
                            {{ slideIndex === 0 && eventIndex === 0 ? 'Read More' : 'Join Us' }}
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Page Indicators -->
        <div class="text-center mt-4" v-if="totalSlides > 1">
          <div class="page-indicators">
            <span
              v-for="(slide, index) in eventSlides"
              :key="index"
              class="indicator"
              :class="{ active: index === currentSlide }"
              @click="goToSlide(index)"
            ></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section bg-primary text-white py-5">
      <div class="container text-center">
        <h2 class="mb-4">Join Our Mission</h2>
        <p class="lead mb-4">
          Help us make a difference in Indigenous communities across Australia
        </p>
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <router-link to="/register" class="btn btn-light btn-lg">
            <i class="bi bi-person-plus me-2"></i>Get Involved
          </router-link>
          <router-link to="/support" class="btn btn-outline-light btn-lg">
            <i class="bi bi-telephone me-2"></i>Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'

// Initialize stores
const authStore = useAuthStore()
const dataStore = useDataStore()

// Rating functionality
const userRatings = reactive({})
const hoverRatings = reactive({})

// Carousel functionality
const currentSlide = ref(0)
const itemsPerSlide = 2

// Computed property to group events into slides
const eventSlides = computed(() => {
  const slides = []
  const events = dataStore.events
  for (let i = 0; i < events.length; i += itemsPerSlide) {
    slides.push(events.slice(i, i + itemsPerSlide))
  }
  return slides
})

// Total number of slides
const totalSlides = computed(() => eventSlides.value.length)

// Navigate to specific slide
const goToSlide = (index) => {
  currentSlide.value = index
}

// Watch for authentication changes
watch(
  () => authStore.isAuthenticated,
  (newValue, oldValue) => {
    // If user logged out (was authenticated, now not)
    if (oldValue && !newValue) {
      // Clear local rating state
      Object.keys(userRatings).forEach((key) => delete userRatings[key])
      Object.keys(hoverRatings).forEach((key) => delete hoverRatings[key])
    }
  },
)

// Set user rating for an event
const setRating = (eventId, rating) => {
  userRatings[eventId] = rating
}

// Handle hover effect for rating stars
const hoverRating = (eventId, rating) => {
  hoverRatings[eventId] = rating
}

// Reset hover effect
const resetHover = (eventId) => {
  delete hoverRatings[eventId]
}

// Submit user rating
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
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  background-image: url('@/assets/images/Homepage_backgroundpic.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 10; /* Increase z-index to ensure buttons are clickable */
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease-out 0.3s both;
}

.hero-subtitle {
  font-size: 1.3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease-out 0.6s both;
  max-width: 600px;
  margin: 0 auto;
}

.hero-buttons {
  animation: fadeInUp 1s ease-out 0.9s both;
  z-index: 15; /* Ensure buttons have highest z-index */
  position: relative;
}

.hero-buttons .btn {
  position: relative;
  z-index: 20; /* Highest z-index for clickable buttons */
  pointer-events: auto;
  min-width: 180px;
  text-align: center;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
  cursor: pointer;
}

.scroll-indicator i {
  font-size: 2rem;
}

/* Animations implement*/
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Button styling */
.btn-light {
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  color: var(--purple-primary);
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative; /* Ensure proper positioning */
  z-index: 25; /* High z-index for clickability */
}

.btn-light:hover {
  background-color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-outline-light {
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative; /* Ensure proper positioning */
  z-index: 25; /* High z-index for clickability */
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* CTA Section specific button styling */
.cta-section .btn-outline-light:hover {
  background-color: var(--purple-accent);
  border-color: var(--purple-accent);
}

/* CTA Section button fixes */
.cta-section .btn {
  position: relative;
  z-index: 10;
  pointer-events: auto;
}

/* Event cards styling */
.featured-events {
  background-color: var(--purple-bg-primary);
}

.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: none;
  border-radius: 15px;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px var(--purple-shadow-black) !important;
}

.card-header {
  background: linear-gradient(135deg, var(--purple-text-primary) 0%, #495057 100%);
  border: none;
  padding: 1.5rem;
}

/* Rating stars styling */
.star {
  color: #ddd;
  font-size: 1.2rem;
  margin-right: 2px;
}

.star.filled {
  color: var(--purple-gold);
}

.star-input {
  color: #ddd;
  font-size: 1.2rem;
  margin-right: 2px;
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

/* Events Display Styles */
.events-container {
  border-radius: 12px;
}

.events-slides {
  position: relative;
  height: auto;
}

.events-slide {
  display: none;
}

.events-slide.active {
  display: block;
}

/* Page Indicators Styles */
.page-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  background-color: #999;
  transform: scale(1.1);
}

.indicator.active {
  background-color: var(--purple-primary);
  transform: scale(1.2);
}

.cta-section {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
    min-height: 500px;
    background-attachment: scroll;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-content {
    padding: 0 1rem;
  }

  .hero-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .hero-buttons .btn {
    width: 100%;
    max-width: 300px;
    min-width: 200px;
    margin: 0;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-content {
    padding: 0 0.5rem;
  }

  .hero-buttons .btn {
    font-size: 0.9rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>
