<template>
  <div class="pt-4">
    
    <!-- API Overview -->
    <div id="overview" class="pt-2">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <span class="badge bg-light text-dark mb-2 border border-secondary border-opacity-25 rounded-pill px-3 py-2 fw-semibold">Implementation Guide</span>
          <h1 class="display-5 fw-bold mb-0 text-dark"><i class="bi bi-book text-primary me-2"></i>API Overview</h1>
        </div>
      </div>
      <p class="lead text-secondary mb-5">
        The Pave360 External API enables software developers to programmatically dispatch SMS notifications, deploy broadcast voice messaging campaigns, and query delivery status updates in real-time. Use this document to authenticate clients, manage quotas, and wire events back to your backend.
      </p>
    </div>

    <!-- Base URL -->
    <div id="base-url" class="pt-5 mt-2">
      <div class="glass-panel p-4 mb-5">
        <h3 class="h4 mb-3 text-dark"><i class="bi bi-globe text-primary me-2"></i>Base Service Endpoint</h3>
        <p class="text-secondary">All resource queries and transaction requests must be issued through HTTPS targeting the following base URL root path:</p>
        <div class="bg-light rounded p-3 font-monospace border d-flex align-items-center flex-wrap" style="word-break: break-all;">
          <span class="text-primary fw-bold me-2">GET/POST</span> <span class="text-dark">https://api.pave360.com/api/external</span>
        </div>
      </div>
    </div>

    <!-- Authentication -->
    <div id="authentication" class="pt-5 mt-2">
      <h2 class="h3 mb-4 text-dark"><i class="bi bi-key text-primary me-2"></i>Authentication & API Key Properties</h2>
      <p class="text-secondary mb-4">
        Pass your active API credential inside the HTTP Header named <code class="text-dark fw-bold">x-api-key</code> on all HTTP requests.
      </p>

      <div class="glass-panel overflow-hidden mb-5">
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle">
            <thead class="table-light">
              <tr>
                <th class="py-3 px-4 text-muted fw-semibold text-uppercase small">Field</th>
                <th class="py-3 px-4 text-muted fw-semibold text-uppercase small">Type</th>
                <th class="py-3 px-4 text-muted fw-semibold text-uppercase small">Description</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              <tr>
                <td class="px-4 py-3"><code class="text-primary fw-bold">key</code></td>
                <td class="px-4 py-3 text-secondary small">string</td>
                <td class="px-4 py-3 text-secondary">The cryptographically unique secret API token value.</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-primary fw-bold">name</code></td>
                <td class="px-4 py-3 text-secondary small">string</td>
                <td class="px-4 py-3 text-secondary">A descriptive human-readable name assigned to differentiate tokens.</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-primary fw-bold">rate_limit</code></td>
                <td class="px-4 py-3 text-secondary small">integer</td>
                <td class="px-4 py-3 text-secondary">Allowed capacity throttling (maximum permitted calls per minute).</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-primary fw-bold">is_active</code></td>
                <td class="px-4 py-3 text-secondary small">boolean</td>
                <td class="px-4 py-3 text-secondary">Shows true if the key status is active and verified for routing.</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-primary fw-bold">created_at</code></td>
                <td class="px-4 py-3 text-secondary small">timestamp</td>
                <td class="px-4 py-3 text-secondary">ISO DateTime value showing when this API key was generated.</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-primary fw-bold">last_used_at</code></td>
                <td class="px-4 py-3 text-secondary small">timestamp</td>
                <td class="px-4 py-3 text-secondary">ISO DateTime value showing the last time a transaction hit this key.</td>
              </tr>
              <tr>
                <td class="px-4 py-3"><code class="text-primary fw-bold">usage_count</code></td>
                <td class="px-4 py-3 text-secondary small">integer</td>
                <td class="px-4 py-3 text-secondary">Cumulative metric for the sum of calls logged using this specific token.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row g-4 mb-5">
        <div class="col-md-6">
          <div class="glass-panel p-4 h-100 border-start border-4 border-warning">
            <h4 class="h5 mb-3 d-flex align-items-center gap-2 text-dark">
              <i class="bi bi-shield-lock text-warning"></i>
              Security Guidelines
            </h4>
            <ul class="text-secondary small ps-3 mb-0">
              <li class="mb-2"><strong class="text-dark">API Key Storage:</strong> Never commit secrets to code repositories or expose keys inside client-side bundles. Store keys in secure backend vault files.</li>
              <li class="mb-2"><strong class="text-dark">Key Masking:</strong> Always mask API keys in user interfaces. Show only the leading chars (first 8 prefix characters) and suffix values.</li>
              <li><strong class="text-dark">HTTPS Protocols:</strong> All transaction dispatches must utilize Transport Layer Security (HTTPS). Plain HTTP transfers are rejected.</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="glass-panel p-4 h-100 border-start border-4 border-info">
            <h4 class="h5 mb-3 d-flex align-items-center gap-2 text-dark">
              <i class="bi bi-journal-code text-info"></i>
              Development Notes
            </h4>
            <ul class="text-secondary small ps-3 mb-0">
              <li class="mb-2"><strong class="text-dark">Country Code Formatting:</strong> Phone numbers must follow complete E.164 specifications (e.g. +233241234567).</li>
              <li class="mb-2"><strong class="text-dark">Sandbox Testing:</strong> Utilize sandbox mode within the testing panel block to simulate failure routes without billing hits.</li>
              <li><strong class="text-dark">Contact Register:</strong> Single dispatch endpoints automatically create directory contact rows if no records matches during execution.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
