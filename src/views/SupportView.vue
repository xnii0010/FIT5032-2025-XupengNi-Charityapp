<template>
  <div class="support-page">
    <!-- Hero Section -->
    <section class="hero-section bg-info text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Support Us</h1>
            <p class="lead">
              Get in touch with us for support, questions, or to learn how you can help make a
              difference in Indigenous communities.
            </p>
          </div>
          <div class="col-lg-6 text-center">
            <div class="hero-image bg-light bg-opacity-25 rounded p-5">
              <i class="bi bi-telephone text-white" style="font-size: 5rem"></i>
              <p class="text-white mt-3 mb-0">We're Here to Help</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="contact-info py-5">
      <div class="container">
        <h2 class="text-center mb-5">Contact Information</h2>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body p-4">
                <i class="bi bi-geo-alt text-info mb-3" style="font-size: 3rem"></i>
                <h5 class="card-title">Address</h5>
                <p class="card-text">
                  123 Health Street<br />
                  Melbourne, VIC 3000<br />
                  Australia
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body p-4">
                <i class="bi bi-telephone text-info mb-3" style="font-size: 3rem"></i>
                <h5 class="card-title">Phone</h5>
                <p class="card-text">
                  <strong>Main:</strong> (03) 1234 5678<br />
                  <strong>Emergency:</strong> 000<br />
                  <strong>Crisis Line:</strong> 13 11 14
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body p-4">
                <i class="bi bi-envelope text-info mb-3" style="font-size: 3rem"></i>
                <h5 class="card-title">Email</h5>
                <p class="card-text">
                  <strong>General:</strong> info@indigenoushealth.org<br />
                  <strong>Support:</strong> support@indigenoushealth.org<br />
                  <strong>Emergency:</strong> emergency@indigenoushealth.org
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Emergency Support -->
    <section class="emergency-support bg-danger text-white py-5">
      <div class="container text-center">
        <h2 class="mb-4"><i class="bi bi-exclamation-triangle me-2"></i>Emergency Support</h2>
        <p class="lead mb-4">
          If you are experiencing a mental health crisis or emergency, please contact:
        </p>
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="d-flex justify-content-center gap-4 flex-wrap">
              <div class="emergency-contact">
                <h4>Emergency Services</h4>
                <p class="mb-0"><strong>000</strong></p>
              </div>
              <div class="emergency-contact">
                <h4>Lifeline</h4>
                <p class="mb-0"><strong>13 11 14</strong></p>
              </div>
              <div class="emergency-contact">
                <h4>Beyond Blue</h4>
                <p class="mb-0"><strong>1300 22 4636</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

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

.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--purple-accent);
  box-shadow: 0 0 0 0.2rem var(--purple-shadow-light);
}

.btn-info {
  background: linear-gradient(135deg, var(--purple-accent) 0%, var(--purple-accent-dark) 100%);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-info:hover {
  background: linear-gradient(135deg, var(--purple-accent-dark) 0%, var(--purple-primary) 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--purple-shadow-medium) !important;
}

.btn-info:focus {
  background: linear-gradient(135deg, var(--purple-accent) 0%, var(--purple-accent-dark) 100%);
  box-shadow: 0 0 0 0.2rem var(--purple-shadow-light);
}

.btn-info:not(:disabled):not(.disabled):active {
  background: linear-gradient(135deg, var(--purple-accent-dark) 0%, var(--purple-primary) 100%);
}

.btn-info:disabled {
  opacity: 0.6;
}

.emergency-support {
  background: linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-primary-dark) 100%);
}

.emergency-contact {
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5rem;
}

.emergency-contact h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.emergency-contact p {
  font-size: 1.5rem;
  font-weight: bold;
}

/* Responsive design here*/
@media (max-width: 768px) {
  .display-4 {
    font-size: 2.5rem;
  }

  .hero-image {
    margin-top: 2rem;
  }

  .emergency-contact {
    margin: 0.25rem;
    padding: 0.75rem;
  }

  .emergency-contact p {
    font-size: 1.25rem;
  }
}
</style>
