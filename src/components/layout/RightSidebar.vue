<script setup>
/**
 * Desktop Right Sidebar: "On this page" table of contents
 * Highlights the current active sub-section as the user scrolls.
 */
defineProps({
  submenus: {
    type: Array,
    default: () => []
  },
  activeSubId: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['select-subitem'])
</script>

<template>
  <aside class="fixed-right-sidebar d-none d-lg-block" aria-label="Sub-Menu Navigation">
    <div class="sidebar-wrapper">
      <h6 class="text-uppercase text-muted fw-bold mb-3 small mt-1" style="letter-spacing: 0.5px;">
        <i class="bi bi-list-nested me-2"></i> On this page
      </h6>
      <ul class="nav flex-column mb-0">
        <li v-for="item in submenus" :key="item.id" class="nav-item">
          <a 
            class="nav-link d-flex align-items-center justify-content-between" 
            :class="{ 'active fw-bold': activeSubId === item.id }" 
            href="#" 
            @click.prevent="emit('select-subitem', item.id)"
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
</template>
