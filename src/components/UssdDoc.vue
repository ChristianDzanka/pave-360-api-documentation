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
  <div class="ussd-doc">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <span class="badge bg-light text-dark mb-2 border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">API Reference</span>
        <h1 class="display-5 fw-bold mb-0 text-dark"><i class="bi bi-phone text-primary me-3"></i>USSD Services</h1>
        <p class="text-secondary mt-2 mb-0">Build interactive 2-way telco sessions and network-initiated USSD push dialogs over GSM signaling channels.</p>
      </div>
    </div>

    <!-- Overview Section -->
    <section id="ussd-overview" class="doc-section mb-5">
      <h2 class="h3 mb-4 text-dark border-bottom pb-2"><i class="bi bi-diagram-2 me-2 text-primary"></i>USSD Protocol Architecture</h2>
      <div class="glass-panel p-4 mb-4">
        <p class="text-secondary">
          Pave360 USSD Gateway bridges cloud HTTP webhooks directly with mobile network operator (MNO) signaling channels (MAP / SS7 protocol layers). Unlike SMS, USSD operates as a persistent, real-time interactive session without data bundles or internet connectivity.
        </p>

        <div class="row g-4 mt-1 mb-3">
          <div class="col-md-4">
            <div class="p-3 bg-light rounded-3 border h-100">
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="bi bi-stopwatch text-danger fs-5"></i>
                <h6 class="fw-bold mb-0 text-dark">Strict Timeouts</h6>
              </div>
              <p class="small text-secondary mb-0">
                Carriers enforce a <strong>20 to 30 second</strong> handset radio window. Your webhook must respond within <strong>3 to 5 seconds</strong>, or the carrier drops the call with a network MMI error.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-light rounded-3 border h-100">
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="bi bi-textarea-resize text-primary fs-5"></i>
                <h6 class="fw-bold mb-0 text-dark">160 Char Screen Limit</h6>
              </div>
              <p class="small text-secondary mb-0">
                Each screen is restricted to <strong>160 characters</strong> (GSM 7-bit packing). Exceeding this limit causes carrier screen corruption or truncation on feature phones.
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-light rounded-3 border h-100">
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="bi bi-sim text-success fs-5"></i>
                <h6 class="fw-bold mb-0 text-dark">Multi-Telco Routing</h6>
              </div>
              <p class="small text-secondary mb-0">
                Direct interconnects with MTN Ghana, Telecel, and AT Ghana with automated session handoff, network tagging, and routing redundancy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Inbound Session Webhook -->
    <section id="ussd-session" class="doc-section mb-5">
      <h2 class="h3 mb-4 text-dark border-bottom pb-2"><i class="bi bi-terminal me-2 text-primary"></i>Session Callback</h2>
      <div class="endpoint-section pt-0">
        <div class="row gx-lg-5">
          <div class="col-xl-6 mb-4 mb-xl-0">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="method-badge post">POST</span>
              <h3 class="h4 mb-0 text-dark fw-bold">/ussd/callback</h3>
            </div>
            <div class="endpoint-url-chip mb-3">
              <div class="d-flex align-items-center me-2 text-truncate">
                <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
                <span class="text-truncate">https://api.pave360.com/api/external/ussd/callback</span>
              </div>
              <button 
                type="button" 
                class="copy-url-btn" 
                :class="{ copied: copiedKey === 'url-ussd-cb' }"
                @click.stop="copyText('https://api.pave360.com/api/external/ussd/callback', 'url-ussd-cb')"
                title="Copy webhook endpoint URL"
              >
                <i :class="copiedKey === 'url-ussd-cb' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span v-if="copiedKey === 'url-ussd-cb'" class="ms-1 small text-success fw-semibold">Copied!</span>
              </button>
            </div>
            <p class="text-secondary lead fs-6">
              Inbound Session Webhook. When a subscriber dials your shortcode (e.g. <code>*920*360#</code>) or enters menu responses, Pave360 relays an HTTP POST request to your webhook URL and awaits your menu instructions.
            </p>

            <!-- Inbound Webhook Headers -->
            <h5 class="api-spec-heading">Inbound Webhook Headers</h5>
            <div class="moolre-param-card">
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">Content-Type</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc">Always <code>application/json</code></p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">User-Agent</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-optional">optional</span>
                </div>
                <p class="moolre-param-desc"><code>Pave360-USSD-Gateway/1.0</code></p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">X-Pave360-Signature</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc">HMAC SHA-256 signature calculated using your account secret key for tamper verification.</p>
              </div>
            </div>

            <!-- Inbound Payload Parameters -->
            <h5 class="api-spec-heading">Inbound Payload Parameters</h5>
            <div class="moolre-param-card">
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">session_id</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc">Unique identifier generated by the carrier for the lifetime of this subscriber interaction.</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">phone_number</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc">E.164 mobile number of dialing subscriber (e.g. <code>+233241234567</code>).</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">network</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc">Mobile operator: <code>MTN</code>, <code>TELECEL</code>, or <code>AT</code>.</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">service_code</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc">The shortcode or root extension dialed (e.g. <code>*920*360#</code>).</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">user_input</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-optional">optional</span>
                </div>
                <p class="moolre-param-desc">The exact digits or text entered by the user in response to the previous menu screen. Empty string on <code>INITIATION</code>.</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">session_type</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc"><code>INITIATION</code> (dialed root shortcode), <code>RESPONSE</code> (user typed response), or <code>TIMEOUT</code> (radio session expired).</p>
              </div>
            </div>

            <!-- Responses -->
            <h5 class="api-spec-heading">Responses (Expected Webhook Return)</h5>
            <div class="moolre-response-card">
              <div class="moolre-response-item">
                <div class="moolre-response-header">
                  <div class="moolre-response-header-left">
                    <span class="moolre-dot success"></span>
                    <span class="moolre-response-code">200</span>
                    <span class="moolre-response-status">Handset Prompt Output</span>
                  </div>
                </div>
                <div class="moolre-response-body">
                  <div class="moolre-response-body-label">RESPONSE BODY</div>
                  <div class="moolre-response-props">
                    <div class="moolre-prop-row">
                      <div>
                        <span class="moolre-prop-name">action</span>
                        <span class="moolre-prop-type">string</span>
                      </div>
                      <p class="moolre-prop-desc"><code>CON</code> to show message and keep session open, or <code>END</code> to show final message and close session.</p>
                    </div>
                    <div class="moolre-prop-row">
                      <div>
                        <span class="moolre-prop-name">message</span>
                        <span class="moolre-prop-type">string</span>
                      </div>
                      <p class="moolre-prop-desc">The menu screen text to display on the handset screen. Maximum 160 characters.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-6">
            <div class="endpoint-sandbox-sticky">
              <!-- Command / Handler Box -->
              <div class="mb-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-terminal me-1"></i> Webhook Handler Code</span>
              </div>
              <div id="code-box-req-ussd-session" class="code-box-wrapper shadow-sm">
                <button 
                  type="button" 
                  class="copy-code-btn" 
                  :class="{ 'copied': copiedKey === 'req-ussd-session' }" 
                  @click="copyActiveTabCode('code-box-req-ussd-session', 'req-ussd-session')"
                  title="Copy handler code"
                >
                  <i :class="copiedKey === 'req-ussd-session' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                  <span>{{ copiedKey === 'req-ussd-session' ? 'Copied!' : 'Copy' }}</span>
                </button>
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-ussd" type="button" role="tab">Node.js</button></li>
                  <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-ussd" type="button" role="tab">Python</button></li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="tab-js-ussd" role="tabpanel">
                    <pre><code><span class="tok-cmt">// Express.js USSD Inbound Callback Handler</span>
app.<span class="tok-fn">post</span>(<span class="tok-str">'/ussd/callback'</span>, (req, res) => {
  <span class="tok-kwd">const</span> { session_id, phone_number, user_input, session_type } = req.body;
  
  <span class="tok-cmt">// First dial: render main welcome menu</span>
  <span class="tok-kwd">if</span> (session_type === <span class="tok-str">'INITIATION'</span>) {
    <span class="tok-kwd">return</span> res.<span class="tok-fn">json</span>({
      action: <span class="tok-str">'CON'</span>,
      message: <span class="tok-str">'Welcome to Pave360\n1. Check Balance\n2. Buy Airtime\n3. Customer Support'</span>
    });
  }

  <span class="tok-cmt">// Handle user menu selection</span>
  <span class="tok-kwd">if</span> (user_input === <span class="tok-str">'1'</span>) {
    <span class="tok-kwd">return</span> res.<span class="tok-fn">json</span>({
      action: <span class="tok-str">'END'</span>,
      message: <span class="tok-str">'Your available balance is GHS 1,450.00. Thank you.'</span>
    });
  } <span class="tok-kwd">else if</span> (user_input === <span class="tok-str">'2'</span>) {
    <span class="tok-kwd">return</span> res.<span class="tok-fn">json</span>({
      action: <span class="tok-str">'CON'</span>,
      message: <span class="tok-str">'Enter airtime amount (e.g. 10):'</span>
    });
  }

  res.<span class="tok-fn">json</span>({
    action: <span class="tok-str">'END'</span>,
    message: <span class="tok-str">'Invalid option selected. Session terminated.'</span>
  });
});</code></pre>
                  </div>
                  <div class="tab-pane fade" id="tab-py-ussd" role="tabpanel">
                    <pre><code><span class="tok-cmt"># Flask / FastAPI USSD Inbound Callback Handler</span>
<span class="tok-kwd">from</span> flask <span class="tok-kwd">import</span> Flask, request, jsonify

app = Flask(__name__)

@app.<span class="tok-fn">route</span>(<span class="tok-str">'/ussd/callback'</span>, methods=[<span class="tok-str">'POST'</span>])
<span class="tok-kwd">def</span> <span class="tok-fn">handle_ussd</span>():
    data = request.<span class="tok-fn">get_json</span>()
    session_type = data.<span class="tok-fn">get</span>(<span class="tok-str">'session_type'</span>)
    user_input = data.<span class="tok-fn">get</span>(<span class="tok-str">'user_input'</span>, <span class="tok-str">''</span>)
    
    <span class="tok-kwd">if</span> session_type == <span class="tok-str">'INITIATION'</span>:
        <span class="tok-kwd">return</span> jsonify({
            <span class="tok-prop">"action"</span>: <span class="tok-str">"CON"</span>,
            <span class="tok-prop">"message"</span>: <span class="tok-str">"Welcome to Pave360\n1. Check Balance\n2. Buy Airtime\n3. Exit"</span>
        })
        
    <span class="tok-kwd">if</span> user_input == <span class="tok-str">"1"</span>:
        <span class="tok-kwd">return</span> jsonify({
            <span class="tok-prop">"action"</span>: <span class="tok-str">"END"</span>,
            <span class="tok-prop">"message"</span>: <span class="tok-str">"Your available balance is GHS 1,450.00."</span>
        })
        
    <span class="tok-kwd">return</span> jsonify({<span class="tok-prop">"action"</span>: <span class="tok-str">"END"</span>, <span class="tok-prop">"message"</span>: <span class="tok-str">"Session finished. Goodbye."</span>})</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <!-- Expected Response Box -->
            <div>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="text-uppercase small fw-bold text-muted font-monospace"><i class="bi bi-arrow-return-right me-1"></i> Webhook Expected Return</span>
              </div>
              <div id="code-box-res-ussd-session" class="code-box-wrapper shadow-sm">
                <div class="code-box-header d-flex align-items-center">
                  <div class="d-flex align-items-center gap-2">
                    <span class="status-pill status-200">200 OK</span>
                    <span class="text-white-50 small font-monospace">application/json</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  class="copy-code-btn" 
                  :class="{ 'copied': copiedKey === 'res-ussd-session' }" 
                  @click="copyActiveTabCode('code-box-res-ussd-session', 'res-ussd-session')"
                  title="Copy response JSON"
                >
                  <i :class="copiedKey === 'res-ussd-session' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                  <span>{{ copiedKey === 'res-ussd-session' ? 'Copied!' : 'Copy' }}</span>
                </button>
                <pre><code>{
  <span class="tok-prop">"action"</span>: <span class="tok-str">"CON"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"Welcome to Pave360\n1. Check Balance\n2. Transfer Funds\n3. Support"</span>
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Outbound USSD Push -->
    <section id="ussd-push" class="doc-section mb-5">
      <h2 class="h3 mb-4 text-dark border-bottom pb-2"><i class="bi bi-send me-2 text-primary"></i>USSD Push (NI-USSD)</h2>
      <div class="endpoint-section pt-0">
        <div class="row gx-lg-5">
          <div class="col-xl-6 mb-4 mb-xl-0">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="method-badge post">POST</span>
              <h3 class="h4 mb-0 text-dark fw-bold">/ussd/send</h3>
            </div>
            <div class="endpoint-url-chip mb-3">
              <div class="d-flex align-items-center me-2 text-truncate">
                <i class="bi bi-link-45deg text-success me-1 flex-shrink-0"></i>
                <span class="text-truncate">https://api.pave360.com/api/external/ussd/send</span>
              </div>
              <button 
                type="button" 
                class="copy-url-btn" 
                :class="{ copied: copiedKey === 'url-ussd-send' }"
                @click.stop="copyText('https://api.pave360.com/api/external/ussd/send', 'url-ussd-send')"
                title="Copy endpoint URL"
              >
                <i :class="copiedKey === 'url-ussd-send' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                <span v-if="copiedKey === 'url-ussd-send'" class="ms-1 small text-success fw-semibold">Copied!</span>
              </button>
            </div>
            <p class="text-secondary lead fs-6">
              Outbound USSD Push (Network Initiated). Dispatches an interactive prompt dialog directly onto a customer's handset screen, demanding instant authorization (e.g. mobile money approvals, login verifications).
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
                <p class="moolre-param-desc">E.164 phone number of target mobile handset (e.g. <code>+233241234567</code>).</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">message</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-required">required</span>
                </div>
                <p class="moolre-param-desc">Prompt text. Maximum <strong>160 characters</strong>.</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">service_code</span>
                  <span class="moolre-param-type">string</span>
                  <span class="moolre-param-optional">optional</span>
                </div>
                <p class="moolre-param-desc">Registered USSD shortcode (e.g. <code>*920*360#</code>) associated with your account.</p>
              </div>
              <div class="moolre-param-row">
                <div class="moolre-param-header">
                  <span class="moolre-param-name">timeout_seconds</span>
                  <span class="moolre-param-type">integer</span>
                  <span class="moolre-param-optional">optional</span>
                </div>
                <p class="moolre-param-desc">Handset prompt display timeout (10-30 seconds). Defaults to <code>30</code>.</p>
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
                        <span class="moolre-prop-name">session_id</span>
                        <span class="moolre-prop-type">string</span>
                      </div>
                      <p class="moolre-prop-desc">Unique outbound USSD session identifier created for this push transaction.</p>
                    </div>
                    <div class="moolre-prop-row">
                      <div>
                        <span class="moolre-prop-name">phone_number</span>
                        <span class="moolre-prop-type">string</span>
                      </div>
                      <p class="moolre-prop-desc">Recipient phone number.</p>
                    </div>
                    <div class="moolre-prop-row">
                      <div>
                        <span class="moolre-prop-name">dispatched_at</span>
                        <span class="moolre-prop-type">string</span>
                      </div>
                      <p class="moolre-prop-desc">ISO 8601 timestamp of telco network dispatch.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="moolre-response-item">
                <div class="moolre-response-header">
                  <div class="moolre-response-header-left">
                    <span class="moolre-dot error"></span>
                    <span class="moolre-response-code">400</span>
                    <span class="moolre-response-status">Bad Request</span>
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
                      <p class="moolre-prop-desc"><code>EXT_VAL2_000</code>: Message exceeds 160 characters or invalid phone number.</p>
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
                      <p class="moolre-prop-desc"><code>API_KEY_AUTH_001</code>: Missing or invalid <code>x-api-key</code>.</p>
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
                      <p class="moolre-prop-desc"><code>OTP_VAL2_008</code>: Insufficient credits balance for USSD push session.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="moolre-response-item">
                <div class="moolre-response-header">
                  <div class="moolre-response-header-left">
                    <span class="moolre-dot error"></span>
                    <span class="moolre-response-code">422</span>
                    <span class="moolre-response-status">Unreachable Handset</span>
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
                      <p class="moolre-prop-desc"><code>EXT_VAL2_010</code>: Handset unreachable or out of GSM radio coverage.</p>
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
              <div id="code-box-req-ussd-push" class="code-box-wrapper shadow-sm">
                <button 
                  type="button" 
                  class="copy-code-btn" 
                  :class="{ 'copied': copiedKey === 'req-ussd-push' }" 
                  @click="copyActiveTabCode('code-box-req-ussd-push', 'req-ussd-push')"
                  title="Copy request code"
                >
                  <i :class="copiedKey === 'req-ussd-push' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                  <span>{{ copiedKey === 'req-ussd-push' ? 'Copied!' : 'Copy' }}</span>
                </button>
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-curl-ussd-push" type="button" role="tab">cURL</button></li>
                  <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-js-ussd-push" type="button" role="tab">Node.js</button></li>
                  <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-ussd-push" type="button" role="tab">Python</button></li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="tab-curl-ussd-push" role="tabpanel">
                    <pre><code>curl <span class="tok-flag">-X</span> <span class="tok-method">POST</span> <span class="tok-str">"https://api.pave360.com/api/external/ussd/send"</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"Content-Type: application/json"</span> \
  <span class="tok-flag">-H</span> <span class="tok-str">"x-api-key: YOUR_API_KEY"</span> \
  <span class="tok-flag">-d</span> <span class="tok-str">'{
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Authorize transaction of GHS 50.00 to Merchant? 1. Yes 2. No"</span>
  }'</span></code></pre>
                  </div>
                  <div class="tab-pane fade" id="tab-js-ussd-push" role="tabpanel">
                    <pre><code><span class="tok-kwd">const</span> response = <span class="tok-kwd">await</span> <span class="tok-fn">fetch</span>(<span class="tok-str">'https://api.pave360.com/api/external/ussd/send'</span>, {
  method: <span class="tok-str">'POST'</span>,
  headers: {
    <span class="tok-str">'x-api-key'</span>: <span class="tok-str">'YOUR_API_KEY'</span>,
    <span class="tok-str">'Content-Type'</span>: <span class="tok-str">'application/json'</span>
  },
  body: JSON.<span class="tok-fn">stringify</span>({
    phone_number: <span class="tok-str">'+233241234567'</span>,
    message: <span class="tok-str">'Authorize transaction of GHS 50.00? 1 to Confirm'</span>
  })
});
<span class="tok-kwd">const</span> data = <span class="tok-kwd">await</span> response.<span class="tok-fn">json</span>();</code></pre>
                  </div>
                  <div class="tab-pane fade" id="tab-py-ussd-push" role="tabpanel">
                    <pre><code><span class="tok-kwd">import</span> requests

url = <span class="tok-str">"https://api.pave360.com/api/external/ussd/send"</span>
payload = {
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"message"</span>: <span class="tok-str">"Authorize transaction of GHS 50.00? 1 to Confirm"</span>
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
              <div id="code-box-res-ussd-push" class="code-box-wrapper shadow-sm">
                <div class="code-box-header d-flex align-items-center">
                  <div class="d-flex align-items-center gap-2">
                    <span class="status-pill status-200">200 OK</span>
                    <span class="text-white-50 small font-monospace">application/json</span>
                  </div>
                </div>
                <button 
                  type="button" 
                  class="copy-code-btn" 
                  :class="{ 'copied': copiedKey === 'res-ussd-push' }" 
                  @click="copyActiveTabCode('code-box-res-ussd-push', 'res-ussd-push')"
                  title="Copy response JSON"
                >
                  <i :class="copiedKey === 'res-ussd-push' ? 'bi bi-check2 text-success' : 'bi bi-clipboard'"></i>
                  <span>{{ copiedKey === 'res-ussd-push' ? 'Copied!' : 'Copy' }}</span>
                </button>
                <pre><code>{
  <span class="tok-prop">"status"</span>: <span class="tok-str">"success"</span>,
  <span class="tok-prop">"code"</span>: <span class="tok-str">"EXT_SYS4_008"</span>,
  <span class="tok-prop">"message"</span>: <span class="tok-str">"USSD push prompt dispatched successfully"</span>,
  <span class="tok-prop">"data"</span>: {
    <span class="tok-prop">"session_id"</span>: <span class="tok-str">"ussd_ses_9941a82"</span>,
    <span class="tok-prop">"phone_number"</span>: <span class="tok-str">"+233241234567"</span>,
    <span class="tok-prop">"dispatched_at"</span>: <span class="tok-str">"2026-09-13T11:45:00Z"</span>
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- Response Formats & Best Practices -->
    <section id="ussd-response" class="doc-section mb-5">
      <h2 class="h3 mb-4 text-dark border-bottom pb-2"><i class="bi bi-file-code me-2 text-primary"></i>Response Formats & Actions</h2>
      <div class="glass-panel p-4 mb-4">
        <p class="text-secondary">Your USSD webhook handler must return an HTTP 200 response with an <code>action</code> flag indicating whether to continue or terminate the active session:</p>
        <div class="row g-4 mt-1">
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3 border h-100">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-success">CON</span>
                <span class="fw-bold text-dark">Continue Session</span>
              </div>
              <p class="small text-secondary mb-2">Prompts the subscriber with text and leaves the radio channel open for input response.</p>
              <pre class="m-0 p-2 bg-dark rounded text-light" style="font-size: 0.75rem;"><code>{ "action": "CON", "message": "Enter your 4-digit PIN:" }</code></pre>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3 border h-100">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-danger">END</span>
                <span class="fw-bold text-dark">Terminate Session</span>
              </div>
              <p class="small text-secondary mb-2">Displays a final confirmation message and immediately releases carrier radio resources.</p>
              <pre class="m-0 p-2 bg-dark rounded text-light" style="font-size: 0.75rem;"><code>{ "action": "END", "message": "Your transaction was successful." }</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices & Pagination -->
    <section id="ussd-best-practices" class="doc-section mb-5">
      <h2 class="h3 mb-4 text-dark border-bottom pb-2"><i class="bi bi-stopwatch me-2 text-primary"></i>Session Timers & Best Practices</h2>
      <div class="glass-panel p-4">
        <h6 class="fw-bold text-dark mb-3"><i class="bi bi-lightbulb text-warning me-2"></i>Production Design Guidelines</h6>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3 border h-100">
              <h6 class="fw-semibold text-dark mb-2"><i class="bi bi-layers text-primary me-1"></i> Pagination for Menus > 160 Characters</h6>
              <p class="small text-secondary mb-0">
                When presenting lists that exceed 160 characters, paginate them into chunks with numeric controls like <code>99. Next</code> and <code>0. Back</code>. Cache the user's current page in Redis with a 60-second TTL keyed by <code>session_id</code>.
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 bg-light rounded-3 border h-100">
              <h6 class="fw-semibold text-dark mb-2"><i class="bi bi-shield-lock text-success me-1"></i> Session State & Security</h6>
              <p class="small text-secondary mb-0">
                Never prompt users for plain-text mobile money PINs on your server. Use USSD for two-factor approval prompts or balance inquiries, and authenticate webhooks with the <code>X-Pave360-Signature</code> header.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
