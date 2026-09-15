<script setup>
import OverviewDoc from './components/OverviewDoc.vue'
import MessagingDoc from './components/MessagingDoc.vue'
import UssdDoc from './components/UssdDoc.vue'
import AuthEndpointsDoc from './components/AuthEndpointsDoc.vue'
import PlaygroundDoc from './components/PlaygroundDoc.vue'
import DiagnosticsDoc from './components/DiagnosticsDoc.vue'
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    category: 'Getting Started',
    icon: 'bi-book',
    component: OverviewDoc,
    submenus: [
      { id: 'overview', title: 'API Overview', icon: 'bi-book' },
      { id: 'base-url', title: 'Base Service Endpoint', icon: 'bi-globe' },
      { id: 'base-url-props', title: 'Base URL Properties', icon: 'bi-sliders' },
      { id: 'authentication', title: 'Authentication', icon: 'bi-key' },
      { id: 'key-properties', title: 'API Key Properties', icon: 'bi-table' },
      { id: 'response-format', title: 'Response Envelope', icon: 'bi-box' },
      { id: 'rate-limiting', title: 'Rate Limits & Retries', icon: 'bi-speedometer2' },
      { id: 'security-guidelines', title: 'Security Guidelines', icon: 'bi-shield-check' }
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging',
    category: 'Endpoints',
    icon: 'bi-chat-dots',
    component: MessagingDoc,
    submenus: [
      { id: 'sms-guidelines', title: 'SMS Guidelines', icon: 'bi-info-circle' },
      { id: 'sms-send', title: 'SMS', icon: 'bi-chat-left-text', method: 'POST' },
      { id: 'sms-campaign', title: 'Bulk SMS', icon: 'bi-chat-dots', method: 'POST' },
      { id: 'sms-status', title: 'SMS Status', icon: 'bi-bar-chart-line', method: 'GET' },
      { id: 'voice-guidelines', title: 'Voice Audio Specs', icon: 'bi-file-earmark-music' },
      { id: 'voice-send', title: 'Voice', icon: 'bi-mic', method: 'POST' },
      { id: 'voice-status', title: 'Voice Status', icon: 'bi-graph-up', method: 'GET' }
    ]
  },
  {
    id: 'ussd',
    title: 'USSD',
    category: 'Endpoints',
    icon: 'bi-phone',
    component: UssdDoc,
    submenus: [
      { id: 'ussd-overview', title: 'USSD Architecture', icon: 'bi-diagram-2' },
      { id: 'ussd-session', title: 'Session Callback', icon: 'bi-terminal', method: 'POST' },
      { id: 'ussd-push', title: 'USSD Push', icon: 'bi-send', method: 'POST' },
      { id: 'ussd-response', title: 'Response Formats', icon: 'bi-file-code' },
      { id: 'ussd-best-practices', title: 'Session Timers & Rules', icon: 'bi-stopwatch' }
    ]
  },
  {
    id: 'auth-endpoints',
    title: 'Authentication',
    category: 'Endpoints',
    icon: 'bi-shield-lock',
    component: AuthEndpointsDoc,
    submenus: [
      { id: 'otp-security', title: 'OTP Security & Fraud', icon: 'bi-shield-check' },
      { id: 'otp-send', title: 'Send OTP', icon: 'bi-shield-lock', method: 'POST' },
      { id: 'otp-verify', title: 'Verify OTP', icon: 'bi-check-circle', method: 'POST' }
    ]
  },
  {
    id: 'playground',
    title: 'Playground',
    category: 'Developer Tools',
    icon: 'bi-tools',
    component: PlaygroundDoc,
    submenus: [
      { id: 'sandbox', title: 'API Sandbox Console', icon: 'bi-terminal' },
      { id: 'sandbox-config', title: 'Console Configuration', icon: 'bi-sliders' },
      { id: 'sandbox-response', title: 'Live Output Response', icon: 'bi-display' }
    ]
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics',
    category: 'Developer Tools',
    icon: 'bi-code-square',
    component: DiagnosticsDoc,
    submenus: [
      { id: 'system-codes', title: 'System & Custom Codes', icon: 'bi-code-square' },
      { id: 'code-categories', title: 'Response Categories', icon: 'bi-grid-fill' },
      { id: 'codes-table', title: 'Code Reference Table', icon: 'bi-table' },
      { id: 'troubleshooting-guide', title: 'Troubleshooting Guide', icon: 'bi-tools' }
    ]
  }
]

const activeSectionId = ref('overview')
const activeSubId = ref('overview')
const isManualScrolling = ref(false)
const showScrollTop = ref(false)
const isMobileTocOpen = ref(false)

const currentSection = computed(() => {
  return sections.find(s => s.id === activeSectionId.value) || sections[0]
})

const currentSubmenus = computed(() => {
  return currentSection.value.submenus || []
})

const activeSubmenuItem = computed(() => {
  return currentSubmenus.value.find(item => item.id === activeSubId.value) || currentSubmenus.value[0] || null
})

const categories = ['Getting Started', 'Endpoints', 'Developer Tools']

const getSectionsByCategory = (category) => {
  return sections.filter(s => s.category === category)
}

// Accordion state: only one section's submenu is expanded at a time in the mobile drawer
const expandedSectionId = ref(activeSectionId.value)

watch(activeSectionId, (newId) => {
  expandedSectionId.value = newId
})

const isSectionExpanded = (sectionId) => {
  return expandedSectionId.value === sectionId
}

const toggleSection = (sectionId) => {
  if (expandedSectionId.value === sectionId) {
    expandedSectionId.value = null
  } else {
    expandedSectionId.value = sectionId
  }
}

const handleSectionClick = (sectionId) => {
  if (activeSectionId.value === sectionId) {
    toggleSection(sectionId)
  } else {
    switchSection(sectionId)
  }
}

const switchSection = (sectionId) => {
  activeSectionId.value = sectionId
  isMobileTocOpen.value = false
  expandedSectionId.value = sectionId
  const section = sections.find(s => s.id === sectionId)
  if (section && section.submenus && section.submenus.length > 0) {
    activeSubId.value = section.submenus[0].id
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToSubMenu = (subId) => {
  activeSubId.value = subId
  isMobileTocOpen.value = false
  isManualScrolling.value = true
  const element = document.getElementById(subId)
  if (element) {
    let navOffset = 95
    if (window.innerWidth < 768) {
      navOffset = 112
    } else if (window.innerWidth < 992) {
      navOffset = 128
    }
    const y = element.getBoundingClientRect().top + window.scrollY - navOffset
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
    setTimeout(() => {
      isManualScrolling.value = false
    }, 800)
  }
}

const navigateTo = (sectionId, subId) => {
  isMobileTocOpen.value = false
  expandedSectionId.value = sectionId
  if (activeSectionId.value !== sectionId) {
    activeSectionId.value = sectionId
    nextTick(() => {
      setTimeout(() => {
        if (subId) {
          scrollToSubMenu(subId)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    })
  } else if (subId) {
    scrollToSubMenu(subId)
  }
}

const handleScroll = () => {
  if (isManualScrolling.value) return

  const submenus = currentSubmenus.value
  if (!submenus || submenus.length === 0) return

  const scrollOffset = window.innerWidth < 768 ? 120 : (window.innerWidth < 992 ? 136 : 130)
  const scrollPosition = window.scrollY + scrollOffset
  let current = submenus[0].id

  for (const item of submenus) {
    const element = document.getElementById(item.id)
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY
      if (elementTop <= scrollPosition) {
        current = item.id
      }
    }
  }

  if (activeSubId.value !== current) {
    activeSubId.value = current
  }

  showScrollTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && isMobileTocOpen.value) {
    isMobileTocOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- Navbar (Sticky Top) -->
    <nav class="navbar navbar-expand-lg sticky-top py-3 pave-main-nav">
      <div class="pave-nav-container d-flex justify-content-between align-items-center">
        <!-- Hamburger (Mobile only) -->
        <button class="btn nav-icon-btn d-lg-none p-0 text-white-50" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar" aria-controls="mobileSidebar">
          <i class="bi bi-list fs-3"></i>
        </button>

        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center fw-bold mx-md-0 mobile-logo-center" href="/">
          <img src="/assets/img/logo/logo6a.png" alt="Pave360" height="28" class="me-2 d-md-none" style="object-fit: contain;">
          <img src="/assets/img/logo/logo-pave.png" alt="Pave360" height="32" class="me-2 d-none d-md-inline" style="object-fit: contain;">
          <span class="text-white d-md-none" style="letter-spacing: -0.5px; font-size: 1.1rem;">Pave360 <span class="text-white-50 fw-normal">Developers</span></span>
          <span class="text-white fs-5 d-none d-md-inline" style="letter-spacing: -0.5px;">Developers</span>
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

    <!-- Mobile Sticky 'On this page' Sub-bar (Mobile & Tablet: < 992px) -->
    <div v-if="currentSubmenus.length > 0" class="mobile-toc-wrapper d-lg-none">
      <div 
        class="mobile-toc-bar" 
        :class="{ 'is-open': isMobileTocOpen }"
        role="button"
        tabindex="0"
        aria-label="On this page navigation"
        :aria-expanded="isMobileTocOpen"
        @click="isMobileTocOpen = !isMobileTocOpen"
        @keydown.enter="isMobileTocOpen = !isMobileTocOpen"
        @keydown.space.prevent="isMobileTocOpen = !isMobileTocOpen"
      >
        <div class="mobile-toc-bar-content d-flex justify-content-between align-items-center w-100">
          <div class="d-flex align-items-center gap-2 overflow-hidden me-2">
            <i class="bi bi-list-nested mobile-toc-icon"></i>
            <span class="mobile-toc-prefix text-white-50">On this page:</span>
            <span class="mobile-toc-title text-white fw-semibold text-truncate">
              {{ activeSubmenuItem?.title || 'Sections' }}
            </span>
          </div>
          <div class="d-flex align-items-center gap-2 flex-shrink-0">
            <span v-if="activeSubmenuItem?.method" class="method-badge small-badge" :class="activeSubmenuItem.method.toLowerCase()">
              {{ activeSubmenuItem.method }}
            </span>
            <i class="bi mobile-toc-chevron" :class="isMobileTocOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
          </div>
        </div>
      </div>

      <!-- Collapsible Dropdown -->
      <transition name="mobile-toc-slide">
        <div v-if="isMobileTocOpen" class="mobile-toc-dropdown custom-scrollbar" role="region" aria-label="Sections list">
          <div class="mobile-toc-dropdown-header px-2 pt-2 pb-1 border-bottom" style="border-color: rgba(255, 255, 255, 0.08) !important;">
            <span class="text-uppercase fw-bold text-white-50" style="font-size: 0.64rem; letter-spacing: 0.08em;">
              {{ currentSection.title }} &mdash; Sections
            </span>
          </div>
          <ul class="nav flex-column mb-0 py-1 px-1">
            <li v-for="item in currentSubmenus" :key="item.id" class="nav-item">
              <a 
                class="mobile-toc-link d-flex align-items-center justify-content-between" 
                :class="{'active': activeSubId === item.id}" 
                href="#" 
                @click.prevent="scrollToSubMenu(item.id)"
              >
                <span class="d-flex align-items-center text-truncate me-2">
                  <i :class="['bi', item.icon, 'me-2 mobile-item-icon']"></i>
                  <span class="text-truncate">{{ item.title }}</span>
                </span>
                <span v-if="item.method" class="method-badge small-badge" :class="item.method.toLowerCase()">
                  {{ item.method }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </transition>

      <!-- Backdrop Overlay when expanded -->
      <div 
        v-if="isMobileTocOpen" 
        class="mobile-toc-backdrop" 
        @click="isMobileTocOpen = false"
      ></div>
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

    <!-- Mobile Sidebar Offcanvas -->
    <div class="offcanvas offcanvas-start border-end-0 shadow" tabindex="-1" id="mobileSidebar" aria-labelledby="mobileSidebarLabel" style="background-color: rgba(10, 40, 40, 0.98); width: 300px;">
      <div class="offcanvas-header border-bottom" style="border-color: rgba(255,255,255,0.08) !important;">
        <a class="navbar-brand d-flex align-items-center fw-bold" href="/">
          <img src="/assets/img/logo/logo6a.png" alt="Pave360" height="28" class="me-2" style="object-fit: contain;">
          <span class="text-white fs-6" style="letter-spacing: -0.5px;">API <span class="text-white-50 fw-normal">Documentation</span></span>
        </a>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body p-4 custom-scrollbar">
        <div v-for="cat in categories" :key="cat" class="mb-4">
          <h6 class="text-uppercase text-white-50 fw-bold mb-2 small" style="letter-spacing: 0.5px;">
            {{ cat }}
          </h6>
          <ul class="nav flex-column ps-1">
            <li v-for="sec in getSectionsByCategory(cat)" :key="sec.id" class="nav-item mb-1">
              <div class="d-flex align-items-center justify-content-between offcanvas-section-row" :class="{'active-row': activeSectionId === sec.id}">
                <a 
                  class="nav-link offcanvas-link d-flex align-items-center flex-grow-1 py-2 text-truncate" 
                  :class="{'active text-white': activeSectionId === sec.id}" 
                  href="#" 
                  @click.prevent="handleSectionClick(sec.id)"
                >
                  <i :class="['bi', sec.icon, 'me-2']"></i>
                  <span class="text-truncate">{{ sec.title }}</span>
                </a>
                <button 
                  v-if="sec.submenus && sec.submenus.length > 0"
                  type="button"
                  class="btn btn-sm p-1 me-1 offcanvas-toggle-btn shadow-none"
                  :aria-label="'Toggle ' + sec.title + ' submenus'"
                  @click.stop="toggleSection(sec.id)"
                >
                  <i class="bi" :class="isSectionExpanded(sec.id) ? 'bi-chevron-up' : 'bi-chevron-down'" style="font-size: 0.75rem;"></i>
                </button>
              </div>

              <!-- Nested Submenus (Drawer Accordion) -->
              <transition name="drawer-sub-slide">
                <div v-if="sec.submenus && sec.submenus.length > 0 && isSectionExpanded(sec.id)" class="offcanvas-sub-list ps-3 ms-2">
                  <ul class="nav flex-column py-1 border-start" style="border-color: rgba(255, 255, 255, 0.1) !important;">
                    <li v-for="sub in sec.submenus" :key="sub.id" class="nav-item">
                      <a 
                        class="nav-link offcanvas-sub-link d-flex align-items-center justify-content-between py-1 px-2"
                        :class="{'active': activeSectionId === sec.id && activeSubId === sub.id}"
                        href="#"
                        @click.prevent="navigateTo(sec.id, sub.id)"
                      >
                        <span class="d-flex align-items-center text-truncate me-2">
                          <span class="sub-bullet me-2">&bull;</span>
                          <span class="text-truncate">{{ sub.title }}</span>
                        </span>
                        <span v-if="sub.method" class="method-badge small-badge" :class="sub.method.toLowerCase()">
                          {{ sub.method }}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </div>

      <div class="offcanvas-footer border-top p-4 mt-auto" style="border-color: rgba(255,255,255,0.08) !important; background-color: rgba(10, 40, 40, 0.98);">
        <div class="d-flex flex-column gap-3">
          <a href="https://app.pave360.com/auth/signin" class="btn btn-outline-light rounded-pill fw-bold py-2">Log In</a>
          <a href="https://app.pave360.com/auth/signup" class="btn rounded-pill fw-bold text-dark py-2 border-0" style="background-color: #adff1c;">Get Started <i class="bi bi-arrow-right ms-1"></i></a>
        </div>
      </div>
    </div>

    <!-- Three-Column Core Layout -->
    <div class="three-column-layout flex-grow-1">
      
      <!-- FIXED MAIN LEFT SIDEBAR (Primary Navigation - Desktop Only) -->
      <aside class="fixed-left-sidebar d-none d-lg-block" aria-label="Primary Navigation">
        <div class="sidebar-wrapper">
          
          <!-- Parent Category 1: Getting Started -->
          <h6 class="text-uppercase text-muted fw-bold mb-2 small mt-1" style="letter-spacing: 0.5px;">
            Getting Started
          </h6>
          <ul class="nav flex-column mb-4">
            <li class="nav-item">
              <a 
                class="nav-link d-flex align-items-center" 
                :class="{'active fw-bold': activeSectionId === 'overview'}" 
                href="#" 
                @click.prevent="switchSection('overview')"
              >
                <i class="bi bi-book me-2"></i> Overview
              </a>
            </li>
          </ul>

          <!-- Parent Category 2: Endpoints (Messaging, USSD, Authentication) -->
          <h6 class="text-uppercase text-muted fw-bold mb-2 small" style="letter-spacing: 0.5px;">
            Endpoints
          </h6>
          <ul class="nav flex-column mb-4">
            <li class="nav-item">
              <a 
                class="nav-link d-flex align-items-center" 
                :class="{'active fw-bold': activeSectionId === 'messaging'}" 
                href="#" 
                @click.prevent="switchSection('messaging')"
              >
                <i class="bi bi-chat-dots me-2"></i> Messaging
              </a>
            </li>
            <li class="nav-item">
              <a 
                class="nav-link d-flex align-items-center" 
                :class="{'active fw-bold': activeSectionId === 'ussd'}" 
                href="#" 
                @click.prevent="switchSection('ussd')"
              >
                <i class="bi bi-phone me-2"></i> USSD
              </a>
            </li>
            <li class="nav-item">
              <a 
                class="nav-link d-flex align-items-center" 
                :class="{'active fw-bold': activeSectionId === 'auth-endpoints'}" 
                href="#" 
                @click.prevent="switchSection('auth-endpoints')"
              >
                <i class="bi bi-shield-lock me-2"></i> Authentication
              </a>
            </li>
          </ul>

          <!-- Parent Category 3: Developer Tools -->
          <h6 class="text-uppercase text-muted fw-bold mb-2 small" style="letter-spacing: 0.5px;">
            Developer Tools
          </h6>
          <ul class="nav flex-column mb-0">
            <li class="nav-item">
              <a 
                class="nav-link d-flex align-items-center" 
                :class="{'active fw-bold': activeSectionId === 'playground'}" 
                href="#" 
                @click.prevent="switchSection('playground')"
              >
                <i class="bi bi-tools me-2"></i> Playground
              </a>
            </li>
            <li class="nav-item">
              <a 
                class="nav-link d-flex align-items-center" 
                :class="{'active fw-bold': activeSectionId === 'diagnostics'}" 
                href="#" 
                @click.prevent="switchSection('diagnostics')"
              >
                <i class="bi bi-code-square me-2"></i> Diagnostics
              </a>
            </li>
          </ul>

        </div>
      </aside>

      <!-- CENTER DYNAMIC CONTENT CONTAINER (Directly in Center) -->
      <main class="center-content-container">
        <div class="center-content-inner">
          <!-- Dynamic Vue Component rendering the active left navigation item -->
          <component :is="currentSection.component" />
        </div>
      </main>

      <!-- FIXED SECONDARY RIGHT SIDEBAR (Sub-Menu Navigation - Desktop Only) -->
      <aside class="fixed-right-sidebar d-none d-lg-block" aria-label="Sub-Menu Navigation">
        <div class="sidebar-wrapper">
          <h6 class="text-uppercase text-muted fw-bold mb-3 small mt-1" style="letter-spacing: 0.5px;">
            <i class="bi bi-list-nested me-2"></i> On this page
          </h6>
          <ul class="nav flex-column mb-0">
            <li v-for="item in currentSubmenus" :key="item.id" class="nav-item">
              <a 
                class="nav-link d-flex align-items-center justify-content-between" 
                :class="{'active fw-bold': activeSubId === item.id}" 
                href="#" 
                @click.prevent="scrollToSubMenu(item.id)"
              >
                <span class="d-flex align-items-center text-truncate me-2">
                  <i :class="['bi', item.icon, 'me-2']"></i>
                  <span class="text-truncate">{{ item.title }}</span>
                </span>
                <span v-if="item.method" class="method-badge" :class="item.method.toLowerCase()">
                  {{ item.method }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

    </div>
    
    <!-- Floating Scroll-to-Top Button -->
    <button 
      type="button" 
      class="scroll-top-btn" 
      :class="{ visible: showScrollTop }" 
      @click="scrollToTop" 
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      <i class="bi bi-arrow-up fs-5"></i>
    </button>

    <!-- Dark Footer -->
    <footer class="mt-auto pave-dark-footer py-5">
      <div class="container-xxl px-4">
        <div class="row g-4 align-items-center justify-content-between mb-4">
          <div class="col-lg-5">
            <div class="d-flex align-items-center mb-3">
              <img src="/assets/img/logo/logo6a.png" alt="Pave360" height="30" class="me-2" style="object-fit: contain;">
              <span class="text-white fw-bold fs-5" style="letter-spacing: -0.5px;">Pave360 <span class="text-white-50 fw-normal">Developers</span></span>
            </div>
            <p class="text-secondary small mb-0" style="max-width: 380px; line-height: 1.6;">
              High-performance external API infrastructure for SMS dispatches, voice broadcasting, USSD integration, and one-time password verification.
            </p>
          </div>
          <div class="col-6 col-lg-3">
            <h6 class="text-uppercase small fw-bold text-white-50 mb-3" style="letter-spacing: 0.5px;">Documentation</h6>
            <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><a href="#" @click.prevent="navigateTo('overview', 'overview')"><i class="bi bi-chevron-right small text-success me-1"></i> API Overview</a></li>
              <li><a href="#" @click.prevent="navigateTo('overview', 'base-url-props')"><i class="bi bi-chevron-right small text-success me-1"></i> Base URL Properties</a></li>
              <li><a href="#" @click.prevent="navigateTo('messaging', 'sms-send')"><i class="bi bi-chevron-right small text-success me-1"></i> Messaging APIs</a></li>
              <li><a href="#" @click.prevent="navigateTo('ussd', 'ussd-overview')"><i class="bi bi-chevron-right small text-success me-1"></i> USSD Protocol</a></li>
              <li><a href="#" @click.prevent="navigateTo('auth-endpoints', 'otp-send')"><i class="bi bi-chevron-right small text-success me-1"></i> Authentication / OTP</a></li>
              <li><a href="#" @click.prevent="navigateTo('diagnostics', 'system-codes')"><i class="bi bi-chevron-right small text-success me-1"></i> System Codes</a></li>
            </ul>
          </div>
          <div class="col-6 col-lg-3">
            <h6 class="text-uppercase small fw-bold text-white-50 mb-3" style="letter-spacing: 0.5px;">Developer Portal</h6>
            <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
              <li><a href="https://app.pave360.com/auth/signin" target="_blank"><i class="bi bi-box-arrow-up-right small text-success me-1"></i> Console Sign In</a></li>
              <li><a href="https://app.pave360.com/auth/signup" target="_blank"><i class="bi bi-box-arrow-up-right small text-success me-1"></i> Create Free Account</a></li>
              <li><a href="#" data-bs-toggle="modal" data-bs-target="#credentialsModal"><i class="bi bi-gear small text-success me-1"></i> Set Test Credentials</a></li>
              <li><a href="https://pave360.com" target="_blank"><i class="bi bi-globe small text-success me-1"></i> Pave360 Main Site</a></li>
            </ul>
          </div>
        </div>
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
  </div>
</template>
