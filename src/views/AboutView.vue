<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">About Us</h1>
            <p class="lead">
              We are dedicated to supporting Indigenous communities across Australia with
              comprehensive health services, cultural preservation, and community empowerment.
            </p>
          </div>
          <div class="col-lg-6 text-center">
            <div class="hero-image bg-light bg-opacity-25 rounded p-5">
              <i class="bi bi-people text-white" style="font-size: 5rem"></i>
              <p class="text-white mt-3 mb-0">Community First</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="mb-4">Our Mission</h2>
            <p class="lead">
              To bridge the health gap in Indigenous communities by providing culturally appropriate
              healthcare services, promoting traditional healing practices, and empowering
              communities to take control of their health and wellbeing.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section bg-light py-5">
      <div class="container">
        <h2 class="text-center mb-5">Our Values</h2>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body p-4">
                <i class="bi bi-heart text-primary mb-3" style="font-size: 3rem"></i>
                <h5 class="card-title">Cultural Respect</h5>
                <p class="card-text">
                  We honor and respect Indigenous cultures, traditions, and ways of knowing.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body p-4">
                <i class="bi bi-people text-primary mb-3" style="font-size: 3rem"></i>
                <h5 class="card-title">Community Empowerment</h5>
                <p class="card-text">
                  We work with communities to build capacity and self-determination.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body p-4">
                <i class="bi bi-shield-check text-primary mb-3" style="font-size: 3rem"></i>
                <h5 class="card-title">Holistic Health</h5>
                <p class="card-text">
                  We address physical, mental, spiritual, and social wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section py-5">
      <div class="container">
        <h2 class="text-center mb-5">Our Team</h2>
        <div class="row">
          <div class="col-md-6 col-lg-3 mb-4" v-for="member in teamMembers" :key="member.id">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body p-4">
                <div
                  class="team-avatar bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style="width: 80px; height: 80px"
                >
                  <i class="bi bi-person" style="font-size: 2rem"></i>
                </div>
                <h5 class="card-title">{{ member.name }}</h5>
                <p class="text-muted">{{ member.role }}</p>
                <p class="card-text small">{{ member.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section class="impact-section bg-primary text-white py-5">
      <div class="container">
        <h2 class="text-center mb-5">Our Impact</h2>
        <div class="row text-center">
          <div class="col-md-3 mb-4">
            <div class="impact-stat">
              <h3 class="display-4 fw-bold">50+</h3>
              <p class="lead">Communities Served</p>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="impact-stat">
              <h3 class="display-4 fw-bold">1000+</h3>
              <p class="lead">People Helped</p>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="impact-stat">
              <h3 class="display-4 fw-bold">25</h3>
              <p class="lead">Health Programs</p>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="impact-stat">
              <h3 class="display-4 fw-bold">10</h3>
              <p class="lead">Years of Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Team members data hard coded
const teamMembers = ref([
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Medical Director',
    description: 'Leading healthcare initiatives with 15 years of experience in Indigenous health.',
  },
  {
    id: 2,
    name: 'Michael Williams',
    role: 'Community Liaison',
    description: 'Connecting communities with resources and building lasting partnerships.',
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Program Coordinator',
    description: 'Managing health programs and ensuring quality service delivery.',
  },
  {
    id: 4,
    name: 'David Brown',
    role: 'Cultural Advisor',
    description: 'Ensuring cultural appropriateness and traditional knowledge integration.',
  },
])
</script>

<style scoped>
/* Hero section styling */
.hero-section {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
}

.hero-image {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Card hover effects */
.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

/* Team avatar styling */
.team-avatar {
  transition: background-color 0.3s ease;
}

.card:hover .team-avatar {
  background-color: var(--purple-primary-dark) !important;
}

/* Impact section styling */
.impact-section {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
}

.btn-primary {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--purple-shadow-medium) !important;
}

.btn-primary:active {
  transform: translateY(0);
  background-color: var(--purple-primary-darker) !important;
}

.btn-primary:focus {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
  box-shadow: 0 0 0 0.2rem var(--purple-shadow-light);
}

.impact-stat {
  padding: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }

  .hero-image {
    margin-top: 2rem;
  }

  .impact-stat h3 {
    font-size: 2.5rem;
  }
}
</style>
