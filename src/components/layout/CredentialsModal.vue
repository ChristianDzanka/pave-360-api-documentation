<script setup>
import { ref } from 'vue'

/**
 * Credentials Modal
 * Allows developers to configure a test API Key and Sender ID.
 * Bootstrap's modal attributes (data-bs-dismiss="modal") handle closing automatically.
 */
const apiKey = ref('')
const senderId = ref('')

const saveCredentials = () => {
  // Store locally or pass to state as needed
  if (apiKey.value) {
    localStorage.setItem('pave360_api_key', apiKey.value)
  }
  if (senderId.value) {
    localStorage.setItem('pave360_sender_id', senderId.value)
  }
}
</script>

<template>
  <div 
    class="modal fade" 
    id="credentialsModal" 
    tabindex="-1" 
    aria-labelledby="credentialsModalLabel" 
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
        <div class="modal-header border-bottom-0 bg-light pb-0 pt-4 px-4">
          <h5 class="modal-title fw-bold text-dark d-flex align-items-center gap-2" id="credentialsModalLabel">
            <i class="bi bi-shield-lock text-primary fs-4"></i> API Credentials
          </h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4 bg-light">
          <p class="text-secondary small mb-4">
            Set your environment variables here. These credentials will be injected automatically into the Sandbox code snippets for quick testing.
          </p>
          <div class="mb-3">
            <label class="form-label fw-bold text-dark small text-uppercase">Active API Key</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-key"></i></span>
              <input 
                v-model="apiKey"
                type="password" 
                class="form-control bg-white border-start-0 ps-0" 
                placeholder="pk_live_..."
              >
            </div>
            <div class="form-text text-muted" style="font-size: 0.75rem;">
              Never share your live keys. Keys are stored locally in your browser.
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold text-dark small text-uppercase">Default Sender ID</label>
            <input 
              v-model="senderId"
              type="text" 
              class="form-control bg-white" 
              placeholder="e.g. Pave360"
            >
          </div>
        </div>
        <div class="modal-footer border-top-0 bg-light pt-0 pb-4 px-4">
          <button type="button" class="btn btn-light fw-bold text-secondary" data-bs-dismiss="modal">Cancel</button>
          <button 
            type="button" 
            class="btn btn-primary fw-bold px-4 rounded-pill" 
            data-bs-dismiss="modal"
            @click="saveCredentials"
          >
            Save Variables
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
