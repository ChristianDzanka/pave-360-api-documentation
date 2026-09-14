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
</script>

<template>
  <div class="auth-endpoints-doc">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <span class="badge bg-light text-dark mb-2 border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">API Reference</span>
        <h1 class="display-5 fw-bold mb-0 text-dark"><i class="bi bi-shield-lock text-primary me-3"></i>Authentication & OTP</h1>
        <p class="text-secondary mt-2 mb-0">High-security One-Time Password (OTP) generation, delivery, anti-pumping rate limiting, and atomic verification.</p>
      </div>
    </div>

    <!-- OTP Security & Lifecycle Guidelines -->
    <div id="otp-security" class="glass-panel p-4 mb-5 border-start border-4 border-success">
      <h3 class="h5 fw-bold text-dark mb-3"><i class="bi bi-shield-check text-success me-2"></i>OTP Security & Fraud Prevention Architecture</h3>
      <p class="text-secondary small mb-3">
        Pave360 provides an enterprise-grade authentication pipeline engineered to stop SMS traffic pumping, brute-force attacks, and token reuse:
      </p>

      <div class="row g-4 mb-3">
        <div class="col-md-4">
          <div class="p-3 bg-light rounded-3 border h-100">
            <h6 class="fw-bold text-dark mb-2"><i class="bi bi-shield-slash text-danger me-1"></i> Anti-Pumping Throttle</h6>
            <p class="small text-secondary mb-0">
              Limits dispatches to <strong>max 3 OTP requests per phone number within 10 minutes</strong>. Prevents automated bots from draining your billing balance via rogue SMS generation.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-light rounded-3 border h-100">
            <h6 class="fw-bold text-dark mb-2"><i class="bi bi-lock text-warning me-1"></i> 3-Attempt Lockout</h6>
            <p class="small text-secondary mb-0">
              Users are allowed a maximum of <strong>3 incorrect entry attempts</strong>. On the 3rd failure, the session is invalidated and permanently destroyed from the database.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-light rounded-3 border h-100">
            <h6 class="fw-bold text-dark mb-2"><i class="bi bi-lightning-charge text-primary me-1"></i> Atomic Single-Use</h6>
            <p class="small text-secondary mb-0">
              Upon successful validation, the token is marked verified and instantly wiped in an atomic transaction to eliminate replay attacks.
            </p>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary py-2 px-3 mb-0 small text-secondary border-0 bg-secondary bg-opacity-10 rounded-2">
        <i class="bi bi-chat-left-quote me-1 text-dark"></i>
        <strong>Custom Message Template:</strong> When supplying a custom <code>message</code> parameter, you must include the literal placeholder <code>[code]</code>. Pave360 will dynamically inject the generated token in its place.
      </div>
    </div>

    <!-- OTP Section Header -->
    <h2 class="h3 mb-4 mt-4 text-dark border-bottom pb-2"><i class="bi bi-shield-lock text-primary me-2"></i>One-Time Passwords (OTP) Endpoints</h2>

    <!-- Send OTP -->
    <section id="otp-send" class="endpoint-section">
      <div class="row gx-lg-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="method-badge post">POST</span>
            <h3 class="h4 mb-0 text-dark fw-bold">/otp/send</h3>
          </div>
          <div class="endpoint-url-chip mb-3">
            <div class="d-flex align-items-center me-2 text-truncate">
              <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
              <span class="text-truncate">https://api.pave360.com/api/external/otp/send</span>
            </div>
            <button 
              type="button" 
              class="copy-url-btn" 
              :class="{ copied: copiedKey === 'url-otp-send' }"
              @click.stop="copyText('https://api.pave360.com/api/external/otp/send', 'url-otp-send')"
              title="Copy URL"
            >
              <i :class="copiedKey === 'url-otp-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
              <span v-if="copiedKey === 'url-otp-send'" class="ms-1 small text-success fw-semibold">Copied!</span>
            </button>
          </div>
          <p class="text-secondary lead fs-6">
            Send Configurable One-Time Password. Dispatches a high-priority cryptographic verification token to a mobile phone number. Character length, token charset, expiration duration, custom SMS copy, and Sender ID can be tailored to your brand.
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
              <p class="moolre-param-desc">E.164 phone format (e.g. <code>+233241234567</code>). Must be a valid mobile phone line.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">expiry</span>
                <span class="moolre-param-type">integer</span>
                <span class="moolre-param-optional">optional</span>
              </div>
              <p class="moolre-param-desc">Token validity duration in minutes. Allowed integer range: <strong>1 to 10</strong>. Defaults to <code>5</code>.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">length</span>
                <span class="moolre-param-type">integer</span>
                <span class="moolre-param-optional">optional</span>
              </div>
              <p class="moolre-param-desc">Number of characters in the generated OTP. Allowed range: <strong>4 to 8</strong>. Defaults to <code>6</code>.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">type</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-optional">optional</span>
              </div>
              <p class="moolre-param-desc">Character set: <code>NUMERIC</code> (0-9), <code>ALPHA</code> (A-Z), or <code>ALPHANUMERIC</code>. Defaults to <code>NUMERIC</code>.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">message</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-optional">optional</span>
              </div>
              <p class="moolre-param-desc">Custom message template. <strong>Must include <code>[code]</code></strong> placeholder.</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">sender_id</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-optional">optional</span>
              </div>
              <p class="moolre-param-desc">3-11 alphanumeric Sender ID. Defaults to your approved account default.</p>
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
                      <span class="moolre-prop-name">phone_number</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Recipient phone number in standardized format.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">expires_in_minutes</span>
                      <span class="moolre-prop-type">integer</span>
                    </div>
                    <p class="moolre-prop-desc">Active countdown duration before token invalidation.</p>
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
                    <p class="moolre-prop-desc"><code>OTP_VAL2_008</code>: Insufficient credits. OTP costs 1 unit (approx GHS 0.033).</p>
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
                    <p class="moolre-prop-desc"><code>EXT_VAL2_010</code>: Invalid phone number format, or invalid parameters (<code>OTP_VAL2_010</code> for expiry 1-10m, <code>OTP_VAL2_011</code> for length 4-8, <code>OTP_VAL2_012</code> for type).</p>
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
                    <p class="moolre-prop-desc"><code>RATE_LIMIT_001</code>: Anti-pumping flood control triggered (max 3 dispatches per 10 mins).</p>
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
            <div id="code-box-req-otp-send" class="code-box-wrapper shadow-sm">
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'req-otp-send' }"
                @click="copyActiveTabCode('code-box-req-otp-send', 'req-otp-send')"
                title="Copy request code"
              >
                <i :class="copiedKey === 'req-otp-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'req-otp-send' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-otp-send" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-otp-send" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-otp-send" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-otp-send" role="tabpanel">
                  <pre><code><span class="tok-cmt">// Send OTP</span>
<span class="tok-kwd">const</span> <span class="tok-fn">triggerAction</span> = <span class="tok-kwd">async</span> (apiKey, payload) => {
  <span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">'https://api.pave360.com/api/external/otp/send'</span>, {
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
                <div class="tab-pane fade" id="tab-curl-otp-send" role="tabpanel">
                  <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">POST</span> <span class="tok-str">https://api.pave360.com/api/external/otp/send</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"Content-Type: application/json"</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span> \
  <span class="tok-flag">-d</span> <span class="tok-str">'{
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"length"</span>: <span class="tok-num">6</span>,
    <span class="tok-prop">"type"</span>: <span class="tok-str">"NUMERIC"</span>,
    <span class="tok-prop">"expiry"</span>: <span class="tok-num">5</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Your Pave360 login code is [code]. Valid for 5 minutes."</span>
  }'</span></code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-otp-send" role="tabpanel">
                  <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/otp/send"</span>
payload = {
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"length"</span>: <span class="tok-num">6</span>,
    <span class="tok-prop">"type"</span>: <span class="tok-str">"NUMERIC"</span>,
    <span class="tok-prop">"expiry"</span>: <span class="tok-num">5</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Your Pave360 login code is [code]. Valid for 5 minutes."</span>
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
            <div id="code-box-res-otp-send" class="code-box-wrapper shadow-sm">
              <div class="code-box-header d-flex align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-pill status-200">200 OK</span>
                  <span class="text-white-50 small font-monospace">application/json</span>
                </div>
              </div>
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'res-otp-send' }"
                @click="copyActiveTabCode('code-box-res-otp-send', 'res-otp-send')"
                title="Copy response JSON"
              >
                <i :class="copiedKey === 'res-otp-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'res-otp-send' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_006"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"OTP generated and sent"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"expires_in_minutes"</span>: <span class="tok-num">5</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Verify OTP -->
    <section id="otp-verify" class="endpoint-section">
      <div class="row gx-lg-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-2 mb-2">
            <span class="method-badge post">POST</span>
            <h3 class="h4 mb-0 text-dark fw-bold">/otp/verify</h3>
          </div>
          <div class="endpoint-url-chip mb-3">
            <div class="d-flex align-items-center me-2 text-truncate">
              <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
              <span class="text-truncate">https://api.pave360.com/api/external/otp/verify</span>
            </div>
            <button 
              type="button" 
              class="copy-url-btn" 
              :class="{ copied: copiedKey === 'url-otp-verify' }"
              @click.stop="copyText('https://api.pave360.com/api/external/otp/verify', 'url-otp-verify')"
              title="Copy URL"
            >
              <i :class="copiedKey === 'url-otp-verify' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
              <span v-if="copiedKey === 'url-otp-verify'" class="ms-1 small text-success fw-semibold">Copied!</span>
            </button>
          </div>
          <p class="text-secondary lead fs-6">
            Verify One-Time Password. Validates the code submitted by the user against the active OTP database session. Upon successful verification, the token is permanently consumed and marked verified.
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
              <p class="moolre-param-desc">E.164 phone format of subscriber verifying the OTP (e.g. <code>+233241234567</code>).</p>
            </div>
            <div class="moolre-param-row">
              <div class="moolre-param-header">
                <span class="moolre-param-name">otp_code</span>
                <span class="moolre-param-type">string</span>
                <span class="moolre-param-required">required</span>
              </div>
              <p class="moolre-param-desc">The code received by the user on their phone (4 to 8 characters).</p>
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
                      <span class="moolre-prop-name">phone_number</span>
                      <span class="moolre-prop-type">string</span>
                    </div>
                    <p class="moolre-prop-desc">Target recipient phone number verified.</p>
                  </div>
                  <div class="moolre-prop-row">
                    <div>
                      <span class="moolre-prop-name">verified</span>
                      <span class="moolre-prop-type">boolean</span>
                    </div>
                    <p class="moolre-prop-desc"><code>true</code> when verification succeeds and the token is consumed.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="moolre-response-item">
              <div class="moolre-response-header">
                <div class="moolre-response-header-left">
                  <span class="moolre-dot error"></span>
                  <span class="moolre-response-code">400</span>
                  <span class="moolre-response-status">Verification Failed / Locked Out</span>
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
                    <p class="moolre-prop-desc"><code>EXT_VAL2_011</code>: Invalid OTP, expired OTP, or too many verification failures (locked out).</p>
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
                    <p class="moolre-prop-desc"><code>EXT_VAL2_010</code>: Invalid phone number format.</p>
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
            <div id="code-box-req-otp-ver" class="code-box-wrapper shadow-sm">
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'req-otp-ver' }"
                @click="copyActiveTabCode('code-box-req-otp-ver', 'req-otp-ver')"
                title="Copy request code"
              >
                <i :class="copiedKey === 'req-otp-ver' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'req-otp-ver' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-otp-ver" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-otp-ver" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-otp-ver" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-otp-ver" role="tabpanel">
                  <pre><code><span class="tok-cmt">// Verify OTP</span>
<span class="tok-kwd">const</span> <span class="tok-fn">triggerAction</span> = <span class="tok-kwd">async</span> (apiKey, payload) => {
  <span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">'https://api.pave360.com/api/external/otp/verify'</span>, {
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
                <div class="tab-pane fade" id="tab-curl-otp-ver" role="tabpanel">
                  <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">POST</span> <span class="tok-str">https://api.pave360.com/api/external/otp/verify</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"Content-Type: application/json"</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span> \
  <span class="tok-flag">-d</span> <span class="tok-str">'{
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"otp_code"</span>: <span class="tok-str">"849201"</span>
  }'</span></code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-otp-ver" role="tabpanel">
                  <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/otp/verify"</span>
payload = {
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"otp_code"</span>: <span class="tok-str">"849201"</span>
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
            <div id="code-box-res-otp-ver" class="code-box-wrapper shadow-sm">
              <div class="code-box-header d-flex align-items-center">
                <div class="d-flex align-items-center gap-2">
                  <span class="status-pill status-200">200 OK</span>
                  <span class="text-white-50 small font-monospace">application/json</span>
                </div>
              </div>
              <button 
                type="button" 
                class="copy-code-btn" 
                :class="{ copied: copiedKey === 'res-otp-ver' }"
                @click="copyActiveTabCode('code-box-res-otp-ver', 'res-otp-ver')"
                title="Copy response JSON"
              >
                <i :class="copiedKey === 'res-otp-ver' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span>{{ copiedKey === 'res-otp-ver' ? 'Copied!' : 'Copy' }}</span>
              </button>
              <pre><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_007"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"OTP verified successfully"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"verified"</span>: <span class="tok-bool">true</span>
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

