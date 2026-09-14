<script setup>
import { ref } from 'vue'

const copiedKey = ref(null)

const copyText = (text, key) => {
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    copiedKey.value = key
    setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = null
    }, 2000)
  })
}
</script>

<template>
  <div class="overview-doc">
    <!-- API Overview -->
    <section id="overview" class="doc-section pt-2">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span class="badge bg-light text-dark mb-2 border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">Platform Guide</span>
          <h1 class="display-5 fw-bold mb-0 text-dark">
            <i class="bi bi-book text-primary me-2"></i>API Overview
          </h1>
        </div>
      </div>
      <p class="lead text-secondary mb-4">
        The Pave360 External API provides reliable, high-throughput programmable telecommunications infrastructure. Through standard HTTPS REST interfaces, software engineering teams can dispatch transactional and bulk SMS, broadcast voice calls, power interactive 2-way USSD menu sessions, and verify one-time passwords (OTP) across major telecom networks.
      </p>

      <div class="row g-4 mb-5">
        <div class="col-md-4">
          <div class="glass-panel p-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-2">
              <i class="bi bi-shield-check text-success fs-3"></i>
              <h5 class="h6 fw-bold mb-0 text-dark">Enterprise Security</h5>
            </div>
            <p class="text-secondary small mb-0">Cryptographic API key authentication, TLS 1.2+ mandatory transport encryption, and anti-pumping flood controls.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="glass-panel p-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-2">
              <i class="bi bi-lightning-charge text-warning fs-3"></i>
              <h5 class="h6 fw-bold mb-0 text-dark">Sub-Second Dispatch</h5>
            </div>
            <p class="text-secondary small mb-0">Direct SMPP and SS7 telco gateway interconnects delivering SMS and OTP codes with low latency.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="glass-panel p-4 h-100">
            <div class="d-flex align-items-center gap-3 mb-2">
              <i class="bi bi-cpu text-info fs-3"></i>
              <h5 class="h6 fw-bold mb-0 text-dark">Predictable Contracts</h5>
            </div>
            <p class="text-secondary small mb-0">Consistent JSON response envelopes, standard HTTP status codes, and deterministic error identifiers.</p>
          </div>
        </div>
      </div>

      <!-- Core API Conventions -->
      <div class="glass-panel p-4 mb-5">
        <h4 class="h5 mb-3 text-dark fw-bold"><i class="bi bi-gear-wide-connected text-primary me-2"></i>API Design & Conventions</h4>
        <p class="text-secondary">The Pave360 API follows standard REST principles:</p>
        <div class="row g-3">
          <div class="col-md-6">
            <ul class="list-unstyled mb-0 text-secondary small">
              <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong class="text-dark">JSON Payloads:</strong> All POST request bodies and responses are encoded in UTF-8 JSON.</li>
              <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong class="text-dark">Standard HTTP Verbs:</strong> Uses <code>POST</code> for dispatches and state creation, <code>GET</code> for telemetry and status checks.</li>
              <li><i class="bi bi-check2-circle text-success me-2"></i><strong class="text-dark">E.164 Phone Numbers:</strong> All recipient numbers must follow international E.164 formatting (e.g. <code>+233241234567</code>).</li>
            </ul>
          </div>
          <div class="col-md-6">
            <ul class="list-unstyled mb-0 text-secondary small">
              <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong class="text-dark">Idempotency & References:</strong> Pass an optional <code>ref</code> or <code>externalref</code> to safely retry dispatches without duplicate charges.</li>
              <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i><strong class="text-dark">Deterministic Codes:</strong> Machine-readable response codes (e.g. <code>EXT_SYS4_001</code>) allow automated branching.</li>
              <li><i class="bi bi-check2-circle text-success me-2"></i><strong class="text-dark">Structured Errors:</strong> Error responses include field-level validation cues and human-readable messages.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Base URL & Environments -->
    <section id="base-url" class="doc-section pt-4 mt-2">
      <h2 class="h3 mb-3 text-dark"><i class="bi bi-globe text-primary me-2"></i>Base Service Endpoint</h2>
      <p class="text-secondary mb-4">All API requests must be issued over HTTPS targeting the appropriate environment root path. Plain HTTP requests are rejected automatically by gateway firewalls.</p>
      
      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <div class="glass-panel p-4 h-100 border-start border-4 border-success">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">Production Environment</span>
              <small class="text-muted font-monospace">Live Traffic</small>
            </div>
            <div class="endpoint-url-chip mb-2">
              <div class="d-flex align-items-center me-2 text-truncate">
                <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
                <span class="text-truncate">https://api.pave360.com/api/external</span>
              </div>
              <button 
                type="button" 
                class="copy-url-btn" 
                :class="{ copied: copiedKey === 'url-base-prod' }"
                @click.stop="copyText('https://api.pave360.com/api/external', 'url-base-prod')"
                title="Copy URL"
              >
                <i :class="copiedKey === 'url-base-prod' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span v-if="copiedKey === 'url-base-prod'" class="ms-1 small text-success fw-semibold">Copied!</span>
              </button>
            </div>
            <p class="text-secondary small mb-0">Use with your production API key (<code>pk_live_...</code>). Debits active messaging unit balances and routes directly to live mobile networks.</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="glass-panel p-4 h-100 border-start border-4 border-info">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25">Sandbox Environment</span>
              <small class="text-muted font-monospace">Testing & Staging</small>
            </div>
            <div class="endpoint-url-chip mb-2">
              <div class="d-flex align-items-center me-2 text-truncate">
                <i class="bi bi-link-45deg text-info me-1 flex-shrink-0"></i>
                <span class="text-truncate">https://sandbox.pave360.com/api/external</span>
              </div>
              <button 
                type="button" 
                class="copy-url-btn" 
                :class="{ copied: copiedKey === 'url-base-sandbox' }"
                @click.stop="copyText('https://sandbox.pave360.com/api/external', 'url-base-sandbox')"
                title="Copy URL"
              >
                <i :class="copiedKey === 'url-base-sandbox' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span v-if="copiedKey === 'url-base-sandbox'" class="ms-1 small text-success fw-semibold">Copied!</span>
              </button>
            </div>
            <p class="text-secondary small mb-0">Use with test credentials or within the interactive Playground. Simulates successful dispatches and error responses with zero billing cost.</p>
          </div>
        </div>
      </div>

      <!-- Base URL Properties -->
      <div id="base-url-props" class="mb-5 pt-3">
        <h4 class="h5 fw-bold text-dark mb-3">
          <i class="bi bi-sliders me-2 text-primary"></i>Base URL Properties
        </h4>
        <p class="text-secondary small mb-3">Core technical constraints governing network connectivity to Pave360 gateway clusters:</p>
        <div class="moolre-param-card">
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Scheme / Protocol</span>
              <span class="moolre-param-type">HTTPS (TLS 1.2+)</span>
            </div>
            <p class="moolre-param-desc">All requests require Transport Layer Security. Plain unencrypted HTTP connections are dropped by gateway firewalls.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Production Host</span>
              <span class="moolre-param-type d-inline-flex align-items-center gap-1">
                <span>api.pave360.com</span>
                <button 
                  type="button" 
                  class="copy-url-btn p-0 px-1 border-0" 
                  :class="{ copied: copiedKey === 'host-prod' }"
                  @click.stop="copyText('api.pave360.com', 'host-prod')"
                  title="Copy host"
                  style="min-height: auto; height: 20px; font-size: 0.7rem;"
                >
                  <i :class="copiedKey === 'host-prod' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                </button>
              </span>
            </div>
            <p class="moolre-param-desc">Fully-qualified live production API gateway cluster with multi-telco routing interconnects.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Sandbox Host</span>
              <span class="moolre-param-type d-inline-flex align-items-center gap-1">
                <span>sandbox.pave360.com</span>
                <button 
                  type="button" 
                  class="copy-url-btn p-0 px-1 border-0" 
                  :class="{ copied: copiedKey === 'host-sandbox' }"
                  @click.stop="copyText('sandbox.pave360.com', 'host-sandbox')"
                  title="Copy host"
                  style="min-height: auto; height: 20px; font-size: 0.7rem;"
                >
                  <i :class="copiedKey === 'host-sandbox' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                </button>
              </span>
            </div>
            <p class="moolre-param-desc">Sandbox mock server for pre-production integration testing, staging environments, and CI/CD pipelines.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Base Path</span>
              <span class="moolre-param-type d-inline-flex align-items-center gap-1">
                <span>/api/external</span>
                <button 
                  type="button" 
                  class="copy-url-btn p-0 px-1 border-0" 
                  :class="{ copied: copiedKey === 'base-path' }"
                  @click.stop="copyText('/api/external', 'base-path')"
                  title="Copy base path"
                  style="min-height: auto; height: 20px; font-size: 0.7rem;"
                >
                  <i :class="copiedKey === 'base-path' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                </button>
              </span>
            </div>
            <p class="moolre-param-desc">Mandatory path prefix prepended to all resource endpoints across SMS, Voice, USSD, and OTP APIs.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Content-Type</span>
              <span class="moolre-param-type">application/json</span>
            </div>
            <p class="moolre-param-desc">Required MIME type for all POST requests containing a body payload.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Character Encoding</span>
              <span class="moolre-param-type">UTF-8</span>
            </div>
            <p class="moolre-param-desc">Character encoding standard for message bodies, custom templates, and USSD strings.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Authentication -->
    <section id="authentication" class="doc-section pt-4 mt-2">
      <h2 class="h3 mb-3 text-dark"><i class="bi bi-key text-primary me-2"></i>Authentication</h2>
      <p class="text-secondary mb-4">
        Authenticate your API requests by supplying your secret API token in the <code class="text-dark fw-bold">x-api-key</code> HTTP request header. The Pave360 gateway authenticates every inbound request before forwarding it to the dispatch engine.
      </p>

      <div class="mb-4">
        <h5 class="api-spec-heading"><i class="bi bi-card-heading text-primary me-2"></i>Request Header Specification</h5>
        <div class="moolre-param-card">
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">x-api-key</span>
              <span class="moolre-param-type">string</span>
              <span class="moolre-param-required">required</span>
            </div>
            <p class="moolre-param-desc">Your private secret API key generated on the Pave360 Developer Console.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Content-Type</span>
              <span class="moolre-param-type">string</span>
              <span class="moolre-param-required">required (POST)</span>
            </div>
            <p class="moolre-param-desc">Must be set to <code>application/json</code> for all endpoints accepting a payload.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">Accept</span>
              <span class="moolre-param-type">string</span>
              <span class="moolre-param-optional">optional</span>
            </div>
            <p class="moolre-param-desc">Set to <code>application/json</code> to specify expected response format.</p>
          </div>
        </div>

        <div class="code-box-wrapper p-3 mb-4 shadow-sm position-relative">
          <button 
            type="button" 
            class="copy-url-btn position-absolute top-0 end-0 m-2" 
            :class="{ copied: copiedKey === 'curl-auth-example' }"
            @click.stop="copyText('curl -H &quot;x-api-key: pk_live_3892a0f82c4...&quot; -H &quot;Content-Type: application/json&quot; https://api.pave360.com/api/external/sms/send', 'curl-auth-example')"
            title="Copy snippet"
          >
            <i :class="copiedKey === 'curl-auth-example' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
            <span v-if="copiedKey === 'curl-auth-example'" class="ms-1 small text-success fw-semibold">Copied!</span>
          </button>
          <div class="font-monospace small text-white-50 pe-5">
            <span class="tok-cmt"># Example cURL authorization header</span><br />
            <span class="tok-fn">curl</span> <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: pk_live_3892a0f82c4..."</span> <span class="tok-flag">-H</span> <span class="tok-str">"Content-Type: application/json"</span> https://api.pave360.com/api/external/sms/send
          </div>
        </div>
      </div>

      <!-- API Key Properties -->
      <div id="key-properties" class="mb-5 pt-3">
        <h4 class="h5 fw-bold text-dark mb-3">
          <i class="bi bi-key me-2 text-primary"></i>API Key Properties & Lifecycle
        </h4>
        <p class="text-secondary small mb-3">Attributes and lifecycle states associated with your organization credentials:</p>
        <div class="moolre-param-card">
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">key</span>
              <span class="moolre-param-type">string</span>
            </div>
            <p class="moolre-param-desc">Cryptographically generated secret key starting with <code>pk_live_</code> or <code>pk_test_</code>.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">name</span>
              <span class="moolre-param-type">string</span>
            </div>
            <p class="moolre-param-desc">A human-readable label used to identify the token (e.g. <em>Production Core App</em>, <em>Staging Worker</em>).</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">rate_limit</span>
              <span class="moolre-param-type">integer</span>
            </div>
            <p class="moolre-param-desc">Capacity quota allocated to the key. Default: 100 requests/second (6,000/minute).</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">is_active</span>
              <span class="moolre-param-type">boolean</span>
            </div>
            <p class="moolre-param-desc">Boolean flag. Inactive or revoked keys immediately reject calls with HTTP <code>401 Unauthorized</code>.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">created_at</span>
              <span class="moolre-param-type">string (ISO 8601)</span>
            </div>
            <p class="moolre-param-desc">UTC timestamp marking token generation date.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">last_used_at</span>
              <span class="moolre-param-type">string (ISO 8601)</span>
            </div>
            <p class="moolre-param-desc">UTC timestamp marking the most recent successful API call made with this credential.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Standard Response Envelope -->
    <section id="response-format" class="doc-section pt-4 mt-2">
      <h2 class="h3 mb-3 text-dark"><i class="bi bi-box me-2 text-primary"></i>Standard Response Envelope</h2>
      <p class="text-secondary mb-4">
        Every response returned by the Pave360 API conforms to a uniform JSON envelope. Client software can reliably parse these root attributes across SMS, Voice, USSD, and OTP endpoints:
      </p>

      <div class="row g-4 mb-4">
        <div class="col-lg-6">
          <div class="glass-panel p-4 h-100">
            <h5 class="h6 fw-bold mb-3 text-dark"><i class="bi bi-check-circle text-success me-2"></i>Success Envelope Schema</h5>
            <pre class="bg-dark text-light p-3 rounded-3 mb-3 font-monospace small"><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_001"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"SMS sent successfully"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"recipient"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"campaign_id"</span>: <span class="tok-num">8429</span>,
    <span class="tok-prop">"units_charged"</span>: <span class="tok-num">1</span>,
    <span class="tok-prop">"balance_remaining"</span>: <span class="tok-num">492.5</span>
  }
}</code></pre>
            <p class="small text-secondary mb-0">Upon successful processing, <code>status</code> evaluates to <code>"success"</code>, accompanied by a descriptive <code>message</code> and a populated <code>data</code> object.</p>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="glass-panel p-4 h-100">
            <h5 class="h6 fw-bold mb-3 text-dark"><i class="bi bi-exclamation-triangle text-danger me-2"></i>Error Envelope Schema</h5>
            <pre class="bg-dark text-light p-3 rounded-3 mb-3 font-monospace small"><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"error"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_VAL_002"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"Invalid phone number format"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"field"</span>: <span class="tok-str">"phone_number"</span>,
    <span class="tok-prop">"expected"</span>: <span class="tok-str">"E.164 (e.g. +233241234567)"</span>
  }
}</code></pre>
            <p class="small text-secondary mb-0">On failure, <code>status</code> evaluates to <code>"error"</code>. The <code>code</code> provides a persistent error token (e.g., <code>EXT_VAL_002</code>), and <code>data</code> pinpoints the faulty parameter.</p>
          </div>
        </div>
      </div>

      <div class="mb-5">
        <h5 class="api-spec-heading">Envelope Field Definitions</h5>
        <div class="moolre-param-card">
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">status</span>
              <span class="moolre-param-type">string</span>
              <span class="moolre-param-required">always present</span>
            </div>
            <p class="moolre-param-desc">High-level outcome indicator. Always evaluates to <code>"success"</code> or <code>"error"</code>.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">code</span>
              <span class="moolre-param-type">string</span>
              <span class="moolre-param-required">always present</span>
            </div>
            <p class="moolre-param-desc">Unique system tracking code (e.g. <code>EXT_SYS4_001</code>, <code>EXT_VAL2_001</code>). Used for automated program-level exception handling.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">message</span>
              <span class="moolre-param-type">string</span>
              <span class="moolre-param-required">always present</span>
            </div>
            <p class="moolre-param-desc">A clear, human-readable explanation of the action outcome or failure reason.</p>
          </div>
          <div class="moolre-param-row">
            <div class="moolre-param-header">
              <span class="moolre-param-name">data</span>
              <span class="moolre-param-type">object | null</span>
              <span class="moolre-param-optional">nullable</span>
            </div>
            <p class="moolre-param-desc">Payload response entity containing delivery metrics, identifiers, or diagnostic validation details. Set to <code>null</code> or a specific diagnostic object on failure.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rate Limits & Retries -->
    <section id="rate-limiting" class="doc-section pt-4 mt-2">
      <h2 class="h3 mb-3 text-dark"><i class="bi bi-speedometer2 text-primary me-2"></i>Rate Limits & Safe Retries</h2>
      <p class="text-secondary mb-4">
        To maintain network stability and protect downstream telco SS7/SMPP trunks from packet flooding, Pave360 enforces token-bucket rate limits per API key.
      </p>

      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <div class="glass-panel p-4 h-100">
            <h5 class="h6 fw-bold mb-3 text-dark"><i class="bi bi-clock-history text-primary me-2"></i>Rate Limit Headers</h5>
            <p class="text-secondary small mb-3">Every response includes telemetry headers tracking your remaining quota:</p>
            <ul class="list-group list-group-flush mb-0 small">
              <li class="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between align-items-center">
                <code class="text-primary fw-bold">X-RateLimit-Limit</code>
                <span class="text-secondary">Maximum requests allowed per window (e.g. 100/s)</span>
              </li>
              <li class="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between align-items-center">
                <code class="text-primary fw-bold">X-RateLimit-Remaining</code>
                <span class="text-secondary">Requests left in the current window</span>
              </li>
              <li class="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between align-items-center">
                <code class="text-primary fw-bold">X-RateLimit-Reset</code>
                <span class="text-secondary">Unix epoch timestamp when current window refreshes</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-6">
          <div class="glass-panel p-4 h-100">
            <h5 class="h6 fw-bold mb-3 text-dark"><i class="bi bi-arrow-repeat text-primary me-2"></i>Handling 429 & Retries</h5>
            <p class="text-secondary small mb-2">When rate limits are exceeded, Pave360 returns HTTP <code>429 Too Many Requests</code> with code <code>EXT_RATE_005</code>:</p>
            <pre class="bg-dark text-light p-2 rounded small mb-2 font-monospace"><code>HTTP/1.1 429 Too Many Requests
Retry-After: 2</code></pre>
            <p class="text-secondary small mb-0"><strong class="text-dark">Exponential Backoff:</strong> Implement truncated exponential backoff with jitter on 429 and 5xx responses. Never immediately retry in a tight loop.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Guidelines & Best Practices -->
    <section id="security-guidelines" class="doc-section pt-4 mb-5">
      <h2 class="h3 mb-3 text-dark"><i class="bi bi-shield-check text-primary me-2"></i>Security Guidelines & Best Practices</h2>
      <div class="row g-4">
        <div class="col-md-6">
          <div class="glass-panel p-4 h-100 border-start border-4 border-warning">
            <h4 class="h5 mb-3 d-flex align-items-center gap-2 text-dark">
              <i class="bi bi-shield-lock text-warning"></i>
              Credential Protection
            </h4>
            <ul class="text-secondary small ps-3 mb-0">
              <li class="mb-2"><strong class="text-dark">Server-Side Only:</strong> Never embed secret API keys in frontend SPAs, mobile apps, or public Git repositories. All dispatches must originate from your secure backend.</li>
              <li class="mb-2"><strong class="text-dark">Key Masking:</strong> When rendering administrative dashboards, display only the first 8 characters and last 4 characters of your API key.</li>
              <li class="mb-2"><strong class="text-dark">Key Rotation:</strong> Periodically rotate keys or immediately revoke credentials if exposure is suspected via the Pave360 dashboard.</li>
              <li><strong class="text-dark">HTTPS Everywhere:</strong> Ensure all webhook receiver endpoints exposed to Pave360 use valid SSL/TLS certificates.</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="glass-panel p-4 h-100 border-start border-4 border-info">
            <h4 class="h5 mb-3 d-flex align-items-center gap-2 text-dark">
              <i class="bi bi-shield-shaded text-info"></i>
              Fraud & Anti-Pumping
            </h4>
            <ul class="text-secondary small ps-3 mb-0">
              <li class="mb-2"><strong class="text-dark">SMS Pumping Protection:</strong> Always enforce reCAPTCHA or turnstile challenges on public registration forms prior to calling <code>/otp/send</code>.</li>
              <li class="mb-2"><strong class="text-dark">Per-Number Throttle:</strong> Restrict OTP requests to a maximum of 3 attempts per phone number per 10 minutes.</li>
              <li class="mb-2"><strong class="text-dark">Idempotent Keys:</strong> Provide a unique client reference (<code>ref</code>) on billing transactions to eliminate risk of double-charging on network dropouts.</li>
              <li><strong class="text-dark">Strict Validation:</strong> Sanitize telephone inputs to conform to E.164 before transmitting payloads to Pave360.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
