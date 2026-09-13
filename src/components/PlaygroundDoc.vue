<script setup>
import { ref, watch } from 'vue'

const selectedEndpoint = ref('POST /sms/send')
const apiKey = ref('pk_test_sample_key_9921')
const requestBody = ref(`{\n  "phone_number": "+233241234567",\n  "message": "Hello from Pave360 Sandbox!",\n  "sender_id": "Pave360"\n}`)
const isTesting = ref(false)
const testOutput = ref(null)

const payloads = {
  'POST /sms/send': `{\n  "phone_number": "+233241234567",\n  "message": "Hello from Pave360 Sandbox!",\n  "sender_id": "Pave360"\n}`,
  'POST /sms/campaign': `{\n  "name": "Summer Blast",\n  "message": "Special 50% discount this weekend!",\n  "phone_numbers": "+233241234567,+233247654321"\n}`,
  'GET /sms/status/:id': `{}`,
  'POST /voice/send': `{\n  "name": "Meeting Reminder",\n  "caller_id": "+233240000000",\n  "audio_url": "https://example.com/audio.wav",\n  "phone_numbers": "+233241234567"\n}`,
  'POST /ussd/send': `{\n  "phone_number": "+233241234567",\n  "message": "Authorize transaction of GHS 50.00? 1. Yes 2. No"\n}`,
  'POST /otp/send': `{\n  "phone_number": "+233241234567",\n  "length": 6,\n  "type": "NUMERIC"\n}`
}

watch(selectedEndpoint, (newVal) => {
  if (payloads[newVal]) {
    requestBody.value = payloads[newVal]
  }
})

const runTestCall = () => {
  isTesting.value = true
  setTimeout(() => {
    isTesting.value = false
    testOutput.value = {
      timestamp: new Date().toISOString(),
      status: 200,
      code: 'EXT_SYS4_001',
      endpoint: selectedEndpoint.value,
      response: {
        status: 'success',
        code: 'EXT_SYS4_001',
        message: 'Sandbox simulation executed successfully. No balance charged.',
        data: {
          simulated: true,
          latency_ms: 48,
          timestamp: new Date().toISOString()
        }
      }
    }
  }, 400)
}
</script>

<template>
  <div class="playground-doc">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <span class="badge bg-light text-dark mb-2 border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">Interactive Testing</span>
        <h1 class="display-5 fw-bold mb-0 text-dark">
          <i class="bi bi-terminal text-primary me-3"></i>API Playground
        </h1>
        <p class="text-secondary mt-2 mb-0">Execute live simulation requests directly in your browser without consuming actual credits.</p>
      </div>
    </div>

    <!-- API Sandbox Console -->
    <section id="sandbox" class="doc-section pt-3">
      <h2 class="h3 mb-3 text-dark">
        <i class="bi bi-cpu text-primary me-2"></i>API Sandbox Console
      </h2>
      <p class="text-secondary mb-4">
        Execute request calls against the simulated sandbox engine. Test validation rules, success flows, and error headers immediately without billing hits.
      </p>
      
      <div class="border rounded-3 p-4 mb-5 bg-white">
        <div class="row g-4">
          <!-- Console Configuration -->
          <div id="sandbox-config" class="col-md-6 pe-md-4 border-bottom pb-4 pb-md-0 border-bottom-md-0" style="border-color: rgba(10, 40, 40, 0.08) !important;">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark d-flex align-items-center justify-content-between">
              <span><i class="bi bi-sliders me-1 text-success"></i> Console Config</span>
              <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 fw-normal">Simulated Mode</span>
            </h6>
            <div class="mb-3">
              <label class="form-label small text-secondary fw-semibold">Endpoint Method</label>
              <select v-model="selectedEndpoint" class="form-select form-select-sm bg-light">
                <option value="POST /sms/send">POST /sms/send</option>
                <option value="POST /sms/campaign">POST /sms/campaign</option>
                <option value="GET /sms/status/:id">GET /sms/status/:id</option>
                <option value="POST /voice/send">POST /voice/send</option>
                <option value="POST /ussd/send">POST /ussd/send</option>
                <option value="POST /otp/send">POST /otp/send</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary fw-semibold">x-api-key Authentication <span class="text-danger">*</span></label>
              <input v-model="apiKey" type="text" class="form-control form-control-sm bg-light font-monospace" placeholder="Enter test API key...">
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary fw-semibold">JSON Request Body Payload</label>
              <textarea v-model="requestBody" class="form-control form-control-sm bg-light font-monospace" rows="6" placeholder="{}"></textarea>
            </div>
            <button 
              type="button" 
              class="btn btn-primary btn-sm w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
              :disabled="isTesting"
              @click="runTestCall"
            >
              <span v-if="isTesting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span v-if="!isTesting">Test Endpoint Call <i class="bi bi-play-fill"></i></span>
              <span v-else>Simulating Request...</span>
            </button>
          </div>

          <!-- Live Output Response -->
          <div id="sandbox-response" class="col-md-6 bg-light rounded-4 p-3 d-flex flex-column border">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="text-uppercase small fw-bold mb-0 text-muted">
                <i class="bi bi-display me-1 text-primary"></i> Live Output Response
              </h6>
              <span v-if="testOutput" class="status-pill status-200">200 OK</span>
            </div>
            <div v-if="!testOutput" class="flex-grow-1 d-flex flex-column align-items-center justify-content-center border rounded-3 border-light bg-white text-center p-4">
              <i class="bi bi-terminal fs-1 text-muted opacity-50 mb-2"></i>
              <span class="text-muted small">No response logged yet.<br>Click <strong>"Test Endpoint Call"</strong> to dispatch a live simulation.</span>
            </div>
            <div v-else class="flex-grow-1 code-box-wrapper shadow-none rounded-3 overflow-auto">
              <pre class="m-0 p-3" style="font-size: 0.78rem;"><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_001"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"Sandbox simulation executed successfully. No balance charged."</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"simulated"</span>: <span class="tok-bool">true</span>,
    <span class="tok-prop">"latency_ms"</span>: <span class="tok-num">48</span>,
    <span class="tok-prop">"timestamp"</span>: <span class="tok-str">"{{ testOutput.timestamp }}"</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
