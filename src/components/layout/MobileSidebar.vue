<script setup>
import { ref, watch } from 'vue'

/**
 * Mobile Navigation Drawer (Offcanvas)
 * Slides in from the left when the hamburger button in Navbar is clicked.
 */
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  sections: {
    type: Array,
    required: true
  },
  activeSectionId: {
    type: String,
    required: true
  },
  activeSubId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select-section', 'navigate-to'])

// Track which section accordion is currently open in the mobile drawer
const expandedSectionId = ref(props.activeSectionId)

watch(() => props.activeSectionId, (newId) => {
  expandedSectionId.value = newId
})

const getSectionsByCategory = (category) => {
  return props.sections.filter(sec => sec.category === category)
}

const toggleSection = (sectionId) => {
  expandedSectionId.value = expandedSectionId.value === sectionId ? null : sectionId
}

const closeOffcanvas = () => {
  const el = document.getElementById('mobileSidebar')
  if (el && window.bootstrap?.Offcanvas) {
    const instance = window.bootstrap.Offcanvas.getInstance(el)
    if (instance) instance.hide()
  }
}

const handleSectionClick = (sectionId) => {
  if (props.activeSectionId === sectionId) {
    toggleSection(sectionId)
  } else {
    emit('select-section', sectionId)
    closeOffcanvas()
  }
}

const handleSubItemClick = (sectionId, subId) => {
  emit('navigate-to', { sectionId, subId })
  closeOffcanvas()
}
</script>

<template>
  <div 
    class="offcanvas offcanvas-start border-end-0 shadow" 
    tabindex="-1" 
    id="mobileSidebar" 
    aria-labelledby="mobileSidebarLabel" 
    style="background-color: rgba(10, 40, 40, 0.98); width: 300px;"
  >
    <!-- Header -->
    <div class="offcanvas-header border-bottom" style="border-color: rgba(255,255,255,0.08) !important;">
      <a class="navbar-brand d-flex align-items-center fw-bold" href="/">
        <img src="/assets/img/logo/logo6a.png" alt="Pave360" height="28" class="me-2" style="object-fit: contain;">
        <span class="text-white fs-6" style="letter-spacing: -0.5px;">API <span class="text-white-50 fw-normal">Documentation</span></span>
      </a>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <!-- Body: Categories & Sections -->
    <div class="offcanvas-body p-4 custom-scrollbar">
      <div v-for="cat in categories" :key="cat" class="mb-4">
        <h6 class="text-uppercase text-white-50 fw-bold mb-2 small" style="letter-spacing: 0.5px;">
          {{ cat }}
        </h6>
        <ul class="nav flex-column ps-1">
          <li v-for="sec in getSectionsByCategory(cat)" :key="sec.id" class="nav-item mb-1">
            <div 
              class="d-flex align-items-center justify-content-between offcanvas-section-row" 
              :class="{ 'active-row': activeSectionId === sec.id }"
            >
              <a 
                class="nav-link offcanvas-link d-flex align-items-center flex-grow-1 py-2 text-truncate" 
                :class="{ 'active text-white': activeSectionId === sec.id }" 
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
                <i class="bi" :class="expandedSectionId === sec.id ? 'bi-chevron-up' : 'bi-chevron-down'" style="font-size: 0.75rem;"></i>
              </button>
            </div>

            <!-- Nested Submenus (Drawer Accordion) -->
            <transition name="drawer-sub-slide">
              <div 
                v-if="sec.submenus && sec.submenus.length > 0 && expandedSectionId === sec.id" 
                class="offcanvas-sub-list ps-3 ms-2"
              >
                <ul class="nav flex-column py-1 border-start" style="border-color: rgba(255, 255, 255, 0.1) !important;">
                  <li v-for="sub in sec.submenus" :key="sub.id" class="nav-item">
                    <a 
                      class="nav-link offcanvas-sub-link d-flex align-items-center justify-content-between py-1 px-2"
                      :class="{ 'active': activeSectionId === sec.id && activeSubId === sub.id }"
                      href="#"
                      @click.prevent="handleSubItemClick(sec.id, sub.id)"
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

    <!-- Footer with Auth buttons -->
    <div class="offcanvas-footer border-top p-4 mt-auto" style="border-color: rgba(255,255,255,0.08) !important; background-color: rgba(10, 40, 40, 0.98);">
      <div class="d-flex flex-column gap-3">
        <a href="https://app.pave360.com/auth/signin" class="btn btn-outline-light rounded-pill fw-bold py-2">Log In</a>
        <a href="https://app.pave360.com/auth/signup" class="btn rounded-pill fw-bold text-dark py-2 border-0" style="background-color: #adff1c;">
          Get Started <i class="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
    </div>
  </div>
</template>
