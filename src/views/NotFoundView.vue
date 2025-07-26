<template>
  <div class="not-found-page">
    <!-- Main Content -->
    <section class="error-section d-flex align-items-center min-vh-100">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-xl-6 text-center">
            <!-- Error Illustration -->
            <div class="error-illustration mb-5">
              <div class="error-number">404</div>
              <div class="error-icon">
                <i class="bi bi-compass text-success"></i>
              </div>
            </div>
            
            <!-- Error Message -->
            <div class="error-content">
              <h1 class="display-5 fw-bold text-dark mb-3">
                Oops! Page Not Found
              </h1>
              <p class="lead text-muted mb-4">
                We're sorry, but the page you're looking for doesn't exist or has been moved.
                Let's help you find your way back to our health programs and community resources.
              </p>
              
              <!-- Helpful Links -->
              <div class="helpful-links mb-5">
                <h5 class="text-success mb-3">Where would you like to go?</h5>
                <div class="row g-3">
                  <div class="col-md-6">
                    <router-link to="/" class="btn btn-success btn-lg w-100">
                      <i class="bi bi-house me-2"></i>
                      Back to Home
                    </router-link>
                  </div>
                  <div class="col-md-6">
                    <router-link to="/events" class="btn btn-outline-success btn-lg w-100">
                      <i class="bi bi-calendar-event me-2"></i>
                      View Programs
                    </router-link>
                  </div>
                </div>
                
                <div class="row g-3 mt-2">
                  <div class="col-md-6">
                    <router-link to="/about" class="btn btn-outline-success btn-lg w-100">
                      <i class="bi bi-info-circle me-2"></i>
                      About Us
                    </router-link>
                  </div>
                  <div class="col-md-6">
                    <router-link to="/support" class="btn btn-outline-success btn-lg w-100">
                      <i class="bi bi-headset me-2"></i>
                      Get Support
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Additional Help Section -->
    <section class="help-section py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="text-center mb-5">
              <h3 class="text-success mb-3">Need More Help?</h3>
              <p class="text-muted">
                Our team is here to support you in finding the right health programs and resources.
              </p>
            </div>
            
            <div class="row g-4">
              <!-- Contact Support -->
              <div class="col-md-4">
                <div class="help-card text-center p-4 bg-white rounded shadow-sm h-100">
                  <div class="help-icon mb-3">
                    <i class="bi bi-headset text-success" style="font-size: 2.5rem;"></i>
                  </div>
                  <h5 class="mb-3">Contact Support</h5>
                  <p class="text-muted mb-3">
                    Get personalized help from our support team
                  </p>
                  <router-link to="/support" class="btn btn-success">
                    Contact Us
                  </router-link>
                </div>
              </div>
              
              <!-- Browse Programs -->
              <div class="col-md-4">
                <div class="help-card text-center p-4 bg-white rounded shadow-sm h-100">
                  <div class="help-icon mb-3">
                    <i class="bi bi-grid-3x3-gap text-success" style="font-size: 2.5rem;"></i>
                  </div>
                  <h5 class="mb-3">Browse All Programs</h5>
                  <p class="text-muted mb-3">
                    Explore our complete range of health programs
                  </p>
                  <router-link to="/events" class="btn btn-success">
                    View Programs
                  </router-link>
                </div>
              </div>
              
              <!-- Learn About Us -->
              <div class="col-md-4">
                <div class="help-card text-center p-4 bg-white rounded shadow-sm h-100">
                  <div class="help-icon mb-3">
                    <i class="bi bi-info-circle text-success" style="font-size: 2.5rem;"></i>
                  </div>
                  <h5 class="mb-3">About Our Mission</h5>
                  <p class="text-muted mb-3">
                    Learn more about our commitment to Indigenous health
                  </p>
                  <router-link to="/about" class="btn btn-success">
                    Learn More
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
import { useRouter } from 'vue-router'

// Initialize router
const router = useRouter()
</script>

<style scoped>
/* Main error section */
.error-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

/* Error illustration */
.error-illustration {
  position: relative;
  margin-bottom: 2rem;
}

.error-number {
  font-size: 8rem;
  font-weight: 900;
  color: #e9ecef;
  line-height: 1;
  margin-bottom: -1rem;
}

.error-icon {
  font-size: 4rem;
  margin-top: -2rem;
}

/* Error content */
.error-content {
  max-width: 600px;
  margin: 0 auto;
}

/* Helpful links */
.helpful-links .btn {
  transition: all 0.3s ease;
}

.helpful-links .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* Quick search */
.quick-search {
  max-width: 500px;
  margin: 0 auto;
}

.input-group-lg .form-control {
  border-radius: 0.5rem 0 0 0.5rem;
  border: 2px solid #dee2e6;
}

.input-group-lg .btn {
  border-radius: 0 0.5rem 0.5rem 0;
  border: 2px solid var(--purple-primary);
}

.input-group-lg .form-control:focus {
  border-color: var(--purple-primary);
  box-shadow: 0 0 0 0.2rem var(--purple-shadow-light);
}

/* Popular links */
.popular-links .btn {
  transition: all 0.2s ease;
}

.popular-links .btn:hover {
  background-color: var(--purple-primary);
  border-color: var(--purple-primary);
  color: white;
}

/* Help section */
.help-section {
  background-color: #f8f9fa;
}

.help-card {
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.help-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
  border-color: var(--purple-primary);
}

.help-icon {
  transition: transform 0.3s ease;
}

.help-card:hover .help-icon {
  transform: scale(1.1);
}

/* Button styling */
.btn-success {
  background-color: var(--purple-primary);
  border-color: var(--purple-primary);
  transition: all 0.3s ease;
}

.btn-success:hover {
  background-color: var(--purple-primary-dark);
  border-color: var(--purple-primary-darker);
  transform: translateY(-1px);
}

.btn-outline-success {
  color: var(--purple-primary);
  border-color: var(--purple-primary);
  transition: all 0.3s ease;
}

.btn-outline-success:hover {
  background-color: var(--purple-primary);
  border-color: var(--purple-primary);
  transform: translateY(-1px);
}

/* Responsive design */
@media (max-width: 768px) {
  .error-number {
    font-size: 6rem;
  }
  
  .error-icon {
    font-size: 3rem;
  }
  
  .display-5 {
    font-size: 2rem;
  }
  
  .helpful-links .row {
    gap: 0.5rem;
  }
  
  .helpful-links .btn-lg {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
  
  .quick-search .input-group {
    flex-direction: column;
  }
  
  .input-group-lg .form-control,
  .input-group-lg .btn {
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .input-group-lg .btn {
    margin-bottom: 0;
  }
  
  .popular-links .d-flex {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .popular-links .btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .error-number {
    font-size: 4rem;
  }
  
  .error-icon {
    font-size: 2.5rem;
  }
  
  .help-card {
    margin-bottom: 1rem;
  }
  
  .help-icon {
    font-size: 2rem !important;
  }
  
  .btn-lg {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* Animation for error illustration */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.error-icon {
  animation: float 3s ease-in-out infinite;
}

/* Focus states for accessibility */
.btn:focus,
.form-control:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem var(--purple-shadow-light);
}

/* Loading state for search button */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>