<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Self-contained Floating Scroll-to-Top Button
 * Appears after the user scrolls down past 400px.
 */
const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <button 
    type="button" 
    class="scroll-top-btn" 
    :class="{ visible: isVisible }" 
    @click="scrollToTop" 
    title="Scroll to top"
    aria-label="Scroll to top"
  >
    <i class="bi bi-arrow-up fs-5"></i>
  </button>
</template>
