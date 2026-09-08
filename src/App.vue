<script setup>
import AuthenticationDoc from './components/AuthenticationDoc.vue'
import ApiEndpointsDoc from './components/ApiEndpointsDoc.vue'
import ApiCodesDoc from './components/ApiCodesDoc.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const activeId = ref('overview')
const isManualScrolling = ref(false)

const scrollToId = (id) => {
  isManualScrolling.value = true
  activeId.value = id
  const element = document.getElementById(id)
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY - 100 // 100px offset for sticky header
    window.scrollTo({ top: y, behavior: 'smooth' })
    
    // Resume scroll spy after smooth scroll finishes
    setTimeout(() => {
      isManualScrolling.value = false
    }, 800)
  }
}

const handleScroll = () => {
  if (isManualScrolling.value) return

  const sections = [
    'overview', 'base-url', 'authentication',
    'sms-send', 'sms-campaign', 'sms-status',
    'voice-send', 'voice-status',
    'otp-send', 'otp-verify',
    'sandbox', 'system-codes'
  ]

  const scrollPosition = window.scrollY + 150
  let current = sections[0]

  for (const id of sections) {
    const element = document.getElementById(id)
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      if (elementTop <= scrollPosition) {
        current = id
      }
    }
  }

  if (activeId.value !== current) {
    activeId.value = current
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg sticky-top py-3 pave-main-nav">
      <div class="container-xxl px-4 d-flex justify-content-between align-items-center">
        
        <!-- Hamburger (Mobile only) -->
        <button class="btn nav-icon-btn d-md-none p-0 text-white-50" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar" aria-controls="mobileSidebar">
          <i class="bi bi-list fs-3"></i>
        </button>

        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center fw-bold mx-md-0 mobile-logo-center" href="/">
          <img src="/assets/img/logo/logo-pave.png" alt="Pave360" height="32" class="me-2" style="object-fit: contain;">
          <span class="text-white fs-5" style="letter-spacing: -0.5px;">API <span class="text-white-50 fw-normal">Documentation</span></span>
        </a>
        
        <!-- Right side actions -->
        <div class="d-flex align-items-center gap-2 gap-md-3">
          <!-- Search Bar -->
          <div class="input-group d-none d-lg-flex search-bar-wrapper">
            <span class="input-group-text search-addon">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" class="form-control search-input" placeholder="Search documentation..." aria-label="Search">
            <span class="input-group-text search-addon-end">
              <kbd class="search-kbd">⌘K</kbd>
            </span>
          </div>

          <!-- Settings Icon -->
          <button class="btn nav-icon-btn ms-md-2" title="Configure Credentials" data-bs-toggle="modal" data-bs-target="#credentialsModal">
            <i class="bi bi-gear-fill"></i>
          </button>

          <div class="vr mx-2 text-white-50 d-none d-md-block opacity-25"></div>

          <!-- Login Link -->
          <a href="https://app.pave360.com/auth/signin" class="nav-login-link d-none d-md-inline-block px-2">Log In</a>

          <!-- Get Started Button -->
          <a href="https://app.pave360.com/auth/signup" class="nav-get-started-btn d-none d-md-inline-flex">
            Get Started <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </nav>

    <!-- Credentials Modal -->
    <div class="modal fade" id="credentialsModal" tabindex="-1" aria-labelledby="credentialsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div class="modal-header border-bottom-0 bg-light pb-0 pt-4 px-4">
            <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="credentialsModalLabel">
              <i class="bi bi-shield-lock text-primary fs-4"></i> API Credentials
            </h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4 bg-light">
            <p class="text-secondary small mb-4">Set your environment variables here. These credentials will be injected automatically into the Sandbox code snippets below for quick testing.</p>
            <div class="mb-3">
              <label class="form-label fw-bold text-dark small text-uppercase">Active API Key</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-key"></i></span>
                <input type="password" class="form-control bg-white border-start-0 ps-0" placeholder="pk_live_...">
              </div>
              <div class="form-text text-muted" style="font-size: 0.75rem;">Never share your live keys. Keys are stored locally in your browser.</div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold text-dark small text-uppercase">Default Sender ID</label>
              <input type="text" class="form-control bg-white" placeholder="e.g. Pave360">
            </div>
          </div>
          <div class="modal-footer border-top-0 bg-light pt-0 pb-4 px-4">
            <button type="button" class="btn btn-light fw-bold text-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary fw-bold px-4 rounded-pill" data-bs-dismiss="modal">Save Variables</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar Offcanvas -->
    <div class="offcanvas offcanvas-start border-end-0 shadow" tabindex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel" style="background-color: rgba(10, 40, 40, 0.98); width: 300px;">
      <!-- Fixed Header -->
      <div class="offcanvas-header border-bottom" style="border-color: rgba(255,255,255,0.08) !important;">
        <a class="navbar-brand d-flex align-items-center fw-bold" href="/">
          <img src="/assets/img/logo/logo6a.png" alt="Pave360" height="28" class="me-2" style="object-fit: contain;">
          <span class="text-white fs-6" style="letter-spacing: -0.5px;">API <span class="text-white-50 fw-normal">Documentation</span></span>
        </a>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <!-- Scrollable Body -->
      <div class="offcanvas-body p-4 custom-scrollbar">
        <h6 class="text-uppercase text-white-50 fw-bold mb-3 small mt-2" style="letter-spacing: 0.5px;"><i class="bi bi-rocket-takeoff me-2 text-warning"></i> Getting Started</h6>
        <ul class="nav flex-column mb-4">
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'overview'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('overview')"><i class="bi bi-book me-2"></i> API Overview</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'base-url'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('base-url')"><i class="bi bi-globe me-2"></i> Base URL</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'authentication'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('authentication')"><i class="bi bi-key me-2"></i> Authentication</a></li>
        </ul>

        <h6 class="text-uppercase text-white-50 fw-bold mb-3 small" style="letter-spacing: 0.5px;"><i class="bi bi-diagram-3 me-2 text-info"></i> Endpoints</h6>
        <ul class="nav flex-column mb-4">
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'sms-send'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('sms-send')"><i class="bi bi-chat-left-text me-2"></i> Send Single SMS</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'sms-campaign'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('sms-campaign')"><i class="bi bi-chat-dots me-2"></i> Bulk SMS Campaign</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'sms-status'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('sms-status')"><i class="bi bi-bar-chart-line me-2"></i> SMS Campaign Status</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'voice-send'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('voice-send')"><i class="bi bi-mic me-2"></i> Send Voice Campaign</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'voice-status'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('voice-status')"><i class="bi bi-graph-up me-2"></i> Voice Campaign Status</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'otp-send'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('otp-send')"><i class="bi bi-shield-lock me-2"></i> Send OTP</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'otp-verify'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('otp-verify')"><i class="bi bi-check-circle me-2"></i> Verify OTP</a></li>
        </ul>

        <h6 class="text-uppercase text-white-50 fw-bold mb-3 small" style="letter-spacing: 0.5px;"><i class="bi bi-tools me-2 text-danger"></i> Playground</h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'sandbox'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('sandbox')"><i class="bi bi-terminal me-2"></i> API Sandbox</a></li>
          <li class="nav-item"><a class="nav-link offcanvas-link d-flex align-items-center" :class="{'active text-white': activeId === 'system-codes'}" href="#" data-bs-dismiss="offcanvas" @click.prevent="scrollToId('system-codes')"><i class="bi bi-code-square me-2"></i> System Codes</a></li>
        </ul>
      </div>

      <!-- Fixed Footer -->
      <div class="offcanvas-footer border-top p-4 mt-auto" style="border-color: rgba(255,255,255,0.08) !important; background-color: rgba(10, 40, 40, 0.98);">
        <div class="d-flex flex-column gap-3">
          <a href="https://app.pave360.com/auth/signin" class="btn btn-outline-light rounded-pill fw-bold py-2">Log In</a>
          <a href="https://app.pave360.com/auth/signup" class="btn rounded-pill fw-bold text-dark py-2 border-0" style="background-color: #adff1c;">Get Started <i class="bi bi-arrow-right ms-1"></i></a>
        </div>
      </div>
    </div>

    <!-- Credentials Modal -->
    <div class="modal fade" id="credentialsModal" tabindex="-1" aria-labelledby="credentialsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          <div class="modal-header border-bottom-0 bg-light pb-0 pt-4 px-4">
            <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="credentialsModalLabel">
              <i class="bi bi-shield-lock text-primary fs-4"></i> API Credentials
            </h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4 bg-light">
            <p class="text-secondary small mb-4">Set your environment variables here. These credentials will be injected automatically into the Sandbox code snippets below for quick testing.</p>
            <div class="mb-3">
              <label class="form-label fw-bold text-dark small text-uppercase">Active API Key</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-key"></i></span>
                <input type="password" class="form-control bg-white border-start-0 ps-0" placeholder="pk_live_...">
              </div>
              <div class="form-text text-muted" style="font-size: 0.75rem;">Never share your live keys. Keys are stored locally in your browser.</div>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold text-dark small text-uppercase">Default Sender ID</label>
              <input type="text" class="form-control bg-white" placeholder="e.g. Pave360">
            </div>
          </div>
          <div class="modal-footer border-top-0 bg-light pt-0 pb-4 px-4">
            <button type="button" class="btn btn-light fw-bold text-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary fw-bold px-4 rounded-pill" data-bs-dismiss="modal">Save Variables</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="container-xxl flex-grow-1 px-4">
      <div class="row">
        
        <!-- Sidebar Navigation -->
        <div class="col-md-4 col-lg-3 d-none d-md-block sidebar pb-5">
          <div class="position-sticky sidebar-wrapper" style="top: 100px; max-height: calc(100vh - 140px); overflow-y: auto;">
            
            <h6 class="text-uppercase text-muted fw-bold mb-3 small mt-2" style="letter-spacing: 0.5px;"><i class="bi bi-rocket-takeoff me-2"></i> Getting Started</h6>
            <ul class="nav flex-column mb-4">
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'overview'}" href="#" @click.prevent="scrollToId('overview')"><i class="bi bi-book me-2"></i> API Overview</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'base-url'}" href="#" @click.prevent="scrollToId('base-url')"><i class="bi bi-globe me-2"></i> Base URL</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'authentication'}" href="#" @click.prevent="scrollToId('authentication')"><i class="bi bi-key me-2"></i> Authentication</a></li>
            </ul>

            <h6 class="text-uppercase text-muted fw-bold mb-3 small" style="letter-spacing: 0.5px;"><i class="bi bi-diagram-3 me-2"></i> Endpoints</h6>
            <ul class="nav flex-column mb-4">
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'sms-send'}" href="#" @click.prevent="scrollToId('sms-send')"><i class="bi bi-chat-left-text me-2"></i> Send Single SMS</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'sms-campaign'}" href="#" @click.prevent="scrollToId('sms-campaign')"><i class="bi bi-chat-dots me-2"></i> Bulk SMS Campaign</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'sms-status'}" href="#" @click.prevent="scrollToId('sms-status')"><i class="bi bi-bar-chart-line me-2"></i> SMS Campaign Status</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'voice-send'}" href="#" @click.prevent="scrollToId('voice-send')"><i class="bi bi-mic me-2"></i> Send Voice Campaign</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'voice-status'}" href="#" @click.prevent="scrollToId('voice-status')"><i class="bi bi-graph-up me-2"></i> Voice Campaign Status</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'otp-send'}" href="#" @click.prevent="scrollToId('otp-send')"><i class="bi bi-shield-lock me-2"></i> Send OTP</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'otp-verify'}" href="#" @click.prevent="scrollToId('otp-verify')"><i class="bi bi-check-circle me-2"></i> Verify OTP</a></li>
            </ul>

            <h6 class="text-uppercase text-muted fw-bold mb-3 small" style="letter-spacing: 0.5px;"><i class="bi bi-tools me-2"></i> Playground & Diagnostics</h6>
            <ul class="nav flex-column mb-4">
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'sandbox'}" href="#" @click.prevent="scrollToId('sandbox')"><i class="bi bi-terminal me-2"></i> API Sandbox</a></li>
              <li class="nav-item"><a class="nav-link d-flex align-items-center" :class="{'active fw-bold': activeId === 'system-codes'}" href="#" @click.prevent="scrollToId('system-codes')"><i class="bi bi-code-square me-2"></i> System Codes</a></li>
            </ul>

          </div>
        </div>

        <!-- Main Content Area -->
        <main class="col-md-8 ms-sm-auto col-lg-9 px-md-4 mb-5 pb-5 mt-3">
          <AuthenticationDoc />
          <ApiEndpointsDoc />
          <ApiCodesDoc />
        </main>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="mt-auto py-4 text-center text-muted border-top bg-light" style="border-color: var(--pave-border) !important;">
      <div class="container">
        <small>&copy; 2026 Pave360. All rights reserved.</small>
      </div>
    </footer>
  </div>
</template>
