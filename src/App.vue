<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

// 1. Navigation Data (Categories and Sections)
import { categories, sections } from './data/navigation.js'

// 2. Layout Components
import Navbar from './components/layout/Navbar.vue'
import LeftSidebar from './components/layout/LeftSidebar.vue'
import RightSidebar from './components/layout/RightSidebar.vue'
import MobileSidebar from './components/layout/MobileSidebar.vue'
import MobileToc from './components/layout/MobileToc.vue'
import CredentialsModal from './components/layout/CredentialsModal.vue'
import Footer from './components/layout/Footer.vue'

// 3. Common UI Components
import ScrollToTop from './components/common/ScrollToTop.vue'

// --- Reactive State ---
// Tracks the currently viewed section (e.g., 'overview', 'messaging')
const activeSectionId = ref('overview')

// Tracks the current heading/anchor on the page (for "On this page" TOC)
const activeSubId = ref('overview')

// Flag to prevent scroll spy collisions during smooth scrolling
const isManualScrolling = ref(false)

// --- Computed Properties ---
// Finds the full object for the current active section
const currentSection = computed(() => {
  return sections.find(s => s.id === activeSectionId.value) || sections[0]
})

// Gets the sub-menu items (headings) for the current active section
const currentSubmenus = computed(() => {
  return currentSection.value.submenus || []
})

// --- Navigation Methods ---
// Switches the main section shown in the center container
const switchSection = (sectionId) => {
  activeSectionId.value = sectionId
  const section = sections.find(s => s.id === sectionId)
  if (section && section.submenus && section.submenus.length > 0) {
    activeSubId.value = section.submenus[0].id
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Scrolls smoothly to a specific section heading/sub-item on the page
const scrollToSubMenu = (subId) => {
  activeSubId.value = subId
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

// Navigates to a section and optionally scrolls to a specific sub-item
const navigateTo = ({ sectionId, subId }) => {
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

// --- Scroll Spy ---
// Detects which sub-item is in view as the user scrolls
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
}

// --- Lifecycle Hooks ---
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
    <!-- Top Sticky Navbar -->
    <Navbar />

    <!-- Mobile "On this page" Sub-bar (Tablets & Phones < 992px) -->
    <MobileToc 
      :submenus="currentSubmenus"
      :active-sub-id="activeSubId"
      :section-title="currentSection.title"
      @select-subitem="scrollToSubMenu"
    />

    <!-- Mobile Offcanvas Sidebar Drawer -->
    <MobileSidebar 
      :categories="categories"
      :sections="sections"
      :active-section-id="activeSectionId"
      :active-sub-id="activeSubId"
      @select-section="switchSection"
      @navigate-to="navigateTo"
    />

    <!-- Core 3-Column Layout (Desktop) -->
    <div class="three-column-layout flex-grow-1">
      <!-- 1. Left Sidebar: Categories & Sections -->
      <LeftSidebar 
        :categories="categories"
        :sections="sections"
        :active-section-id="activeSectionId"
        @select-section="switchSection"
      />

      <!-- 2. Center Content: Dynamically renders the active section component -->
      <main class="center-content-container">
        <div class="center-content-inner">
          <component :is="currentSection.component" />
        </div>
      </main>

      <!-- 3. Right Sidebar: "On this page" TOC -->
      <RightSidebar 
        :submenus="currentSubmenus"
        :active-sub-id="activeSubId"
        @select-subitem="scrollToSubMenu"
      />
    </div>

    <!-- Floating Scroll-to-Top Button -->
    <ScrollToTop />

    <!-- Dark Footer -->
    <Footer @navigate-to="navigateTo" />

    <!-- Credentials Modal -->
    <CredentialsModal />
  </div>
</template>
