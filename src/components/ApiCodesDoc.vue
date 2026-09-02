<template>
  <div class="pt-5 mt-2">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h1 class="display-5 fw-bold mb-0 text-dark"><i class="bi bi-tools text-primary me-3"></i>Playground & Diagnostics</h1>
      </div>
    </div>

    <!-- API Sandbox Console -->
    <div id="sandbox" class="pt-4">
      <h2 class="h3 mb-3 text-dark"><i class="bi bi-terminal text-primary me-2"></i>API Sandbox Console</h2>
      <p class="text-secondary mb-4">Execute request calls against the simulated sandbox engine. Test validation rules, success flows, and error headers immediately without billing hits.</p>
      
      <div class="glass-panel p-4 mb-5 border-start border-4 border-primary">
        <div class="row g-4">
          <div class="col-md-6 border-end">
            <h6 class="text-uppercase small fw-bold mb-3 text-dark"><i class="bi bi-sliders me-1"></i> Console Config</h6>
            <div class="mb-3">
              <label class="form-label small text-secondary">Endpoint Method</label>
              <select class="form-select form-select-sm bg-light">
                <option>POST /sms/send</option>
                <option>POST /sms/campaign</option>
                <option>GET /sms/status/:id</option>
                <option>POST /voice/send</option>
                <option>POST /otp/send</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">x-api-key Authentication <span class="text-danger">*</span></label>
              <input type="text" class="form-control form-control-sm bg-light" placeholder="Enter test API key...">
            </div>
            <div class="mb-3">
              <label class="form-label small text-secondary">JSON Request Body Payload</label>
              <textarea class="form-control form-control-sm bg-light font-monospace" rows="4" placeholder="{}"></textarea>
            </div>
            <button class="btn btn-primary btn-sm w-100 fw-bold">Test Endpoint Call <i class="bi bi-play-fill"></i></button>
          </div>
          <div class="col-md-6 bg-light rounded p-3 d-flex flex-column">
            <h6 class="text-uppercase small fw-bold mb-3 text-muted"><i class="bi bi-display me-1"></i> Output Response</h6>
            <div class="flex-grow-1 d-flex align-items-center justify-content-center border rounded border-light bg-white text-center p-4">
              <span class="text-muted small">No response logged yet.<br>Select your API key and hit "Test Endpoint Call" to dispatch simulated requests.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System & Custom Codes -->
    <div id="system-codes" class="pt-5 mt-2">
      <h2 class="h3 mb-3 text-dark"><i class="bi bi-code-square text-primary me-2"></i>System & Custom Codes</h2>
      <p class="text-secondary mb-5">
        Pave360 outputs unique transactional codes inside responses to allow client systems to quickly categorize validations, authorizations, database states, and successes.
      </p>

      <!-- Categories Summary -->
      <div class="row g-4 mb-5">
        <div class="col-6 col-md-3">
          <div class="glass-panel text-center p-3 h-100 border-top border-4 border-success">
            <div class="fw-bold mb-1 text-dark">Success</div>
            <div class="small text-secondary font-monospace">SYS4</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="glass-panel text-center p-3 h-100 border-top border-4 border-warning">
            <div class="fw-bold mb-1 text-dark">Validation</div>
            <div class="small text-secondary font-monospace">VAL2</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="glass-panel text-center p-3 h-100 border-top border-4 border-danger">
            <div class="fw-bold mb-1 text-dark">Auth</div>
            <div class="small text-secondary font-monospace">AUTH2</div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="glass-panel text-center p-3 h-100 border-top border-4 border-info">
            <div class="fw-bold mb-1 text-dark">Database</div>
            <div class="small text-secondary font-monospace">DB1</div>
          </div>
        </div>
      </div>

      <div class="glass-panel overflow-hidden mb-5">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th class="py-3 px-4 text-muted fw-semibold text-uppercase small border-bottom-0">Code ID</th>
                <th class="py-3 px-4 text-muted fw-semibold text-uppercase small border-bottom-0">Category</th>
                <th class="py-3 px-4 text-muted fw-semibold text-uppercase small border-bottom-0">Context</th>
                <th class="py-3 px-4 text-muted fw-semibold text-uppercase small border-bottom-0">Meaning / Description</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <!-- Success Codes -->
              <tr><td class="px-4 py-3 font-monospace text-primary fw-bold">EXT_SYS4_001</td><td class="px-4 py-3"><span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">SUCCESS</span></td><td class="px-4 py-3 text-secondary small">SMS</td><td class="px-4 py-3 text-secondary small">SMS sent successfully. Created temporary campaign and added recipient to contact queue.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-primary fw-bold">EXT_SYS4_002</td><td class="px-4 py-3"><span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">SUCCESS</span></td><td class="px-4 py-3 text-secondary small">SMS</td><td class="px-4 py-3 text-secondary small">SMS campaign created and queued successfully.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-primary fw-bold">EXT_SYS4_003</td><td class="px-4 py-3"><span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">SUCCESS</span></td><td class="px-4 py-3 text-secondary small">SMS</td><td class="px-4 py-3 text-secondary small">SMS campaign status and statistics retrieved successfully.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-primary fw-bold">EXT_SYS4_004</td><td class="px-4 py-3"><span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">SUCCESS</span></td><td class="px-4 py-3 text-secondary small">Voice</td><td class="px-4 py-3 text-secondary small">Voice call campaign created and queued successfully.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-primary fw-bold">EXT_SYS4_005</td><td class="px-4 py-3"><span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">SUCCESS</span></td><td class="px-4 py-3 text-secondary small">Voice</td><td class="px-4 py-3 text-secondary small">Voice call campaign status and statistics retrieved successfully.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-primary fw-bold">EXT_SYS4_006</td><td class="px-4 py-3"><span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">SUCCESS</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">OTP sent successfully via SMS delivery infrastructure.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-primary fw-bold">EXT_SYS4_007</td><td class="px-4 py-3"><span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">SUCCESS</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">OTP verified successfully. Phone number marked as validated.</td></tr>

              <!-- Validation Codes -->
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_001</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">SMS</td><td class="px-4 py-3 text-secondary small">Validation error: Both phone_numbers and list_id are missing, or both are supplied. Exactly one parameter must be present.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_002</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">SMS</td><td class="px-4 py-3 text-secondary small">SMS Campaign not found or invalid ID passed.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_003</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">SMS</td><td class="px-4 py-3 text-secondary small">Permission denied: The requested SMS campaign belongs to another organization/user accounts.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_004</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">Voice</td><td class="px-4 py-3 text-secondary small">Validation error: Either phone_numbers or list_id is required, or caller_id/audio_url is invalid.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_005</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">Voice</td><td class="px-4 py-3 text-secondary small">Voice campaign not found or invalid ID passed.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_006</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">Voice</td><td class="px-4 py-3 text-secondary small">Permission denied: The requested Voice campaign belongs to another account.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_000</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">General</td><td class="px-4 py-3 text-secondary small">Malformed JSON payload inside HTTP POST request body.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_010</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">Validation error: phone_number is required, missing, or invalid Ghana format.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_011</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">Validation error: invalid OTP, expired OTP, or too many verification failures.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">EXT_VAL2_012</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">Validation error: Sender ID not found or not approved.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">OTP_VAL2_008</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">Insufficient credits to complete transaction. OTP costs 1 unit (0.033 GHS).</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">OTP_VAL2_010</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">Validation error: Invalid expiry (must be 1-10).</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">OTP_VAL2_011</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">Validation error: Invalid length (must be 4-8).</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">OTP_VAL2_012</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">OTP</td><td class="px-4 py-3 text-secondary small">Validation error: Invalid type (must be NUMERIC, ALPHA, or ALPHANUMERIC).</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-warning fw-bold">RATE_LIMIT_001</td><td class="px-4 py-3"><span class="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25">VALIDATION</span></td><td class="px-4 py-3 text-secondary small">General</td><td class="px-4 py-3 text-secondary small">Rate limit exceeded. Default limit is 1000 req/min.</td></tr>

              <!-- Auth Codes -->
              <tr><td class="px-4 py-3 font-monospace text-danger fw-bold">API_KEY_AUTH_001</td><td class="px-4 py-3"><span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">AUTH</span></td><td class="px-4 py-3 text-secondary small">General</td><td class="px-4 py-3 text-secondary small">Unauthorized: No API key provided in request headers.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-danger fw-bold">API_KEY_AUTH_002</td><td class="px-4 py-3"><span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">AUTH</span></td><td class="px-4 py-3 text-secondary small">General</td><td class="px-4 py-3 text-secondary small">Unauthorized: Invalid or expired API key provided.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-danger fw-bold">API_KEY_AUTH_003</td><td class="px-4 py-3"><span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">AUTH</span></td><td class="px-4 py-3 text-secondary small">General</td><td class="px-4 py-3 text-secondary small">Unauthorized: API key has been revoked or is inactive.</td></tr>
              <tr><td class="px-4 py-3 font-monospace text-danger fw-bold">EXT_AUTH2_XXX</td><td class="px-4 py-3"><span class="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25">AUTH</span></td><td class="px-4 py-3 text-secondary small">General</td><td class="px-4 py-3 text-secondary small">Unauthorized: Missing, invalid, or revoked API key supplied in headers.</td></tr>

              <!-- DB Codes -->
              <tr><td class="px-4 py-3 font-monospace text-info fw-bold">EXT_DB1_XXX</td><td class="px-4 py-3"><span class="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25">DATABASE</span></td><td class="px-4 py-3 text-secondary small">General</td><td class="px-4 py-3 text-secondary small">Database transaction failure or internal write error. Recommended action: retry.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
