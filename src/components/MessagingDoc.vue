<script setup>
import { ref } from 'vue'

const copiedKey = ref(null)

const copyActiveTabCode = (wrapperId, key) => {
  const wrapper = document.getElementById(wrapperId)
  if (!wrapper) return
  const activePre = wrapper.querySelector('.tab-pane.active pre') || wrapper.querySelector('pre')
  if (!activePre) return
  const text = activePre.innerText
  navigator.clipboard.writeText(text).then(() => {
    copiedKey.value = key
    setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = null
    }, 2000)
  })
}

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
  <div class="messaging-doc">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <span class="badge bg-light text-dark mb-2 border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">API Reference</span>
        <h1 class="display-5 fw-bold mb-0 text-dark"><i class="bi bi-chat-dots text-primary me-3"></i>Messaging</h1>
        <p class="text-secondary mt-2 mb-0">High-throughput SMS delivery and voice broadcast campaign infrastructure across Ghanaian and African telecom networks.</p>
      </div>
    </div>

    <!-- SMS Section Header -->
    <h2 class="h3 mb-4 mt-4 text-dark border-bottom pb-2"><i class="bi bi-chat-text text-primary me-2"></i>SMS Messaging</h2>

    <!-- SMS Telecom Guidelines Card -->
    <div id="sms-guidelines" class="glass-panel p-4 mb-5 border-start border-4 border-primary">
      <h3 class="h5 fw-bold text-dark mb-3"><i class="bi bi-info-circle text-primary me-2"></i>SMS Telecom Guidelines & Encoding</h3>
      <p class="text-secondary small mb-3">
        Before dispatching SMS traffic through Pave360, review the telecommunication rules for character encoding, concatenated messages, and Sender ID compliance:
      </p>
      
      <div class="row g-4 mb-3">
        <div class="col-md-6">
          <div class="p-3 bg-light rounded-3 border h-100">
            <h6 class="fw-bold text-dark mb-2"><i class="bi bi-fonts text-primary me-1"></i> GSM 03.38 vs Unicode Encoding</h6>
            <ul class="list-unstyled small text-secondary mb-0">
              <li class="mb-2"><strong>Standard GSM 7-bit:</strong> Up to <strong>160 characters</strong> in a single SMS. Multi-part messages allow <strong>153 characters</strong> per segment (7 characters reserved for telecom User Data Headers (UDH)).</li>
              <li><strong>Unicode (UCS-2):</strong> Required for emojis, accents, non-Latin alphabets. Single SMS limit is <strong>70 characters</strong>. Multi-part messages allow <strong>67 characters</strong> per segment.</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 bg-light rounded-3 border h-100">
            <h6 class="fw-bold text-dark mb-2"><i class="bi bi-person-badge text-success me-1"></i> Sender ID Registration</h6>
            <ul class="list-unstyled small text-secondary mb-0">
              <li class="mb-2"><strong>Length & Character Set:</strong> 3 to 11 alphanumeric characters (<code>A-Z</code>, <code>a-z</code>, <code>0-9</code>). No spaces, underscores, hyphens, or special punctuation allowed.</li>
              <li><strong>Whitelisting:</strong> Must not impersonate telecom networks (MTN, Telecel, AT), government bodies, or financial institutions without verification. Default fallback is <code>Pave360</code>.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary py-2 px-3 mb-0 small text-secondary border-0 bg-secondary bg-opacity-10 rounded-2">
        <i class="bi bi-telephone-outbound me-1 text-dark"></i>
        <strong>Recipient Format:</strong> Phone numbers must follow the international <strong>E.164</strong> standard (e.g. <code>+233241234567</code> or <code>233241234567</code>). Domestic 10-digit Ghanaian numbers (e.g. <code>0241234567</code>) are automatically parsed and normalized.
      </div>
    </div>

    <!-- Send Single Transactional SMS -->
    <section id="sms-send" class="endpoint-section">
      <div class="row gx-lg-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="method-badge post">POST</span>
            <h3 class="h4 mb-0 text-dark fw-bold">/sms/send</h3>
          </div>
          <div class="endpoint-url-chip mb-3">
            <div class="d-flex align-items-center me-2 text-truncate">
              <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
              <span class="text-truncate">https://api.pave360.com/api/external/sms/send</span>
            </div>
            <button 
              type="button" 
              class="copy-url-btn" 
              :class="{ copied: copiedKey === 'url-sms-send' }"
              @click.stop="copyText('https://api.pave360.com/api/external/sms/send', 'url-sms-send')"
              title="Copy endpoint URL"
            >
              <i :class="copiedKey === 'url-sms-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
              <span v-if="copiedKey === 'url-sms-send'" class="ms-1 small text-success fw-semibold">Copied!</span>
            </button>
          </div>
          <p class="text-secondary lead fs-6">
            Send Single Transactional SMS. Dispatches an immediate, priority SMS to a single recipient mobile number. Automatically creates an audit trail and logs delivery status in real-time.
          </p>

          <!-- Request Headers -->
          <h5 class="api-spec-heading">Request Headers</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">Content-Type</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Must be <code>application/json</code></p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">x-api-key</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Your active organization API key.</p>
            </div>
          </div>

          <!-- Body Params -->
          <h5 class="api-spec-heading">Body Params</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">phone_number</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">E.164 phone format (e.g. <code>+233241234567</code>). Must be a valid mobile line.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">message</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">SMS message text. Up to 1600 characters (auto-split into multi-part segments).</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">sender_id</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-optional">optional</span>
              </div>
              <p class="moolre-param-desc">3-11 alphanumeric characters. Must be whitelisted. Defaults to account default.</p>
            </div>
          </div>

          <!-- Responses -->
          <h5 class="api-spec-heading">Responses</h5>
          <div class="moolre-response-card">
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot success"></span>
                  <span class="moolre-response-code">200</span>
                  <span class="moolre-response-status">Success</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">recipient</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Normalized recipient phone number in E.164 format.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">campaign_id</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Unique ID reference assigned to this transactional message dispatch.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">units_charged</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Total billing units deducted (calculated based on message segment count).</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">balance_remaining</span>
                      <span class="moolre-prop-type">number</span>
                    </div>
                    <p class="moolre-prop-desc">Updated available credit units in your account balance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">401</span>
                  <span class="moolre-response-status">Authentication Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>API_KEY_AUTH_001</code>: Missing or invalid <code>x-api-key</code> in header.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">402</span>
                  <span class="moolre-response-status">Payment Required</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>OTP_VAL2_008</code>: Insufficient balance credits. Top up your account.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">422</span>
                  <span class="moolre-response-status">Validation Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>EXT_VAL2_010</code>: Invalid phone number format or unreachable mobile network.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot warning"></span>
                  <span class="moolre-response-code">429</span>
                  <span class="moolre-response-status">Rate Limit Exceeded</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>RATE_LIMIT_001</code>: Rate limit exceeded. Pause dispatches and retry with backoff.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-xl-6">
          <div class="endpoint-sandbox-sticky">
            <!-- Request Command Box -->
            <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-terminal me-1"></i> Request</span>
            </div>
            <div id="code-box-req-sms-send" class="code-box-wrapper shadow-sm">
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'req-sms-send' }"
                @click="copyActiveTabCode('code-box-req-sms-send', 'req-sms-send')"
                title="Copy request code"
              >
                <i :class="copiedKey === 'req-sms-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'req-sms-send' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-sms-send" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-sms-send" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-sms-send" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-sms-send" role="tabpanel">
                  <pre><code><span class="tok-cmt">// Send Single Transactional SMS</span>
<span class="tok-kwd">const</span> <span class="tok-fn">triggerAction</span> = <span class="tok-kwd">async</span> (apiKey, payload) => {
  <span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">'https://api.pave360.com/api/external/sms/send'</span>, {
    method: <span class="tok-str">'POST'</span>,
    headers: {
      <span class="tok-str">'Content-Type'</span>: <span class="tok-str">'application/json'</span>,
      <span class="tok-str">'x-api-key'</span>: apiKey
    },
    body: JSON.<span class="tok-fn">stringify</span>(payload)
  });
  <span class="tok-kwd">return await</span> response.<span class="tok-fn">json</span>();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-sms-send" role="tabpanel">
                  <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">POST</span> <span class="tok-str">https://api.pave360.com/api/external/sms/send</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"Content-Type: application/json"</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span> \
  <span class="tok-flag">-d</span> <span class="tok-str">'{
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Your verification code is 849201. Do not share this with anyone."</span>,
    <span class="tok-prop">"sender_id"</span>: <span class="tok-str">"Pave360"</span>
  }'</span></code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-sms-send" role="tabpanel">
                  <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/sms/send"</span>
headers = {
    <span class="tok-prop">"Content-Type"</span>: <span class="tok-str">"application/json"</span>,
    <span class="tok-prop">"x-api-key"</span>: <span class="tok-str">"YOUR_API_KEY"</span>
}
payload = {
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Your verification code is 849201. Do not share this with anyone."</span>,
    <span class="tok-prop">"sender_id"</span>: <span class="tok-str">"Pave360"</span>
}
response = requests.<span class="tok-fn">post</span>(url, json=payload, headers=headers)
<span class="tok-fn">print</span>(response.<span class="tok-fn">json</span>())</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Response Box -->
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-arrow-return-right me-1"></i> Response</span>
            </div>
            <div id="code-box-res-sms-send" class="code-box-wrapper shadow-sm">
              <div class="code-box-header d-flex align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-pill status-200">200 OK</span>
                  <span class="text-white-50 small font-monospace">application/json</span>
                </div>
              </div>
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'res-sms-send' }"
                @click="copyActiveTabCode('code-box-res-sms-send', 'res-sms-send')"
                title="Copy response JSON"
              >
                <i :class="copiedKey === 'res-sms-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'res-sms-send' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Deploy Bulk SMS Campaign -->
    <section id="sms-campaign" class="endpoint-section">
      <div class="row gx-lg-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="method-badge post">POST</span>
            <h3 class="h4 mb-0 text-dark fw-bold">/sms/campaign</h3>
          </div>
          <div class="endpoint-url-chip mb-3">
            <div class="d-flex align-items-center me-2 text-truncate">
              <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
              <span class="text-truncate">https://api.pave360.com/api/external/sms/campaign</span>
            </div>
            <button 
              type="button" 
              class="copy-url-btn" 
              :class="{ copied: copiedKey === 'url-sms-camp' }"
              @click.stop="copyText('https://api.pave360.com/api/external/sms/campaign', 'url-sms-camp')"
              title="Copy endpoint URL"
            >
              <i :class="copiedKey === 'url-sms-camp' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
              <span v-if="copiedKey === 'url-sms-camp'" class="ms-1 small text-success fw-semibold">Copied!</span>
            </button>
          </div>
          <p class="text-secondary lead fs-6">
            Deploy Bulk SMS Campaign. Dispatches broadcast text campaigns to an array of recipients (comma-separated phone numbers) or targets an existing saved contact list.
          </p>

          <div class="alert alert-info py-2 px-3 border-0 bg-info bg-opacity-10 rounded-3 mb-4">
            <div class="d-flex gap-2">
              <i class="bi bi-info-circle-fill text-info mt-1"></i>
              <div class="small">
                <strong>Targeting Rule:</strong> Supply <strong>either</strong> <code>phone_numbers</code> (comma-separated list) <strong>or</strong> <code>list_id</code> (integer ID). Passing both or neither triggers an <code>EXT_VAL2_001</code> validation exception.
              </div>
            </div>
          </div>

          <!-- Request Headers -->
          <h5 class="api-spec-heading">Request Headers</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">Content-Type</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Must be <code>application/json</code></p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">x-api-key</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Your active organization API key.</p>
            </div>
          </div>

          <!-- Body Params -->
          <h5 class="api-spec-heading">Body Params</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">name</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Descriptive name for campaign tracking and analytics reporting.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">message</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Campaign message body. Supports up to 1600 characters.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">phone_numbers</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-optional">optional*</span>
              </div>
              <p class="moolre-param-desc">Comma-separated list of E.164 phone numbers (e.g. <code>+233241234567,+233247654321</code>). Up to 10,000 per request.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">list_id</span>
                <span class="moolre-param-type">integer</span>
                <span class="moolre-param-optional">optional*</span>
              </div>
              <p class="moolre-param-desc">Existing contact list ID created in the Pave360 console. Required if <code>phone_numbers</code> omitted.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">sender_id</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-optional">optional</span>
              </div>
              <p class="moolre-param-desc">Whitelisted Sender ID (3-11 characters). Falls back to default.</p>
            </div>
          </div>

          <!-- Responses -->
          <h5 class="api-spec-heading">Responses</h5>
          <div class="moolre-response-card">
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot success"></span>
                  <span class="moolre-response-code">200</span>
                  <span class="moolre-response-status">Success</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">campaign_id</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Assigned unique campaign identifier for polling status and delivery reports.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">name</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Campaign identifier name.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">total_recipients</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Deduplicated count of valid phone numbers enrolled in this broadcast.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">status</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Initial queue state: <code>QUEUED</code> or <code>SCHEDULED</code>.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">401</span>
                  <span class="moolre-response-status">Authentication Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>API_KEY_AUTH_002</code>: Invalid or revoked API key supplied in header.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">402</span>
                  <span class="moolre-response-status">Payment Required</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>OTP_VAL2_008</code>: Insufficient balance for total recipients. Deposit credits to continue.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">422</span>
                  <span class="moolre-response-status">Validation Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>EXT_VAL2_001</code>: Either both <code>phone_numbers</code> and <code>list_id</code> provided, or both missing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-xl-6">
          <div class="endpoint-sandbox-sticky">
            <!-- Request Command Box -->
            <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-terminal me-1"></i> Request</span>
            </div>
            <div id="code-box-req-sms-camp" class="code-box-wrapper shadow-sm">
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'req-sms-camp' }"
                @click="copyActiveTabCode('code-box-req-sms-camp', 'req-sms-camp')"
                title="Copy request code"
              >
                <i :class="copiedKey === 'req-sms-camp' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'req-sms-camp' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-sms-camp" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-sms-camp" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-sms-camp" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-sms-camp" role="tabpanel">
                  <pre><code><span class="tok-cmt">// Deploy Bulk SMS Campaign</span>
<span class="tok-kwd">const</span> <span class="tok-fn">triggerAction</span> = <span class="tok-kwd">async</span> (apiKey, payload) => {
  <span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">'https://api.pave360.com/api/external/sms/campaign'</span>, {
    method: <span class="tok-str">'POST'</span>,
    headers: {
      <span class="tok-str">'Content-Type'</span>: <span class="tok-str">'application/json'</span>,
      <span class="tok-str">'x-api-key'</span>: apiKey
    },
    body: JSON.<span class="tok-fn">stringify</span>(payload)
  });
  <span class="tok-kwd">return await</span> response.<span class="tok-fn">json</span>();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-sms-camp" role="tabpanel">
                  <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">POST</span> <span class="tok-str">https://api.pave360.com/api/external/sms/campaign</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"Content-Type: application/json"</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span> \
  <span class="tok-flag">-d</span> <span class="tok-str">'{
    <span class="tok-prop">"name"</span>: <span class="tok-str">"End of Month Flash Sale"</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Flash sale! Get 30% off today with code PAYDAY. Shop now: https://store.link"</span>,
    <span class="tok-prop">"phone_numbers"</span>: <span class="tok-str">"+233241234567,+233247654321"</span>
  }'</span></code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-sms-camp" role="tabpanel">
                  <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/sms/campaign"</span>
payload = {
    <span class="tok-prop">"name"</span>: <span class="tok-str">"End of Month Flash Sale"</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Flash sale! Get 30% off today with code PAYDAY. Shop now: https://store.link"</span>,
    <span class="tok-prop">"phone_numbers"</span>: <span class="tok-str">"+233241234567,+233247654321"</span>
}
response = requests.<span class="tok-fn">post</span>(url, json=payload, headers={<span class="tok-prop">"x-api-key"</span>: <span class="tok-str">"YOUR_API_KEY"</span>})
<span class="tok-fn">print</span>(response.<span class="tok-fn">json</span>())</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Response Box -->
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-arrow-return-right me-1"></i> Response</span>
            </div>
            <div id="code-box-res-sms-camp" class="code-box-wrapper shadow-sm">
              <div class="code-box-header d-flex align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-pill status-200">200 OK</span>
                  <span class="text-white-50 small font-monospace">application/json</span>
                </div>
              </div>
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'res-sms-camp' }"
                @click="copyActiveTabCode('code-box-res-sms-camp', 'res-sms-camp')"
                title="Copy response JSON"
              >
                <i :class="copiedKey === 'res-sms-camp' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'res-sms-camp' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_002"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"Campaign queued successfully"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"campaign_id"</span>: <span class="tok-num">8430</span>,
    <span class="tok-prop">"name"</span>: <span class="tok-str">"End of Month Flash Sale"</span>,
    <span class="tok-prop">"total_recipients"</span>: <span class="tok-num">2</span>,
    <span class="tok-prop">"status"</span>: <span class="tok-str">"QUEUED"</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Query SMS Campaign Status -->
    <section id="sms-status" class="endpoint-section">
      <div class="row gx-lg-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="method-badge get">GET</span>
            <h3 class="h4 mb-0 text-dark fw-bold">/sms/status/:id</h3>
          </div>
          <div class="endpoint-url-chip mb-3">
            <div class="d-flex align-items-center me-2 text-truncate">
              <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
              <span class="text-truncate">https://api.pave360.com/api/external/sms/status/:id</span>
            </div>
            <button 
              type="button" 
              class="copy-url-btn" 
              :class="{ copied: copiedKey === 'url-sms-stat' }"
              @click.stop="copyText('https://api.pave360.com/api/external/sms/status/:id', 'url-sms-stat')"
              title="Copy endpoint URL"
            >
              <i :class="copiedKey === 'url-sms-stat' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
              <span v-if="copiedKey === 'url-sms-stat'" class="ms-1 small text-success fw-semibold">Copied!</span>
            </button>
          </div>
          <p class="text-secondary lead fs-6">
            Query SMS Campaign Status. Returns real-time database metrics showing processed logs, delivered handset acknowledgments (DLR), failed counts, pending transmissions, and the total targeted count.
          </p>

          <!-- Request Headers -->
          <h5 class="api-spec-heading">Request Headers</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">x-api-key</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Your active organization API key.</p>
            </div>
          </div>

          <!-- Path Parameters -->
          <h5 class="api-spec-heading">Path Parameters</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">id</span>
                <span class="moolre-param-type">integer</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">The unique <code>campaign_id</code> integer returned when the campaign was created.</p>
            </div>
          </div>

          <!-- Responses -->
          <h5 class="api-spec-heading">Responses</h5>
          <div class="moolre-response-card">
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot success"></span>
                  <span class="moolre-response-code">200</span>
                  <span class="moolre-response-status">Success</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">campaign_id</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Unique ID of queried campaign.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">total</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Total recipient contacts enrolled in campaign.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">sent</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Count of messages dispatched downstream to carrier SMS centers.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">delivered</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Count of verified handset delivery receipt (DLR) acknowledgments received.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">failed</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Count of messages rejected by carrier, expired, or invalid numbers.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">status</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Progress state: <code>QUEUED</code>, <code>PROCESSING</code>, <code>COMPLETED</code>, or <code>FAILED</code>.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">401</span>
                  <span class="moolre-response-status">Authentication Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>API_KEY_AUTH_001</code>: Missing or invalid <code>x-api-key</code> in header.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">403</span>
                  <span class="moolre-response-status">Forbidden</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>EXT_VAL2_003</code>: Permission denied. Campaign belongs to another organization account.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">404</span>
                  <span class="moolre-response-status">Not Found</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>EXT_VAL2_002</code>: Campaign not found. Verify the numeric <code>id</code>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6">
          <div class="endpoint-sandbox-sticky">
            <!-- Request Command Box -->
            <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-terminal me-1"></i> Request</span>
            </div>
            <div id="code-box-req-sms-stat" class="code-box-wrapper shadow-sm">
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'req-sms-stat' }"
                @click="copyActiveTabCode('code-box-req-sms-stat', 'req-sms-stat')"
                title="Copy request code"
              >
                <i :class="copiedKey === 'req-sms-stat' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'req-sms-stat' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-sms-stat" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-sms-stat" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-sms-stat" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-sms-stat" role="tabpanel">
                  <pre><code><span class="tok-cmt">// Get Campaign Status</span>
<span class="tok-kwd">const</span> <span class="tok-fn">getStatus</span> = <span class="tok-kwd">async</span> (apiKey, id) => {
  <span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">`https://api.pave360.com/api/external/sms/status/<span class="tok-num">${id}</span>`</span>, {
    method: <span class="tok-str">'GET'</span>,
    headers: { <span class="tok-str">'x-api-key'</span>: apiKey }
  });
  <span class="tok-kwd">return await</span> response.<span class="tok-fn">json</span>();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-sms-stat" role="tabpanel">
                  <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">GET</span> <span class="tok-str">https://api.pave360.com/api/external/sms/status/8430</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span></code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-sms-stat" role="tabpanel">
                  <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/sms/status/8430"</span>
response = requests.<span class="tok-fn">get</span>(url, headers={<span class="tok-prop">"x-api-key"</span>: <span class="tok-str">"YOUR_API_KEY"</span>})
<span class="tok-fn">print</span>(response.<span class="tok-fn">json</span>())</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Response Box -->
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-arrow-return-right me-1"></i> Response</span>
            </div>
            <div id="code-box-res-sms-stat" class="code-box-wrapper shadow-sm">
              <div class="code-box-header d-flex align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-pill status-200">200 OK</span>
                  <span class="text-white-50 small font-monospace">application/json</span>
                </div>
              </div>
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'res-sms-stat' }"
                @click="copyActiveTabCode('code-box-res-sms-stat', 'res-sms-stat')"
                title="Copy response JSON"
              >
                <i :class="copiedKey === 'res-sms-stat' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'res-sms-stat' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_003"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"campaign_id"</span>: <span class="tok-num">8430</span>,
    <span class="tok-prop">"total"</span>: <span class="tok-num">2</span>,
    <span class="tok-prop">"sent"</span>: <span class="tok-num">2</span>,
    <span class="tok-prop">"delivered"</span>: <span class="tok-num">2</span>,
    <span class="tok-prop">"failed"</span>: <span class="tok-num">0</span>,
    <span class="tok-prop">"status"</span>: <span class="tok-str">"COMPLETED"</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Voice Endpoints Section Header -->
    <h2 class="h3 mb-4 mt-5 text-dark border-bottom pb-2"><i class="bi bi-mic text-primary me-2"></i>Voice Services</h2>

    <!-- Voice Guidelines & Audio Specifications -->
    <div id="voice-guidelines" class="glass-panel p-4 mb-5 border-start border-4 border-info">
      <h3 class="h5 fw-bold text-dark mb-3"><i class="bi bi-file-earmark-music text-info me-2"></i>Voice Audio Specs & Call Lifecycle</h3>
      <p class="text-secondary small mb-3">
        Voice broadcasting initiates outbound automated telecommunication calls that play recorded audio messages to recipients. To guarantee codec compatibility across carrier trunks, adhere strictly to these audio constraints:
      </p>

      <div class="row g-4 mb-3">
        <div class="col-md-6">
          <div class="p-3 bg-light rounded-3 border h-100">
            <h6 class="fw-bold text-dark mb-2"><i class="bi bi-soundwave text-primary me-1"></i> Audio Codec & WAV Requirements</h6>
            <ul class="list-unstyled small text-secondary mb-0">
              <li class="mb-1"><strong>Container Format:</strong> Standard <code>.wav</code> audio file.</li>
              <li class="mb-1"><strong>Sampling Rate:</strong> <code>8,000 Hz</code> (8 kHz telephone standard).</li>
              <li class="mb-1"><strong>Encoding / Format:</strong> 16-bit PCM or CCITT a-law / u-law.</li>
              <li class="mb-1"><strong>Channels:</strong> Mono (1 channel only).</li>
              <li class="mb-1"><strong>Bitrate:</strong> 64 kbps constant bitrate.</li>
              <li><strong>Max Duration:</strong> 120 seconds (2 minutes).</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 bg-light rounded-3 border h-100">
            <h6 class="fw-bold text-dark mb-2"><i class="bi bi-diagram-3 text-info me-1"></i> Call State Lifecycle</h6>
            <div class="d-flex flex-wrap gap-1 mb-2">
              <span class="badge bg-secondary">SCHEDULED</span>
              <span class="badge bg-primary">QUEUED</span>
              <span class="badge bg-info">RINGING</span>
              <span class="badge bg-success">ANSWERED</span>
              <span class="badge bg-warning text-dark">BUSY / NO_ANSWER</span>
              <span class="badge bg-dark">COMPLETED</span>
            </div>
            <p class="small text-secondary mb-0">
              Calls are automatically billed per successful connection segment (cumulative answered seconds rounded up to nearest standard interval).
            </p>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary py-2 px-3 mb-0 small text-secondary border-0 bg-secondary bg-opacity-10 rounded-2">
        <i class="bi bi-globe me-1 text-dark"></i>
        <strong>Audio URL Accessibility:</strong> The <code>audio_url</code> must be publicly reachable over HTTPS, return <code>Content-Type: audio/wav</code> (or <code>audio/x-wav</code>), and respond with HTTP <code>200 OK</code> or <code>206 Partial Content</code> with no redirects or password protection.
      </div>
    </div>

    <!-- Create Voice Campaign -->
    <section id="voice-send" class="endpoint-section">
      <div class="row gx-lg-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="method-badge post">POST</span>
            <h3 class="h4 mb-0 text-dark fw-bold">/voice/send</h3>
          </div>
          <div class="endpoint-url-chip mb-3">
            <div class="d-flex align-items-center me-2 text-truncate">
              <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
              <span class="text-truncate">https://api.pave360.com/api/external/voice/send</span>
            </div>
            <button 
              type="button" 
              class="copy-url-btn" 
              :class="{ copied: copiedKey === 'url-voice-send' }"
              @click.stop="copyText('https://api.pave360.com/api/external/voice/send', 'url-voice-send')"
              title="Copy endpoint URL"
            >
              <i :class="copiedKey === 'url-voice-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
              <span v-if="copiedKey === 'url-voice-send'" class="ms-1 small text-success fw-semibold">Copied!</span>
            </button>
          </div>
          <p class="text-secondary lead fs-6">
            Create Voice Broadcast Campaign. Dispatches automated phone calls to designated mobile contacts, streaming your hosted audio file once the recipient answers the call.
          </p>

          <!-- Request Headers -->
          <h5 class="api-spec-heading">Request Headers</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">Content-Type</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Must be <code>application/json</code></p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">x-api-key</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Your active organization API key.</p>
            </div>
          </div>

          <!-- Body Params -->
          <h5 class="api-spec-heading">Body Params</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">name</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Identifiable campaign name for management reports.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">caller_id</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Authorized virtual phone number (DID) provisioned on your Pave360 voice trunk.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">audio_url</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Direct HTTPS URL to compliant WAV file (8kHz, mono, 64kbps).</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">phone_numbers</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-optional">optional*</span>
              </div>
              <p class="moolre-param-desc">Comma-separated list of E.164 phone numbers (e.g. <code>+233241234567</code>).</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">list_id</span>
                <span class="moolre-param-type">integer</span>
                <span class="moolre-param-optional">optional*</span>
              </div>
              <p class="moolre-param-desc">Saved contact list ID. Required if <code>phone_numbers</code> omitted.</p>
            </div>
          </div>

          <!-- Responses -->
          <h5 class="api-spec-heading">Responses</h5>
          <div class="moolre-response-card">
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot success"></span>
                  <span class="moolre-response-code">200</span>
                  <span class="moolre-response-status">Success</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">campaign_id</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Assigned unique campaign identifier for polling voice status.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">recipients_count</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Total valid phone numbers queued for outbound dialing.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">status</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Initial queue state: <code>SCHEDULED</code> or <code>QUEUED</code>.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">401</span>
                  <span class="moolre-response-status">Authentication Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>API_KEY_AUTH_001</code>: Unauthorized: Missing or invalid API key.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">402</span>
                  <span class="moolre-response-status">Payment Required</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>OTP_VAL2_008</code>: Insufficient voice credits to initiate call queue.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">422</span>
                  <span class="moolre-response-status">Validation Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>EXT_VAL2_004</code>: Validation failure: Invalid <code>audio_url</code>, missing target numbers, or unassigned caller ID.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-xl-6">
          <div class="endpoint-sandbox-sticky">
            <!-- Request Command Box -->
            <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-terminal me-1"></i> Request</span>
            </div>
            <div id="code-box-req-voice-send" class="code-box-wrapper shadow-sm">
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'req-voice-send' }"
                @click="copyActiveTabCode('code-box-req-voice-send', 'req-voice-send')"
                title="Copy request code"
              >
                <i :class="copiedKey === 'req-voice-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'req-voice-send' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-voice-send" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-voice-send" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-voice-send" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-voice-send" role="tabpanel">
                  <pre><code><span class="tok-cmt">// Create Voice Campaign</span>
<span class="tok-kwd">const</span> <span class="tok-fn">triggerAction</span> = <span class="tok-kwd">async</span> (apiKey, payload) => {
  <span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">'https://api.pave360.com/api/external/voice/send'</span>, {
    method: <span class="tok-str">'POST'</span>,
    headers: {
      <span class="tok-str">'Content-Type'</span>: <span class="tok-str">'application/json'</span>,
      <span class="tok-str">'x-api-key'</span>: apiKey
    },
    body: JSON.<span class="tok-fn">stringify</span>(payload)
  });
  <span class="tok-kwd">return await</span> response.<span class="tok-fn">json</span>();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-voice-send" role="tabpanel">
                  <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">POST</span> <span class="tok-str">https://api.pave360.com/api/external/voice/send</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"Content-Type: application/json"</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span> \
  <span class="tok-flag">-d</span> <span class="tok-str">'{
    <span class="tok-prop">"name"</span>: <span class="tok-str">"Security Alert Call"</span>,
    <span class="tok-prop">"caller_id"</span>: <span class="tok-str">"+233240000000"</span>,
    <span class="tok-prop">"audio_url"</span>: <span class="tok-str">"https://assets.pave360.com/audio/urgent_notice.wav"</span>,
    <span class="tok-prop">"phone_numbers"</span>: <span class="tok-str">"+233241234567"</span>
  }'</span></code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-voice-send" role="tabpanel">
                  <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/voice/send"</span>
payload = {
    <span class="tok-prop">"name"</span>: <span class="tok-str">"Security Alert Call"</span>,
    <span class="tok-prop">"caller_id"</span>: <span class="tok-str">"+233240000000"</span>,
    <span class="tok-prop">"audio_url"</span>: <span class="tok-str">"https://assets.pave360.com/audio/urgent_notice.wav"</span>,
    <span class="tok-prop">"phone_numbers"</span>: <span class="tok-str">"+233241234567"</span>
}
response = requests.<span class="tok-fn">post</span>(url, json=payload, headers={<span class="tok-prop">"x-api-key"</span>: <span class="tok-str">"YOUR_API_KEY"</span>})
<span class="tok-fn">print</span>(response.<span class="tok-fn">json</span>())</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Response Box -->
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-arrow-return-right me-1"></i> Response</span>
            </div>
            <div id="code-box-res-voice-send" class="code-box-wrapper shadow-sm">
              <div class="code-box-header d-flex align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-pill status-200">200 OK</span>
                  <span class="text-white-50 small font-monospace">application/json</span>
                </div>
              </div>
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'res-voice-send' }"
                @click="copyActiveTabCode('code-box-res-voice-send', 'res-voice-send')"
                title="Copy response JSON"
              >
                <i :class="copiedKey === 'res-voice-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'res-voice-send' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_004"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"Voice broadcast queued successfully"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"campaign_id"</span>: <span class="tok-num">9102</span>,
    <span class="tok-prop">"recipients_count"</span>: <span class="tok-num">1</span>,
    <span class="tok-prop">"status"</span>: <span class="tok-str">"SCHEDULED"</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Query Voice Campaign Status -->
    <section id="voice-status" class="endpoint-section">
      <div class="row gx-lg-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="method-badge get">GET</span>
            <h3 class="h4 mb-0 text-dark fw-bold">/voice/status/:id</h3>
          </div>
          <div class="endpoint-url-chip mb-3">
            <div class="d-flex align-items-center me-2 text-truncate">
              <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
              <span class="text-truncate">https://api.pave360.com/api/external/voice/status/:id</span>
            </div>
            <button 
              type="button" 
              class="copy-url-btn" 
              :class="{ copied: copiedKey === 'url-voice-stat' }"
              @click.stop="copyText('https://api.pave360.com/api/external/voice/status/:id', 'url-voice-stat')"
              title="Copy endpoint URL"
            >
              <i :class="copiedKey === 'url-voice-stat' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
              <span v-if="copiedKey === 'url-voice-stat'" class="ms-1 small text-success fw-semibold">Copied!</span>
            </button>
          </div>
          <p class="text-secondary lead fs-6">
            Query Voice Campaign Status. Retrieves granular metrics including total dial attempts, answered calls, cumulative duration in seconds, and final queue completion status.
          </p>

          <!-- Request Headers -->
          <h5 class="api-spec-heading">Request Headers</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">x-api-key</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">Your active organization API key.</p>
            </div>
          </div>

          <!-- Path Parameters -->
          <h5 class="api-spec-heading">Path Parameters</h5>
          <div class="moolre-param-card">
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">id</span>
                <span class="moolre-param-type">integer</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">The unique <code>campaign_id</code> integer returned when the voice campaign was scheduled.</p>
            </div>
          </div>

          <!-- Responses -->
          <h5 class="api-spec-heading">Responses</h5>
          <div class="moolre-response-card">
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot success"></span>
                  <span class="moolre-response-code">200</span>
                  <span class="moolre-response-status">Success</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">campaign_id</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Campaign identifier number.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">total_calls</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Total dial calls initiated to telecom carriers.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">answered</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Count of subscribers who picked up the phone.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">duration_seconds</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Total billable talk time in seconds across all connected calls.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">status</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Lifecycle status: <code>PROCESSING</code>, <code>COMPLETED</code>, or <code>FAILED</code>.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">401</span>
                  <span class="moolre-response-status">Authentication Error</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>API_KEY_AUTH_001</code>: Unauthorized: Missing or invalid API key.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">403</span>
                  <span class="moolre-response-status">Forbidden</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>EXT_VAL2_006</code>: Permission denied. Campaign belongs to another organization account.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">404</span>
                  <span class="moolre-response-status">Not Found</span>
                </div>
              </div>
              <div class="moolre-response-body">
                <div class="moolre-response-body-label">RESPONSE BODY</div>
                <div class="moolre-response-props">
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">code</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc"><code>EXT_VAL2_005</code>: Voice campaign not found. Confirm the integer <code>id</code>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-xl-6">
          <div class="endpoint-sandbox-sticky">
            <!-- Request Command Box -->
            <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-terminal me-1"></i> Request</span>
            </div>
            <div id="code-box-req-voice-stat" class="code-box-wrapper shadow-sm">
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'req-voice-stat' }"
                @click="copyActiveTabCode('code-box-req-voice-stat', 'req-voice-stat')"
                title="Copy request code"
              >
                <i :class="copiedKey === 'req-voice-stat' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'req-voice-stat' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-voice-stat" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-voice-stat" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-voice-stat" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-voice-stat" role="tabpanel">
                  <pre><code><span class="tok-cmt">// Get Voice Campaign Status</span>
<span class="tok-kwd">const</span> <span class="tok-fn">getStatus</span> = <span class="tok-kwd">async</span> (apiKey, id) => {
  <span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">`https://api.pave360.com/api/external/voice/status/<span class="tok-num">${id}</span>`</span>, {
    method: <span class="tok-str">'GET'</span>,
    headers: { <span class="tok-str">'x-api-key'</span>: apiKey }
  });
  <span class="tok-kwd">return await</span> response.<span class="tok-fn">json</span>();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-voice-stat" role="tabpanel">
                  <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">GET</span> <span class="tok-str">https://api.pave360.com/api/external/voice/status/9102</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span></code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-voice-stat" role="tabpanel">
                  <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/voice/status/9102"</span>
response = requests.<span class="tok-fn">get</span>(url, headers={<span class="tok-prop">"x-api-key"</span>: <span class="tok-str">"YOUR_API_KEY"</span>})
<span class="tok-fn">print</span>(response.<span class="tok-fn">json</span>())</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Sample Response Box -->
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-arrow-return-right me-1"></i> Response</span>
            </div>
            <div id="code-box-res-voice-stat" class="code-box-wrapper shadow-sm">
              <div class="code-box-header d-flex align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-pill status-200">200 OK</span>
                  <span class="text-white-50 small font-monospace">application/json</span>
                </div>
              </div>
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'res-voice-stat' }"
                @click="copyActiveTabCode('code-box-res-voice-stat', 'res-voice-stat')"
                title="Copy response JSON"
              >
                <i :class="copiedKey === 'res-voice-stat' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'res-voice-stat' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_005"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"campaign_id"</span>: <span class="tok-num">9102</span>,
    <span class="tok-prop">"total_calls"</span>: <span class="tok-num">1</span>,
    <span class="tok-prop">"answered"</span>: <span class="tok-num">1</span>,
    <span class="tok-prop">"duration_seconds"</span>: <span class="tok-num">42</span>,
    <span class="tok-prop">"status"</span>: <span class="tok-str">"COMPLETED"</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  </div>
</template>

