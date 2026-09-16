<script setup>
import { ref, computed } from 'vue'

/**
 * Mobile Sticky Sub-bar: "On this page"
 * Appears below the main navbar on mobile/tablet viewports (< 992px).
 * Toggles a dropdown showing current section anchors.
 */
const props = defineProps({
  submenus: {
    type: Array,
    default: () => []
  },
  activeSubId: {
    type: String,
    default: ''
  },
  sectionTitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select-subitem'])

const isOpen = ref(false)

const activeSubmenuItem = computed(() => {
  return props.submenus.find(item => item.id === props.activeSubId) || props.submenus[0] || null
})

const handleItemClick = (id) => {
  isOpen.value = false
  emit('select-subitem', id)
}
</script>

<template>
  <div v-if="submenus.length > 0" class="mobile-toc-wrapper d-lg-none">
    <!-- Bar Trigger -->
    <div 
      class="mobile-toc-bar" 
      :class="{ 'is-open': isOpen }"
      role="button"
      tabindex="0"
      aria-label="On this page navigation"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
      @keydown.enter="isOpen = !isOpen"
      @keydown.space.prevent="isOpen = !isOpen"
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
          <i class="bi mobile-toc-chevron" :class="isOpen ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
        </div>
      </div>
    </div>

    <!-- Collapsible Dropdown -->
    <transition name="mobile-toc-slide">
      <div v-if="isOpen" class="mobile-toc-dropdown custom-scrollbar" role="region" aria-label="Sections list">
        <div class="mobile-toc-dropdown-header px-2 pt-2 pb-1 border-bottom" style="border-color: rgba(255, 255, 255, 0.08) !important;">
          <span class="text-uppercase fw-bold text-white-50" style="font-size: 0.64rem; letter-spacing: 0.08em;">
            {{ sectionTitle }} &mdash; Sections
          </span>
        </div>
        <ul class="nav flex-column mb-0 py-1 px-1">
          <li v-for="item in submenus" :key="item.id" class="nav-item">
            <a 
              class="mobile-toc-link d-flex align-items-center justify-content-between" 
              :class="{ 'active': activeSubId === item.id }" 
              href="#" 
              @click.prevent="handleItemClick(item.id)"
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

    <!-- Backdrop Overlay -->
    <div 
      v-if="isOpen" 
      class="mobile-toc-backdrop" 
      @click="isOpen = false"
    ></div>
  </div>
</template>
