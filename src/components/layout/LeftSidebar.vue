<script setup>
/**
 * Desktop Left Sidebar Navigation
 * Dynamically groups sections by their category using a clean v-for loop.
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
  }
})

const emit = defineEmits(['select-section'])

const getSectionsByCategory = (category) => {
  return props.sections.filter(sec => sec.category === category)
}
</script>

<template>
  <aside class="fixed-left-sidebar d-none d-lg-block" aria-label="Primary Navigation">
    <div class="sidebar-wrapper">
      <div 
        v-for="(cat, idx) in categories" 
        :key="cat" 
        :class="idx < categories.length - 1 ? 'mb-4' : 'mb-0'"
      >
        <h6 
          class="text-uppercase text-muted fw-bold mb-2 small" 
          :class="{ 'mt-1': idx === 0 }" 
          style="letter-spacing: 0.5px;"
        >
          {{ cat }}
        </h6>
        <ul class="nav flex-column mb-0">
          <li v-for="sec in getSectionsByCategory(cat)" :key="sec.id" class="nav-item">
            <a 
              class="nav-link d-flex align-items-center" 
              :class="{ 'active fw-bold': activeSectionId === sec.id }" 
              href="#" 
              @click.prevent="emit('select-section', sec.id)"
            >
              <i :class="['bi', sec.icon, 'me-2']"></i> {{ sec.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
