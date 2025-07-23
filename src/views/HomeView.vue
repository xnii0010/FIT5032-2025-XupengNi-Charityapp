<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container-fluid h-100">
        <div class="row h-100 align-items-center">
          <div class="col-lg-6 text-white hero-content">
            <div class="px-4 px-lg-5">
              <h1 class="display-3 fw-bold mb-4 hero-title">Our Charity</h1>
              <p class="lead mb-4 hero-subtitle">
                Supporting Indigenous communities with comprehensive health services, traditional
                medicine integration, and community wellness programs.
              </p>
              <div class="hero-buttons">
                <router-link to="/about" class="btn btn-light btn-lg me-3 mb-2">
                  <i class="bi bi-info-circle me-2"></i>About Us
                </router-link>
                <router-link to="/events" class="btn btn-outline-light btn-lg mb-2">
                  <i class="bi bi-calendar-event me-2"></i>Our Programs
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6 text-center hero-image-col">
            <div class="hero-image-container">
              <div class="hero-image-placeholder">
                <i class="bi bi-heart-pulse text-white hero-icon"></i>
                <h3 class="text-white mt-3 mb-0">Health & Wellness</h3>
                <p class="text-white-50 mt-2">For Indigenous Communities</p>
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

        <!-- Event Cards Carousel -->
        <div class="row">
          <div v-for="(event, index) in dataStore.events" :key="event.id" class="col-lg-6 mb-4">
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
                      {{ index === 0 ? 'Read More' : 'Join Us' }}
                    </router-link>
                  </div>

                  <div class="col-md-4">
                    <div
                      class="image-placeholder bg-light rounded d-flex align-items-center justify-content-center"
                      style="height: 200px"
                    >
                      <div class="text-center text-muted">
                        <i class="bi bi-image" style="font-size: 3rem"></i>
                        <p class="mt-2 mb-0">Program Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Indicators -->
        <div class="text-center mt-4">
          <div class="carousel-indicators-custom">
            <span
              v-for="(event, index) in dataStore.events"
              :key="index"
              class="indicator"
              :class="{ active: index === 0 }"
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
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'

// Initialize stores
const authStore = useAuthStore()
const dataStore = useDataStore()

// Rating functionality
const userRatings = reactive({})
const hoverRatings = reactive({})

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
/* Full-screen hero section */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(135deg, #198754 0%, #20c997 50%, #0dcaf0 100%);
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
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  pointer-events: none; /* Allow clicks to pass through overlay */
}

.hero-content {
  position: relative;
  z-index: 10; /* Increase z-index to ensure buttons are clickable */
  animation: slideInLeft 1s ease-out;
}

.hero-image-col {
  position: relative;
  z-index: 2;
  animation: slideInRight 1s ease-out;
}

.hero-title {
  font-size: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out 0.3s both;
}

.hero-subtitle {
  font-size: 1.3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out 0.6s both;
}

.hero-buttons {
  animation: fadeInUp 1s ease-out 0.9s both;
  z-index: 15; /* Ensure buttons have highest z-index */
  position: relative;
}

.hero-buttons .btn {
  position: relative;
  z-index: 20; /* Highest z-index for clickable buttons */
  pointer-events: auto; /* Ensure buttons are clickable */
}

.hero-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.hero-image-placeholder {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: float 6s ease-in-out infinite;
}

.hero-icon {
  font-size: 6rem;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
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

/* Animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
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
  color: #198754;
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

/* CTA Section button fixes */
.cta-section .btn {
  position: relative;
  z-index: 10;
  pointer-events: auto;
}

/* Event cards styling */
.featured-events {
  background-color: #f8f9fa;
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
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
}

.card-header {
  background: linear-gradient(135deg, #343a40 0%, #495057 100%);
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
  color: #ffc107;
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
  color: #ffc107;
}

.rating-input {
  display: flex;
  align-items: center;
}

/* Carousel indicators */
.carousel-indicators-custom {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #dee2e6;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #198754;
}

/* Call to action section */
.cta-section {
  background: linear-gradient(135deg, #198754 0%, #20c997 100%);
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-section {
    height: 100vh;
    min-height: 500px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-content {
    text-align: center;
    margin-bottom: 2rem;
  }

  .hero-image-placeholder {
    padding: 2rem;
  }

  .hero-icon {
    font-size: 4rem;
  }

  .hero-buttons .btn {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-image-placeholder {
    padding: 1.5rem;
  }

  .hero-icon {
    font-size: 3rem;
  }
}
</style>
