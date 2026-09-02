<script setup>
</script>

<template>
  <div class="pt-5 mt-2">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h1 class="display-5 fw-bold mb-0 text-dark"><i class="bi bi-diagram-3 text-primary me-3"></i>Endpoints</h1>
      </div>
    </div>

    <!-- SMS Endpoints -->
    <h2 class="h3 mb-4 mt-5 text-dark border-bottom pb-2"><i class="bi bi-chat-text text-primary me-2"></i>SMS Services</h2>
    
    <!-- Send Single Transactional SMS -->
    <div id="sms-send" class="glass-panel p-5 mb-5 pt-5 mt-n5">
      <div class="row gx-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-success">POST</span>
            <h4 class="h4 mb-0 text-dark">/sms/send</h4>
          </div>
          <p class="text-secondary lead">Send Single Transactional SMS. Dispatches a single SMS to an absolute phone number. This endpoint automatically registers contacts in the background if their record does not match a verified contact. A micro campaign reference is constructed for audit trails.</p>
          
          <h6 class="text-uppercase small fw-bold mt-5 mb-3 text-dark">Body Payload Fields</h6>
          <ul class="list-group list-group-flush mb-0">
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">phone_number</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">message</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-bottom-0 py-3">
              <code class="text-primary fw-bold me-2">sender_id</code> <small class="ms-2">string</small>
            </li>
          </ul>
        </div>
        
        <div class="col-xl-6">
          <div class="mb-4">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark">Example Request</h6>
            <div class="shadow-sm rounded-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-sms-send" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-sms-send" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-sms-send" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-sms-send" role="tabpanel">
                  <pre><code>// Send Single SMS
const triggerAction = async (apiKey, payload) => {
  const response = await fetch('https://api.pave360.com/api/external/sms/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify(payload)
  });
  return await response.json();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-sms-send" role="tabpanel">
                  <pre><code>curl -X POST https://api.pave360.com/api/external/sms/send \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "phone_number": "+233241234567",
    "message": "Hello World",
    "sender_id": "Pave360"
  }'</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-sms-send" role="tabpanel">
                  <pre><code>import requests

url = "https://api.pave360.com/api/external/sms/send"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
}
payload = {
    "phone_number": "+233241234567",
    "message": "Hello World",
    "sender_id": "Pave360"
}
response = requests.post(url, json=payload, headers=headers)
print(response.json())</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Deploy Bulk SMS Campaign -->
    <div id="sms-campaign" class="glass-panel p-5 mb-5 pt-5 mt-n5">
      <div class="row gx-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-success">POST</span>
            <h4 class="h4 mb-0 text-dark">/sms/campaign</h4>
          </div>
          <p class="text-secondary lead">Deploy Bulk SMS Campaign. Dispatches a bulk text broadcast campaign to multiple phone numbers or a database list reference.</p>
          <div class="alert alert-info py-3 border-0 bg-info bg-opacity-10 rounded-3 mb-4">
            <div class="d-flex gap-2">
              <i class="bi bi-info-circle-fill text-info mt-1"></i>
              <div><strong>Notice:</strong> Either the <code>phone_numbers</code> comma-list OR a <code>list_id</code> integer must be supplied. Giving both or none returns validation errors.</div>
            </div>
          </div>
          
          <h6 class="text-uppercase small fw-bold mt-5 mb-3 text-dark">Body Payload Fields</h6>
          <ul class="list-group list-group-flush mb-0">
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">name</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">message</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">phone_numbers</code> <small class="ms-2">string (comma-list)</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-bottom-0 py-3">
              <code class="text-primary fw-bold me-2">list_id</code> <small class="ms-2">integer</small>
            </li>
          </ul>
        </div>
        
        <div class="col-xl-6">
          <div class="mb-4">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark">Example Request</h6>
            <div class="shadow-sm rounded-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-sms-camp" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-sms-camp" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-sms-camp" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-sms-camp" role="tabpanel">
                  <pre><code>// Deploy Bulk SMS Campaign
const triggerAction = async (apiKey, payload) => {
  const response = await fetch('https://api.pave360.com/api/external/sms/campaign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify(payload)
  });
  return await response.json();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-sms-camp" role="tabpanel">
                  <pre><code>curl -X POST https://api.pave360.com/api/external/sms/campaign \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "name": "Holiday Promo",
    "message": "Merry Christmas!",
    "phone_numbers": "+233241234567,+233247654321"
  }'</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-sms-camp" role="tabpanel">
                  <pre><code>import requests

url = "https://api.pave360.com/api/external/sms/campaign"
payload = {
    "name": "Holiday Promo",
    "message": "Merry Christmas!",
    "phone_numbers": "+233241234567,+233247654321"
}
response = requests.post(url, json=payload, headers={"x-api-key": "YOUR_API_KEY"})
print(response.json())</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Query SMS Campaign Status -->
    <div id="sms-status" class="glass-panel p-5 mb-5 pt-5 mt-n5">
      <div class="row gx-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-info">GET</span>
            <h4 class="h4 mb-0 text-dark">/sms/status/:id</h4>
          </div>
          <p class="text-secondary lead">Query SMS Campaign Status. Returns database metrics showing processed logs, failed counts, pending items, and total message recipient targets.</p>
          
          <h6 class="text-uppercase small fw-bold mt-5 mb-3 text-dark">Path Parameters</h6>
          <ul class="list-group list-group-flush mb-0">
            <li class="list-group-item text-secondary px-0 bg-transparent border-bottom-0 py-3">
              <code class="text-primary fw-bold me-2">id</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">integer</small>
            </li>
          </ul>
        </div>

        <div class="col-xl-6">
          <div class="mb-4">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark">Example Request</h6>
            <div class="shadow-sm rounded-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-sms-stat" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-sms-stat" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-sms-stat" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-sms-stat" role="tabpanel">
                  <pre><code>// Get Campaign Status
const getStatus = async (apiKey, id) => {
  const response = await fetch(`https://api.pave360.com/api/external/sms/status/${id}`, {
    method: 'GET',
    headers: { 'x-api-key': apiKey }
  });
  return await response.json();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-sms-stat" role="tabpanel">
                  <pre><code>curl -X GET https://api.pave360.com/api/external/sms/status/12345 \
  -H "x-api-key: YOUR_API_KEY"</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-sms-stat" role="tabpanel">
                  <pre><code>import requests

url = "https://api.pave360.com/api/external/sms/status/12345"
response = requests.get(url, headers={"x-api-key": "YOUR_API_KEY"})
print(response.json())</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Voice Endpoints -->
    <h2 class="h3 mb-4 mt-5 text-dark border-bottom pb-2"><i class="bi bi-mic text-primary me-2"></i>Voice Services</h2>

    <!-- Create Voice Campaign -->
    <div id="voice-send" class="glass-panel p-5 mb-5 pt-5 mt-n5">
      <div class="row gx-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-success">POST</span>
            <h4 class="h4 mb-0 text-dark">/voice/send</h4>
          </div>
          <p class="text-secondary lead">Create Voice Campaign. Dispatches synthesized audio content or custom media audio files to phone numbers.</p>
          <div class="alert alert-warning py-3 border-0 bg-warning bg-opacity-10 rounded-3 mb-4">
            <div class="d-flex gap-2 text-dark">
              <i class="bi bi-exclamation-triangle-fill text-warning mt-1"></i>
              <div><strong>Media constraints:</strong> Custom recordings must match WAV structure: mono, 8kHz, a-law format, 64kbps bit-rate.</div>
            </div>
          </div>
          
          <h6 class="text-uppercase small fw-bold mt-5 mb-3 text-dark">Body Payload Fields</h6>
          <ul class="list-group list-group-flush mb-0">
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">name</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">caller_id</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">audio_url</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string (http/https url)</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">phone_numbers</code> <small class="ms-2">string (comma-list)</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-bottom-0 py-3">
              <code class="text-primary fw-bold me-2">list_id</code> <small class="ms-2">integer</small>
            </li>
          </ul>
        </div>
        
        <div class="col-xl-6">
          <div class="mb-4">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark">Example Request</h6>
            <div class="shadow-sm rounded-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-voice-send" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-voice-send" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-voice-send" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-voice-send" role="tabpanel">
                  <pre><code>// Create Voice Campaign
const triggerAction = async (apiKey, payload) => {
  const response = await fetch('https://api.pave360.com/api/external/voice/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify(payload)
  });
  return await response.json();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-voice-send" role="tabpanel">
                  <pre><code>curl -X POST https://api.pave360.com/api/external/voice/send \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "name": "Reminder Call",
    "caller_id": "+233240000000",
    "audio_url": "https://example.com/audio.wav",
    "phone_numbers": "+233241234567"
  }'</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-voice-send" role="tabpanel">
                  <pre><code>import requests

url = "https://api.pave360.com/api/external/voice/send"
payload = {
    "name": "Reminder Call",
    "caller_id": "+233240000000",
    "audio_url": "https://example.com/audio.wav",
    "phone_numbers": "+233241234567"
}
response = requests.post(url, json=payload, headers={"x-api-key": "YOUR_API_KEY"})
print(response.json())</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Query Voice Campaign Status -->
    <div id="voice-status" class="glass-panel p-5 mb-5 pt-5 mt-n5">
      <div class="row gx-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-info">GET</span>
            <h4 class="h4 mb-0 text-dark">/voice/status/:id</h4>
          </div>
          <p class="text-secondary lead">Query Voice Campaign Status. Returns delivery status, contact statistics, and processing details for an active voice call campaign.</p>
          <h6 class="text-uppercase small fw-bold mt-5 mb-3 text-dark">Path Parameters</h6>
          <ul class="list-group list-group-flush mb-0">
            <li class="list-group-item text-secondary px-0 bg-transparent border-bottom-0 py-3">
              <code class="text-primary fw-bold me-2">id</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">integer</small>
            </li>
          </ul>
        </div>
        
        <div class="col-xl-6">
          <div class="mb-4">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark">Example Request</h6>
            <div class="shadow-sm rounded-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-voice-stat" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-voice-stat" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-voice-stat" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-voice-stat" role="tabpanel">
                  <pre><code>// Get Voice Campaign Status
const getStatus = async (apiKey, id) => {
  const response = await fetch(`https://api.pave360.com/api/external/voice/status/${id}`, {
    method: 'GET',
    headers: { 'x-api-key': apiKey }
  });
  return await response.json();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-voice-stat" role="tabpanel">
                  <pre><code>curl -X GET https://api.pave360.com/api/external/voice/status/12345 \
  -H "x-api-key: YOUR_API_KEY"</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-voice-stat" role="tabpanel">
                  <pre><code>import requests

url = "https://api.pave360.com/api/external/voice/status/12345"
response = requests.get(url, headers={"x-api-key": "YOUR_API_KEY"})
print(response.json())</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- OTP Endpoints -->
    <h2 class="h3 mb-4 mt-5 text-dark border-bottom pb-2"><i class="bi bi-shield-lock text-primary me-2"></i>OTP Services</h2>

    <!-- Send OTP -->
    <div id="otp-send" class="glass-panel p-5 mb-5 pt-5 mt-n5">
      <div class="row gx-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-success">POST</span>
            <h4 class="h4 mb-0 text-dark">/otp/send</h4>
          </div>
          <p class="text-secondary lead">Send Configurable One-Time Password. Dispatches a configurable OTP code to a specified mobile phone number. Character types, length, expiry, custom templates, and sender ID can be fully customized.</p>
          
          <h6 class="text-uppercase small fw-bold mt-5 mb-3 text-dark">Body Payload Fields</h6>
          <ul class="list-group list-group-flush mb-0">
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">phone_number</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">expiry</code> <small class="ms-2">integer (1-10)</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">length</code> <small class="ms-2">integer (4-8)</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">type</code> <small class="ms-2">string (NUMERIC/ALPHA/ALPHANUMERIC)</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">message</code> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-bottom-0 py-3">
              <code class="text-primary fw-bold me-2">sender_id</code> <small class="ms-2">string</small>
            </li>
          </ul>
        </div>

        <div class="col-xl-6">
          <div class="mb-4">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark">Example Request</h6>
            <div class="shadow-sm rounded-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-otp-send" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-otp-send" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-otp-send" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-otp-send" role="tabpanel">
                  <pre><code>// Send OTP
const triggerAction = async (apiKey, payload) => {
  const response = await fetch('https://api.pave360.com/api/external/otp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify(payload)
  });
  return await response.json();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-otp-send" role="tabpanel">
                  <pre><code>curl -X POST https://api.pave360.com/api/external/otp/send \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "phone_number": "+233241234567",
    "length": 6,
    "type": "NUMERIC"
  }'</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-otp-send" role="tabpanel">
                  <pre><code>import requests

url = "https://api.pave360.com/api/external/otp/send"
payload = {
    "phone_number": "+233241234567",
    "length": 6,
    "type": "NUMERIC"
}
response = requests.post(url, json=payload, headers={"x-api-key": "YOUR_API_KEY"})
print(response.json())</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Verify OTP -->
    <div id="otp-verify" class="glass-panel p-5 mb-5 pt-5 mt-n5">
      <div class="row gx-5">
        <div class="col-xl-6 mb-4 mb-xl-0">
          <div class="d-flex align-items-center gap-3 mb-4">
            <span class="badge bg-success">POST</span>
            <h4 class="h4 mb-0 text-dark">/otp/verify</h4>
          </div>
          <p class="text-secondary lead">Verify One-Time Password. Verifies a configured OTP code (4-8 characters) sent previously to a phone number. Upon success, the OTP session is marked verified and immediately deleted.</p>
          
          <h6 class="text-uppercase small fw-bold mt-5 mb-3 text-dark">Body Payload Fields</h6>
          <ul class="list-group list-group-flush mb-0">
            <li class="list-group-item text-secondary px-0 bg-transparent border-light py-3">
              <code class="text-primary fw-bold me-2">phone_number</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
            <li class="list-group-item text-secondary px-0 bg-transparent border-bottom-0 py-3">
              <code class="text-primary fw-bold me-2">otp_code</code> <span class="badge bg-danger bg-opacity-10 text-danger ms-2 border border-danger border-opacity-25">Required</span> <small class="ms-2">string</small>
            </li>
          </ul>
        </div>
        
        <div class="col-xl-6">
          <div class="mb-4">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark">Example Request</h6>
            <div class="shadow-sm rounded-4">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-js-otp-ver" type="button" role="tab">JavaScript</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-curl-otp-ver" type="button" role="tab">cURL</button></li>
                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-py-otp-ver" type="button" role="tab">Python</button></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-js-otp-ver" role="tabpanel">
                  <pre><code>// Verify OTP
const triggerAction = async (apiKey, payload) => {
  const response = await fetch('https://api.pave360.com/api/external/otp/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify(payload)
  });
  return await response.json();
};</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-curl-otp-ver" role="tabpanel">
                  <pre><code>curl -X POST https://api.pave360.com/api/external/otp/verify \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{
    "phone_number": "+233241234567",
    "otp_code": "123456"
  }'</code></pre>
                </div>
                <div class="tab-pane fade" id="tab-py-otp-ver" role="tabpanel">
                  <pre><code>import requests

url = "https://api.pave360.com/api/external/otp/verify"
payload = {
    "phone_number": "+233241234567",
    "otp_code": "123456"
}
response = requests.post(url, json=payload, headers={"x-api-key": "YOUR_API_KEY"})
print(response.json())</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
