<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('ALL')

const categories = [
  { id: 'ALL', label: 'All Codes' },
  { id: 'SUCCESS', label: 'Success (SYS4)' },
  { id: 'VALIDATION', label: 'Validation (VAL2)' },
  { id: 'AUTH', label: 'Auth (API_KEY)' },
  { id: 'BILLING', label: 'Billing' },
  { id: 'RATE LIMIT', label: 'Rate Limits' },
  { id: 'DATABASE', label: 'Database (DB1)' }
]

const codes = [
  // Success Codes
  {
    status: 200,
    code: 'EXT_SYS4_001',
    category: 'SUCCESS',
    context: 'SMS',
    cause: 'Single transactional SMS queued and dispatched to telco SMSC.',
    resolution: 'None. Inspect data.campaign_id for delivery audit.'
  },
  {
    status: 200,
    code: 'EXT_SYS4_002',
    category: 'SUCCESS',
    context: 'SMS',
    cause: 'Bulk SMS broadcast campaign successfully created and scheduled.',
    resolution: 'None. Use /sms/status/:id to monitor recipient deliveries.'
  },
  {
    status: 200,
    code: 'EXT_SYS4_003',
    category: 'SUCCESS',
    context: 'SMS',
    cause: 'SMS campaign delivery statistics retrieved with breakdown of recipient states.',
    resolution: 'None. Parse delivered and failed counts.'
  },
  {
    status: 200,
    code: 'EXT_SYS4_004',
    category: 'SUCCESS',
    context: 'Voice',
    cause: 'Voice call broadcast queued on telecom SIP trunk.',
    resolution: 'None. Query /voice/status/:id for call pickup outcomes.'
  },
  {
    status: 200,
    code: 'EXT_SYS4_005',
    category: 'SUCCESS',
    context: 'Voice',
    cause: 'Voice campaign metrics and talk-time retrieved successfully.',
    resolution: 'None. Check answered and duration_seconds.'
  },
  {
    status: 200,
    code: 'EXT_SYS4_006',
    category: 'SUCCESS',
    context: 'OTP',
    cause: 'OTP token generated and handed to SMS pipeline.',
    resolution: 'Prompt subscriber to enter code received on their phone.'
  },
  {
    status: 200,
    code: 'EXT_SYS4_007',
    category: 'SUCCESS',
    context: 'OTP',
    cause: 'OTP matched and atomically verified within validity window.',
    resolution: 'Mark subscriber verified and proceed with user session.'
  },
  {
    status: 200,
    code: 'EXT_SYS4_008',
    category: 'SUCCESS',
    context: 'USSD',
    cause: 'USSD push dialog prompted onto subscriber handset.',
    resolution: 'Listen on registered webhook callback for subscriber reply.'
  },

  // Validation Codes
  {
    status: 400,
    code: 'EXT_VAL2_000',
    category: 'VALIDATION',
    context: 'General',
    cause: 'Malformed JSON syntax in request body or unparseable payload structure.',
    resolution: 'Ensure valid JSON syntax and specify Content-Type: application/json.'
  },
  {
    status: 422,
    code: 'EXT_VAL2_001',
    category: 'VALIDATION',
    context: 'SMS',
    cause: 'Both phone_numbers and list_id are missing or both are simultaneously supplied.',
    resolution: 'Provide exactly one targeting parameter (either phone_numbers OR list_id, not both).'
  },
  {
    status: 404,
    code: 'EXT_VAL2_002',
    category: 'VALIDATION',
    context: 'SMS',
    cause: 'SMS campaign ID does not exist in your organization account.',
    resolution: 'Check the integer campaign ID passed in the URL path.'
  },
  {
    status: 403,
    code: 'EXT_VAL2_003',
    category: 'VALIDATION',
    context: 'SMS',
    cause: 'Campaign resource belongs to another organization account.',
    resolution: 'Ensure API key matches owning organization account.'
  },
  {
    status: 422,
    code: 'EXT_VAL2_004',
    category: 'VALIDATION',
    context: 'Voice',
    cause: 'Invalid audio_url, missing phone numbers, or unassigned caller ID.',
    resolution: 'Verify WAV file URL accessibility (8kHz mono) and caller ID registration.'
  },
  {
    status: 404,
    code: 'EXT_VAL2_005',
    category: 'VALIDATION',
    context: 'Voice',
    cause: 'Voice campaign identifier not found in gateway database.',
    resolution: 'Check the numeric voice campaign ID in the request path.'
  },
  {
    status: 422,
    code: 'EXT_VAL2_010',
    category: 'VALIDATION',
    context: 'General',
    cause: 'Missing or invalid phone number formatting.',
    resolution: 'Format numbers in international E.164 notation (e.g. +233241234567).'
  },
  {
    status: 400,
    code: 'EXT_VAL2_011',
    category: 'VALIDATION',
    context: 'OTP',
    cause: 'Incorrect code entered, verification TTL expired (5 min), or maximum attempts exceeded.',
    resolution: 'Prompt subscriber to double-check or request a new OTP.'
  },

  // Billing
  {
    status: 402,
    code: 'OTP_VAL2_008',
    category: 'BILLING',
    context: 'General',
    cause: 'Insufficient billing credits or account prepaid balance exhausted.',
    resolution: 'Top up credit units in your Pave360 console dashboard.'
  },

  // Rate Limiting
  {
    status: 429,
    code: 'RATE_LIMIT_001',
    category: 'RATE LIMIT',
    context: 'General',
    cause: 'API throughput limit (1000 req/min) or OTP anti-pumping frequency exceeded.',
    resolution: 'Wait for Retry-After seconds before retrying outbound dispatch.'
  },

  // Auth Codes
  {
    status: 401,
    code: 'API_KEY_AUTH_001',
    category: 'AUTH',
    context: 'General',
    cause: 'No API key provided in x-api-key header.',
    resolution: 'Pass your active key in the x-api-key HTTP header.'
  },
  {
    status: 401,
    code: 'API_KEY_AUTH_002',
    category: 'AUTH',
    context: 'General',
    cause: 'Invalid or malformed API key provided.',
    resolution: 'Verify that the key is copied cleanly without leading/trailing whitespace.'
  },
  {
    status: 401,
    code: 'API_KEY_AUTH_003',
    category: 'AUTH',
    context: 'General',
    cause: 'API key has been revoked, deactivated, or rolled.',
    resolution: 'Generate a new API key from the Pave360 Developer Console.'
  },

  // Database
  {
    status: 500,
    code: 'EXT_DB1_XXX',
    category: 'DATABASE',
    context: 'General',
    cause: 'Internal database write contention, timeout, or upstream carrier connection failure.',
    resolution: 'Retry request using exponential backoff with jitter.'
  }
]

const filteredCodes = computed(() => {
  return codes.filter(item => {
    const matchesCategory = selectedCategory.value === 'ALL' || item.category === selectedCategory.value
    if (!matchesCategory) return false

    if (!searchQuery.value.trim()) return true

    const q = searchQuery.value.toLowerCase().trim()
    return (
      item.code.toLowerCase().includes(q) ||
      String(item.status).includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.context.toLowerCase().includes(q) ||
      item.cause.toLowerCase().includes(q) ||
      item.resolution.toLowerCase().includes(q)
    )
  })
})

const getStatusBadgeClass = (status) => {
  if (status === 200) return 'bg-success bg-opacity-10 text-success border border-success border-opacity-25'
  if (status >= 400 && status < 404) return 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25'
  if (status === 404 || status === 422) return 'bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25'
  if (status === 429) return 'bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25'
  return 'bg-info bg-opacity-10 text-info border border-info border-opacity-25'
}
</script>

<template>
  <div class="diagnostics-doc">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <span class="badge bg-light text-dark mb-2 border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">Error & Status Reference</span>
        <h1 class="display-5 fw-bold mb-0 text-dark">
          <i class="bi bi-code-square text-primary me-3"></i>Diagnostics & Errors
        </h1>
        <p class="text-secondary mt-2 mb-0">System codes, validation identifiers, HTTP status mappings, and step-by-step integration troubleshooting.</p>
      </div>
    </div>

    <!-- System & Custom Codes -->
    <section id="system-codes" class="doc-section pt-3">
      <h2 class="h3 mb-3 text-dark">
        <i class="bi bi-shield-check text-primary me-2"></i>System & Custom Application Codes
      </h2>
      <p class="text-secondary mb-4">
        Every response returned by Pave360 contains an explicit internal application code in the <code>code</code> property. Unlike generic HTTP statuses, these codes pinpoint the exact business logic rule, validation constraint, or security threshold triggered.
      </p>

      <!-- Categories Summary -->
      <div id="code-categories" class="row g-2 mb-5">
        <div class="col-6 col-md-4 col-lg-2">
          <div 
            class="p-3 border rounded-3 text-center transition-all bg-white"
            :class="{ 'border-dark shadow-sm': selectedCategory === 'SUCCESS' }"
            style="cursor: pointer;"
            @click="selectedCategory = selectedCategory === 'SUCCESS' ? 'ALL' : 'SUCCESS'"
          >
            <div class="fw-bold mb-1 text-dark small">SUCCESS</div>
            <div class="small text-success font-monospace">SYS4 (8)</div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <div 
            class="p-3 border rounded-3 text-center transition-all bg-white"
            :class="{ 'border-dark shadow-sm': selectedCategory === 'VALIDATION' }"
            style="cursor: pointer;"
            @click="selectedCategory = selectedCategory === 'VALIDATION' ? 'ALL' : 'VALIDATION'"
          >
            <div class="fw-bold mb-1 text-dark small">VALIDATION</div>
            <div class="small text-warning font-monospace">VAL2 (8)</div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <div 
            class="p-3 border rounded-3 text-center transition-all bg-white"
            :class="{ 'border-dark shadow-sm': selectedCategory === 'AUTH' }"
            style="cursor: pointer;"
            @click="selectedCategory = selectedCategory === 'AUTH' ? 'ALL' : 'AUTH'"
          >
            <div class="fw-bold mb-1 text-dark small">AUTH</div>
            <div class="small text-danger font-monospace">AUTH (3)</div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <div 
            class="p-3 border rounded-3 text-center transition-all bg-white"
            :class="{ 'border-dark shadow-sm': selectedCategory === 'BILLING' }"
            style="cursor: pointer;"
            @click="selectedCategory = selectedCategory === 'BILLING' ? 'ALL' : 'BILLING'"
          >
            <div class="fw-bold mb-1 text-dark small">BILLING</div>
            <div class="small text-danger font-monospace">OTP_VAL (1)</div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <div 
            class="p-3 border rounded-3 text-center transition-all bg-white"
            :class="{ 'border-dark shadow-sm': selectedCategory === 'RATE LIMIT' }"
            style="cursor: pointer;"
            @click="selectedCategory = selectedCategory === 'RATE LIMIT' ? 'ALL' : 'RATE LIMIT'"
          >
            <div class="fw-bold mb-1 text-dark small">RATE LIMIT</div>
            <div class="small text-secondary font-monospace">429 (1)</div>
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-2">
          <div 
            class="p-3 border rounded-3 text-center transition-all bg-white"
            :class="{ 'border-dark shadow-sm': selectedCategory === 'DATABASE' }"
            style="cursor: pointer;"
            @click="selectedCategory = selectedCategory === 'DATABASE' ? 'ALL' : 'DATABASE'"
          >
            <div class="fw-bold mb-1 text-dark small">DATABASE</div>
            <div class="small text-info font-monospace">DB1 (1)</div>
          </div>
        </div>
      </div>

      <!-- Codes Reference Directory -->
      <div id="codes-table" class="mb-5">
        <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3 mb-3">
          <div>
            <h4 class="h5 fw-bold mb-1 text-dark">System Codes Directory</h4>
            <p class="small text-secondary mb-0">Searchable catalogue of internal response identifiers, HTTP equivalents, and resolutions.</p>
          </div>
          <span class="badge bg-light text-secondary border font-monospace">{{ filteredCodes.length }} of {{ codes.length }} codes</span>
        </div>

        <!-- Filter Controls -->
        <div class="row g-2 mb-3">
          <div class="col-12 col-md-6">
            <div class="diagnostic-search-wrapper">
              <i class="bi bi-search"></i>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="diagnostic-search-input" 
                placeholder="Filter by code ID, status, or keyword (e.g. 401, EXT_VAL, SMS)..."
              >
            </div>
          </div>
          <div class="col-12 col-md-6 d-flex flex-wrap gap-1 align-items-center">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              class="diagnostic-category-btn"
              :class="{ active: selectedCategory === cat.id }"
              @click="selectedCategory = cat.id"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Codes Clean List -->
        <div v-if="filteredCodes.length > 0" class="border rounded-3 p-3 bg-white">
          <div class="diagnostic-list">
            <div 
              v-for="item in filteredCodes" 
              :key="item.code" 
              class="diagnostic-item"
            >
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">
                <div class="d-flex align-items-center gap-2">
                  <code class="fw-bold text-dark fs-6">{{ item.code }}</code>
                  <span :class="['badge font-monospace', getStatusBadgeClass(item.status)]">{{ item.status }}</span>
                  <span class="badge bg-light text-secondary border">{{ item.context }}</span>
                </div>
                <span class="badge bg-light text-muted border text-uppercase" style="font-size: 0.7rem;">{{ item.category }}</span>
              </div>
              <div class="small text-secondary mb-1">
                {{ item.cause }}
              </div>
              <div class="small text-muted">
                <span class="fw-semibold text-dark">Resolution:</span> {{ item.resolution }}
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5 border rounded-3 bg-white">
          <i class="bi bi-search fs-2 text-muted opacity-50 mb-2 d-block"></i>
          <p class="text-secondary small mb-2">No matching diagnostic codes found for "<strong>{{ searchQuery }}</strong>"</p>
          <button class="btn btn-sm btn-outline-secondary" @click="searchQuery = ''; selectedCategory = 'ALL'">Reset Filters</button>
        </div>
      </div>
    </section>

    <!-- Troubleshooting Guide -->
    <section id="troubleshooting-guide" class="doc-section mb-5">
      <h2 class="h3 mb-4 text-dark border-bottom pb-2"><i class="bi bi-tools me-2 text-primary"></i>Integration Troubleshooting Guide</h2>
      <p class="text-secondary mb-4">Step-by-step resolution workflows for the most frequent integration errors:</p>

      <div class="row g-4">
        <!-- Troubleshooting Card 1 -->
        <div class="col-lg-6">
          <div class="border rounded-3 p-4 h-100 bg-white border-start border-4 border-danger">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-danger">401 Unauthorized</span>
              <h6 class="fw-bold mb-0 text-dark">API_KEY_AUTH_001 / 002</h6>
            </div>
            <p class="small text-secondary mb-3">
              Triggered when the Pave360 gateway cannot identify your active tenant account.
            </p>
            <ol class="small text-secondary ps-3 mb-0">
              <li class="mb-1">Verify header name: Header must be <code>x-api-key</code> (lowercase or hyphenated, not <code>Authorization: Bearer</code>).</li>
              <li class="mb-1">Check whitespace: Ensure no leading or trailing whitespace was copied into your environment variable.</li>
              <li>Environment check: Sandbox keys are rejected on <code>https://api.pave360.com</code>. Check endpoint URL.</li>
            </ol>
          </div>
        </div>

        <!-- Troubleshooting Card 2 -->
        <div class="col-lg-6">
          <div class="border rounded-3 p-4 h-100 bg-white border-start border-4 border-warning">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-warning text-dark">422 Unprocessable Entity</span>
              <h6 class="fw-bold mb-0 text-dark">EXT_VAL2_001 Target Conflict</h6>
            </div>
            <p class="small text-secondary mb-3">
              Triggered when dispatching Bulk SMS with both or neither destination options.
            </p>
            <ol class="small text-secondary ps-3 mb-0">
              <li class="mb-1">Supply <code>phone_numbers</code> OR <code>list_id</code>, never both in the same payload.</li>
              <li class="mb-1">Do not send <code>phone_numbers: null</code> if using <code>list_id</code>; omit the key entirely.</li>
              <li>Ensure <code>phone_numbers</code> is a comma-separated string, not a JSON array.</li>
            </ol>
          </div>
        </div>

        <!-- Troubleshooting Card 3 -->
        <div class="col-lg-6">
          <div class="border rounded-3 p-4 h-100 bg-white border-start border-4 border-info">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-info text-dark">Telco Session Error</span>
              <h6 class="fw-bold mb-0 text-dark">USSD Webhook Response Timeout</h6>
            </div>
            <p class="small text-secondary mb-3">
              Subscribers see <em>"Network problem or invalid MMI code"</em> when dialing your shortcode.
            </p>
            <ol class="small text-secondary ps-3 mb-0">
              <li class="mb-1">Check server latency: Carrier gateways abort sessions if your webhook takes longer than 3-5 seconds.</li>
              <li class="mb-1">Offload slow tasks: Move database heavy queries or external API calls into background asynchronous queues.</li>
              <li>Always return <code>action: "CON"</code> or <code>action: "END"</code> with HTTP 200.</li>
            </ol>
          </div>
        </div>

        <!-- Troubleshooting Card 4 -->
        <div class="col-lg-6">
          <div class="border rounded-3 p-4 h-100 bg-white border-start border-4 border-primary">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-primary">Voice Codec Error</span>
              <h6 class="fw-bold mb-0 text-dark">EXT_VAL2_004 Audio Incompatible</h6>
            </div>
            <p class="small text-secondary mb-3">
              Voice broadcast fails or telephony SIP trunks reject the custom audio recording.
            </p>
            <div class="small text-secondary mb-2">Convert your audio file using ffmpeg to standard 8kHz mono WAV:</div>
            <pre class="m-0 p-2 bg-dark rounded text-light font-monospace small" style="font-size: 0.75rem;"><code>ffmpeg -i original.mp3 -acodec pcm_s16le -ac 1 -ar 8000 broadcast.wav</code></pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

