<script setup>
/**
 * Dark Footer Component
 * Provides documentation links, external console links, and system status.
 */
const emit = defineEmits(['navigate-to'])

const navigate = (sectionId, subId) => {
  emit('navigate-to', { sectionId, subId })
}
</script>

<template>
  <footer class="mt-auto pave-dark-footer py-5">
    <div class="container-xxl px-4">
      <div class="row g-4 align-items-center justify-content-between mb-4">
        <!-- Brand blurb -->
        <div class="col-lg-5">
          <div class="d-flex align-items-center mb-3">
            <img src="/assets/img/logo/logo6a.png" alt="Pave360" height="30" class="me-2" style="object-fit: contain;">
            <span class="text-white fw-bold fs-5" style="letter-spacing: -0.5px;">Pave360 <span class="text-white-50 fw-normal">Developers</span></span>
          </div>
          <p class="text-secondary small mb-0" style="max-width: 380px; line-height: 1.6;">
            High-performance external API infrastructure for SMS dispatches, voice broadcasting, USSD integration, and one-time password verification.
          </p>
        </div>

        <!-- Documentation quick links -->
        <div class="col-6 col-lg-3">
          <h6 class="text-uppercase small fw-bold text-white-50 mb-3" style="letter-spacing: 0.5px;">Documentation</h6>
          <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
            <li><a href="#" @click.prevent="navigate('overview', 'overview')"><i class="bi bi-chevron-right small text-success me-1"></i> API Overview</a></li>
            <li><a href="#" @click.prevent="navigate('overview', 'base-url-props')"><i class="bi bi-chevron-right small text-success me-1"></i> Base URL Properties</a></li>
            <li><a href="#" @click.prevent="navigate('messaging', 'sms-send')"><i class="bi bi-chevron-right small text-success me-1"></i> Messaging APIs</a></li>
            <li><a href="#" @click.prevent="navigate('ussd', 'ussd-overview')"><i class="bi bi-chevron-right small text-success me-1"></i> USSD Protocol</a></li>
            <li><a href="#" @click.prevent="navigate('auth-endpoints', 'otp-send')"><i class="bi bi-chevron-right small text-success me-1"></i> Authentication / OTP</a></li>
            <li><a href="#" @click.prevent="navigate('diagnostics', 'system-codes')"><i class="bi bi-chevron-right small text-success me-1"></i> System Codes</a></li>
          </ul>
        </div>

        <!-- External Developer Portal links -->
        <div class="col-6 col-lg-3">
          <h6 class="text-uppercase small fw-bold text-white-50 mb-3" style="letter-spacing: 0.5px;">Developer Portal</h6>
          <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
            <li><a href="https://app.pave360.com/auth/signin" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right small text-success me-1"></i> Console Sign In</a></li>
            <li><a href="https://app.pave360.com/auth/signup" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right small text-success me-1"></i> Create Free Account</a></li>
            <li><a href="#" data-bs-toggle="modal" data-bs-target="#credentialsModal"><i class="bi bi-gear small text-success me-1"></i> Set Test Credentials</a></li>
            <li><a href="https://pave360.com" target="_blank" rel="noopener"><i class="bi bi-globe small text-success me-1"></i> Pave360 Main Site</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-top pt-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2" style="border-color: rgba(255, 255, 255, 0.08) !important;">
        <small class="text-white-50">&copy; 2026 Pave360 Inc. All rights reserved. Built for developers.</small>
        <div class="d-flex align-items-center gap-3">
          <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-1">
            <i class="bi bi-check-circle-fill me-1"></i> All Systems Operational
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
