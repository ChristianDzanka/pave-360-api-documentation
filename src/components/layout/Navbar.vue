<script setup>
// Navbar is pure presentation.
// Mobile menu toggle uses Bootstrap offcanvas (data-bs-target="#mobileSidebar")
// Credentials button uses Bootstrap modal (data-bs-target="#credentialsModal")
</script>

<template>
  <header class="sticky-top pave-main-header">
    <nav class="navbar navbar-expand-lg py-3 pave-main-nav" aria-label="Top Navigation">
      <div class="pave-nav-container d-flex justify-content-between align-items-center">
        <!-- Hamburger (Mobile only) -->
        <button 
          class="btn nav-icon-btn d-lg-none p-0 text-white-50" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#mobileSidebar" 
          aria-controls="mobileSidebar"
          aria-label="Open mobile navigation"
        >
          <i class="bi bi-list fs-3"></i>
        </button>

        <!-- Brand Logo -->
        <a class="navbar-brand d-flex align-items-center fw-bold mx-md-0 mobile-logo-center" href="/">
          <img src="/assets/img/logo/logo6a.png" alt="Pave360" height="28" class="me-2 d-md-none" style="object-fit: contain;">
          <img src="/assets/img/logo/logo-pave.png" alt="Pave360" height="32" class="me-2 d-none d-md-inline" style="object-fit: contain;">
          <span class="text-white d-md-none" style="letter-spacing: -0.5px; font-size: 1.1rem;">Pave360 <span class="text-white-50 fw-normal">Developers</span></span>
          <span class="text-white fs-5 d-none d-md-inline" style="letter-spacing: -0.5px;">Developers</span>
        </a>
        
        <!-- Right side actions -->
        <div class="d-flex align-items-center gap-2 gap-md-3">
          <!-- Search Bar -->
          <div class="input-group d-none d-lg-flex search-bar-wrapper">
            <span class="input-group-text search-addon">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" class="form-control search-input" placeholder="Search documentation..." aria-label="Search">
            <span class="input-group-text search-addon-end">
              <kbd class="search-kbd">⌘K</kbd>
            </span>
          </div>

          <!-- Settings / Credentials Trigger Icon -->
          <button 
            class="btn nav-icon-btn ms-md-2" 
            title="Configure Credentials" 
            data-bs-toggle="modal" 
            data-bs-target="#credentialsModal"
            aria-label="Configure Credentials"
          >
            <i class="bi bi-gear-fill"></i>
          </button>

          <div class="vr mx-2 text-white-50 d-none d-md-block opacity-25"></div>

          <!-- External Portal Links -->
          <a href="https://app.pave360.com/auth/signin" class="nav-login-link d-none d-md-inline-block px-2">Log In</a>
          <a href="https://app.pave360.com/auth/signup" class="nav-get-started-btn d-none d-md-inline-flex">
            Get Started <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>
