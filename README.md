# Pave360 API Documentation

[![Version](https://img.shields.io/badge/Version-1.1.0-059669?style=flat-square)](#recent-updates--changelog)
[![Vue 3](https://img.shields.io/badge/Vue-3.5.41-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![AWS S3](https://img.shields.io/badge/Deploy-AWS%20S3-FF9900?style=flat-square&logo=amazon-s3&logoColor=white)](https://aws.amazon.com/s3/)
[![License](https://img.shields.io/badge/License-Proprietary-0A2828?style=flat-square)](#license)

Official developer documentation and interactive API portal for **Pave360** — a carrier-grade telecommunications and identity infrastructure platform providing high-throughput SMS, Voice broadcasting, USSD interactive sessions, and One-Time Password (OTP) verification across Ghanaian and African telecom networks (MTN, Telecel, AT).

---

## 📑 Table of Contents

- [Overview](#overview)
- [Recent Updates & Changelog](#recent-updates--changelog)
- [Key Features](#key-features)
- [Architecture & UI Design](#architecture--ui-design)
- [API Catalog](#api-catalog)
  - [Overview & Base URLs](#overview--base-urls)
  - [Messaging APIs (SMS & Voice)](#messaging-apis-sms--voice)
  - [USSD APIs](#ussd-apis)
  - [Authentication & OTP APIs](#authentication--otp-apis)
  - [Interactive Playground & Diagnostics](#interactive-playground--diagnostics)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
  - [Local Preview](#local-preview)
- [CI/CD & Deployment](#cicd--deployment)
- [Component Architecture](#component-architecture)
- [Styling & Design System](#styling--design-system)
- [License & Support](#license--support)

---

## Overview

The Pave360 API Documentation portal provides developers with an intuitive, modern, and comprehensive reference to integrate telecommunication services into web, mobile, and backend systems.

Built with **Vue 3** and **Vite**, the interface delivers high performance, zero-friction navigation, and an interactive developer experience inspired by modern API reference benchmarks (e.g. Moolre, Stripe).

---

## Recent Updates & Changelog

### 🚀 Version 1.1.0 (September 2026) — Mobile Dual-Navigation & Glassmorphism Upgrade

This update introduces a redesigned mobile navigation system that brings full feature parity with the desktop experience while preserving vertical screen real estate:

- **Header-Attached Glassmorphic Table of Contents (TOC)**:
  - **Translucent Frosted Glass**: Ultra-slim 38px sticky bar (`rgba(10, 40, 40, 0.72)` with `backdrop-filter: blur(20px) saturate(180%)`), allowing underlying page content to remain softly visible as you scroll.
  - **Compact Floating Island Card**: Replaced edge-to-edge full-screen blackout sheets with a floating rounded glass dropdown (`border-radius: 12px`, side margins, `max-height: 45vh`).
  - **Non-Intrusive Backdrop**: Subtle transparent overlay (`rgba(0, 0, 0, 0.15)`) keeping the reading surface bright, legible, and unobscured.
  - **Real-Time Scroll-Spy Sync**: Automatically tracks current reading position and displays color-coded HTTP method badges (`POST` in green, `GET` in blue).
  - **Calibrated Scroll Offsets**: Smooth anchor jumping calibrated for 64px phone and 80px tablet sticky navigation bars.

- **Persistent Mobile Hamburger Drawer with Single-Accordion**:
  - **Deep Hierarchy Browsing**: Categorized section structure (**Getting Started**, **Endpoints**, **Developer Tools**) with nested endpoint submenus and method tags.
  - **Auto-Collapsing Accordion**: Tapping another section or its chevron smoothly expands that section while auto-collapsing previous submenus, keeping the drawer compact.
  - **Persistent In-Drawer Browsing**: The sidebar remains open while tapping between sections or previewing endpoints, only closing when explicitly tapping the `[X]` close button or outside on the backdrop.

- **Client-Side Cache & Deployment Auto-Reload**:
  - Real-time build timestamp detection (`version.json`) automatically prompts or refreshes stale browser tabs upon AWS S3 / CloudFront deployment.

---

## Key Features

- **Three-Column Layout**: Fixed primary navigation on the left, centered dynamic API specification container, and contextual sub-navigation on the right.
- **Floating / Sticky Sandboxes**: Request and response sandboxes remain pinned on desktop as you scroll through long parameter tables, naturally flowing away when that endpoint reference section completes.
- **Dual Sandboxes for Every Endpoint**:
  - **Request Command Sandbox**: Multi-language tabbed snippets (**JavaScript / fetch**, **cURL**, **Python / requests**) with instant copy-to-clipboard.
  - **Sample Response Sandbox**: Syntax-highlighted response blocks displaying live JSON payloads with HTTP status pills (`200 OK`, `401 Unauthorized`, `422 Validation Error`, etc.).
- **Moolre-Inspired Minimal Specification Format**: Clean, card-based parameter rows showing name, type, required/optional status badges, and description, paired with unified response status-code breakdowns.
- **Credentials Modal**: In-browser credentials modal allowing developers to inject their organization's API key and Sender ID directly into code snippets.
- **Interactive Playground Console**: Simulated in-browser execution environment for testing request payloads, validation rules, and error handling without incurring billing charges.
- **Carrier Diagnostics & Error Catalog**: Comprehensive index of telecom error codes (`EXT_SYS4_*`, `API_KEY_AUTH_*`, `OTP_VAL2_*`, `EXT_VAL2_*`, `RATE_LIMIT_*`) and troubleshooting guidelines.
- **Enhanced Mobile Dual-Navigation**: Fully responsive mobile experience featuring a sticky translucent glassmorphic "On this page" TOC bar, floating quick-jump cards, and a persistent categorized offcanvas drawer with auto-collapsing accordions.

---

## Architecture & UI Design

### Desktop Three-Column Layout (≥ 992px)

```
+---------------------------------------------------------------------------------------+
|  NAVBAR (Sticky Top - 80px)                                                           |
|  [Logo: Pave360 Developers]      [Search: ⌘K]        [Credentials ⚙]  [Log In] [Get Started] |
+---------------------------------------------------------------------------------------+
|  THREE-COLUMN CORE LAYOUT (max-width: 1400px, centered)                               |
|                                                                                       |
|  +--------------------+  +--------------------------------+  +--------------------+  |
|  | LEFT SIDEBAR       |  | CENTER CONTENT CONTAINER       |  | RIGHT SIDEBAR      |  |
|  | (Sticky - 250px)   |  | (Fluid - max 880px)            |  | (Sticky - 240px)   |  |
|  |                    |  |                                |  |                    |  |
|  | - Getting Started  |  |  Endpoint Documentation        |  |  Contextual Sub-Nav|  |
|  |   * Overview       |  |  - Endpoint Headers & URL Chip |  |  - Section Anchors |  |
|  | - Messaging        |  |  - Request Headers (Cards)     |  |  - Active Scroll   |  |
|  |   * SMS            |  |  - Body Parameters (Cards)     |  |    Indicator       |  |
|  |   * Voice          |  |  - Response Breakdown (Cards)  |  |                    |  |
|  | - USSD             |  |                                |  |                    |  |
|  | - Authentication   |  |  +---------------------------+ |  |                    |  |
|  |   * OTPs           |  |  | STICKY DUAL SANDBOXES     | |  |                    |  |
|  | - Tools            |  |  | [Request: JS|cURL|Python] | |  |                    |  |
|  |   * Playground     |  |  | [Response: 200 OK JSON]   | |  |                    |  |
|  |   * Diagnostics    |  |  +---------------------------+ |  |                    |  |
+---------------------------------------------------------------------------------------+
```

### Mobile & Tablet Dual-Navigation Architecture (< 992px)

```
+---------------------------------------------------------------------------------------+
|  NAVBAR (Sticky Top - 64px)                                                           |
|  [☰ Menu]                 Pave360 Developers                         [⚙ Credentials]   |
+---------------------------------------------------------------------------------------+
|  TRANSLUCENT GLASS TOC BAR (Sticky - 38px, Frosted Glass Blur)                        |
|  📑 On this page: Send SMS [POST]                                                 [▾] |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|  (Tap TOC Bar -> Expands Floating Rounded Glass Card, max 45vh)                       |
|  +---------------------------------------------------------------------------------+  |
|  |  MESSAGING — SECTIONS                                                           |  |
|  |  • SMS Guidelines                                                               |  |
|  |  • Send SMS                                                              [POST] |  |
|  |  • Bulk SMS                                                              [POST] |  |
|  |  • SMS Status                                                             [GET] |  |
|  +---------------------------------------------------------------------------------+  |
|                                                                                       |
|  FLUID CENTER CONTENT                                                                 |
|  - Minimal Endpoint Specification Cards                                               |
|  - Stacked Request & Response Code Sandboxes                                          |
+---------------------------------------------------------------------------------------+

  [☰ Menu] Opens Persistent Categorized Offcanvas Drawer:
  ├── GETTING STARTED
  │   └── Overview (• API Overview, • Base Service, • Security)
  ├── ENDPOINTS
  │   ├── ▾ Messaging (• Guidelines, • [POST] SMS, • [POST] Bulk, • [GET] Status)
  │   ├── ▸ USSD (Auto-collapses others when tapped)
  │   └── ▸ Authentication
  └── DEVELOPER TOOLS (Playground, Diagnostics)
```

---

## API Catalog

### Overview & Base URLs

| Environment | Host URL | Usage |
| :--- | :--- | :--- |
| **Production** | `https://api.pave360.com/api/external` | Live carrier routing and real-time dispatches |
| **Sandbox** | `https://sandbox.pave360.com/api/external` | Simulated test transactions without billing hits |

#### Required Headers

```http
Content-Type: application/json
x-api-key: pk_live_xxxxxxxxxxxxxxxxxxxxxxxx
Accept: application/json
```

---

### Messaging APIs (SMS & Voice)

| Method | Endpoint | Description | Component |
| :--- | :--- | :--- | :--- |
| `POST` | `/sms/send` | Dispatches an immediate transactional SMS to a single recipient | `MessagingDoc.vue` |
| `POST` | `/sms/campaign` | Deploys a bulk SMS campaign across multiple recipients or contact lists | `MessagingDoc.vue` |
| `GET` | `/sms/status/:id` | Queries the delivery progress, sent/delivered/failed counts for an SMS campaign | `MessagingDoc.vue` |
| `POST` | `/voice/send` | Initiates automated outbound voice broadcast calls using pre-recorded audio | `MessagingDoc.vue` |
| `GET` | `/voice/status/:id` | Queries call completion rates, answered counts, and call durations | `MessagingDoc.vue` |

#### SMS Telecom Specifications
- **GSM 03.38 (7-bit)**: 160 characters per single message; 153 characters per segment for concatenated messages (7 bytes reserved for UDH).
- **Unicode (UCS-2)**: 70 characters for single message; 67 characters per segment for multi-part messages.
- **Sender ID**: 3 to 11 alphanumeric characters (`A-Z`, `a-z`, `0-9`), no spaces or special characters, requires operator whitelisting.

---

### USSD APIs

| Method | Endpoint | Description | Component |
| :--- | :--- | :--- | :--- |
| `POST` | `/ussd/callback` | Inbound session webhook: Pave360 relays user shortcode input to your server | `UssdDoc.vue` |
| `POST` | `/ussd/send` | Outbound NI-USSD push: dispatches an interactive authorization prompt directly to a handset | `UssdDoc.vue` |

#### Handset Response Protocol
Webhooks respond within carrier session timeout windows (20–30s) using standardized actions:
- `CON`: Continue the session and display another interactive menu.
- `END`: Terminate the session and display a final confirmation message.

---

### Authentication & OTP APIs

| Method | Endpoint | Description | Component |
| :--- | :--- | :--- | :--- |
| `POST` | `/otp/send` | Generates and sends a high-priority numeric/alphanumeric verification code | `AuthEndpointsDoc.vue` |
| `POST` | `/otp/verify` | Validates a user-submitted OTP against active verification sessions | `AuthEndpointsDoc.vue` |

#### Security Parameters
- Standard expiration window: **5 minutes** (customizable via `expiry`).
- Code length: **4 to 8 digits** (default: `6`).
- Automatic replay protection: codes are invalidated immediately upon successful verification or expiry.

---

### Interactive Playground & Diagnostics

- **Playground Console** (`PlaygroundDoc.vue`): Select endpoints, modify payload parameters, and trigger mock responses in real time.
- **Diagnostics Catalog** (`DiagnosticsDoc.vue`):
  - Telecom Error Code Reference (`EXT_SYS4_*`, `API_KEY_AUTH_*`, `OTP_VAL2_*`, `EXT_VAL2_*`, `RATE_LIMIT_*`).
  - HTTP Status mapping (`200`, `400`, `401`, `402`, `403`, `404`, `422`, `429`, `500`).
  - Network latency benchmarks across Ghanaian telcos (MTN, Telecel, AT).
  - Pre-flight launch checklist.

---

## Project Structure

```
pave-360-api-documentation/
├── .github/
│   └── workflows/
│       └── main.yml              # CI/CD deployment pipeline to AWS S3
├── public/
│   ├── assets/
│   │   └── img/
│   │       └── logo/             # Pave360 branding assets & logos
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── main.css              # Global styles, variables, typography, layout, sandboxes
│   │   └── base.css              # CSS resets & base styles
│   ├── components/
│   │   ├── AuthEndpointsDoc.vue  # OTP generation & verification endpoints
│   │   ├── DiagnosticsDoc.vue    # Telecom error catalog & operational checklist
│   │   ├── MessagingDoc.vue      # SMS, Bulk SMS, and Voice services
│   │   ├── OverviewDoc.vue       # Getting started, base URLs, auth, and envelopes
│   │   ├── PlaygroundDoc.vue     # Interactive API sandbox console
│   │   └── UssdDoc.vue           # Inbound callback & outbound USSD push
│   ├── App.vue                   # Core layout orchestration, navbar, sidebars, modals
│   └── main.js                   # Application entry point & Bootstrap imports
├── index.html                    # HTML shell & font definitions
├── package.json                  # Dependencies & npm scripts
├── vite.config.js                # Vite build tool configuration
└── README.md                     # Project documentation
```

---

## Getting Started

### Prerequisites

- **Node.js**: Version `20.x` or `22.x` recommended (LTS)
- **npm**: Version `9.x` or higher

### Installation

Clone the repository and install project dependencies:

```bash
# Clone the repository
git clone https://github.com/ChristianDzanka/pave-360-api-documentation.git

# Enter the project directory
cd pave-360-api-documentation

# Install dependencies
npm install
```

### Development Server

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

Compile and optimize assets for production:

```bash
npm run build
```

Production output will be generated in the `dist/` directory.

### Local Preview

Preview the production build locally:

```bash
npm run preview
```

---

## CI/CD & Deployment

The project includes an automated deployment pipeline configured via **GitHub Actions** (`.github/workflows/main.yml`).

### Deployment Flow

1. **Trigger**: Pushes to `main` or `dev` branches.
2. **Build**: Checks out code on `ubuntu-latest`, provisions Node.js 22, installs dependencies via `npm ci`, and executes `npm run build`.
3. **Environment Selection**:
   - `main` branch: Targets the production AWS S3 bucket (`AWS_APP_PAVE360_BUCKET`) and CloudFront distribution (`AWS_CLOUDFRONT_DISTRIBUTION_ID`).
   - `dev` branch: Targets the development AWS S3 bucket (`AWS_APP_PAVE360_BUCKET_DEV`) and CloudFront distribution (`AWS_CLOUDFRONT_DISTRIBUTION_ID_DEV`).
4. **Multi-Layer Cache Invalidation on Deploy**:
   - **Immutable Asset Sync**: All hashed JS, CSS, images, and fonts are synced with `Cache-Control: public, max-age=31536000, immutable`.
   - **No-Cache HTML & Version Manifest**: `index.html` and `version.json` are uploaded with `Cache-Control: no-cache, no-store, must-revalidate, max-age=0`.
   - **CloudFront CDN Cache Purge**: If distribution ID is provided, automatically executes `aws cloudfront create-invalidation --paths "/*"`.
   - **Client Auto-Refresh**: The frontend client listens for new deployment timestamps on tab focus and refreshes stale tabs automatically.

### Required GitHub Secrets

| Secret Name | Description | Required? |
| :--- | :--- | :--- |
| `AWS_APP_PAVE360_BUCKET` | Production AWS S3 bucket name | Yes |
| `AWS_APP_PAVE360_BUCKET_DEV` | Development AWS S3 bucket name | Yes |
| `AWS_APP_PAVE360_ACCESS_KEY` | AWS IAM Access Key ID | Yes |
| `AWS_APP_PAVE360_SECRET` | AWS IAM Secret Access Key | Yes |
| `AWS_APP_PAVE360_REGION` | AWS Region (e.g. `eu-west-1`, `us-east-1`) | Yes |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | Production CloudFront Distribution ID for edge cache invalidation | Optional |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID_DEV` | Development CloudFront Distribution ID for edge cache invalidation | Optional |
| `VITE_BASE_URL` | Base API endpoint for the deployment | Optional |

---

## Component Architecture

Each documentation section is built as an isolated, high-performance Vue 3 Single File Component (SFC):

| Component | Responsibility |
| :--- | :--- |
| `App.vue` | Handles the global shell, navigation bar, active section routing, right sidebar sub-menu dynamic registration, credentials modal, and scroll event listeners. |
| `OverviewDoc.vue` | Details API architecture, base URLs, security headers, key lifecycles, and standard error envelopes. |
| `MessagingDoc.vue` | Covers SMS and Voice broadcasting endpoints, character encodings, sender ID rules, and dual sandboxes. |
| `UssdDoc.vue` | Details inbound webhook request/response contracts, outbound NI-USSD push, and handset action formats. |
| `AuthEndpointsDoc.vue` | Documents OTP delivery and verification flows, security considerations, and rate limits. |
| `PlaygroundDoc.vue` | In-browser simulated API console for rapid testing and experimentation. |
| `DiagnosticsDoc.vue` | Reference library of telecom error codes, status code matrices, and pre-flight launch checklists. |

---

## Styling & Design System

The portal features a bespoke design system implemented in `src/assets/main.css`:

### Color Palette

- **Pave Dark**: `#0a2828` — Rich dark teal base used for the sticky navigation header and primary brand identity.
- **Pave Darker**: `#061d1d` — Deep slate-teal used for code blocks, headers, and active state backgrounds.
- **Pave Accent**: `#adff1c` — High-visibility lime green used for call-to-action buttons, active navigation pills, and method highlights.
- **Surface**: `#f8fafc` — Clean, soft off-white surface for documentation readability.
- **Borders**: `#e2e8f0` — Subtle, minimal border styling matching modern developer documentation standards.

### Key CSS Classes

- `.three-column-layout`: Flexbox container constrained to `1400px` max-width with centered layout.
- `.pave-nav-container`: Constrained navbar container matching the three-column layout boundaries.
- `.fixed-left-sidebar` & `.fixed-right-sidebar`: Sticky navigation bars (`top: 80px`, `height: calc(100vh - 80px)`).
- `.mobile-toc-wrapper`: Sticky container pinned directly beneath the navbar on mobile/tablet viewports (`top: 64px` / `80px`).
- `.mobile-toc-bar`: Ultra-slim 38px translucent frosted-glass bar (`rgba(10, 40, 40, 0.72)` + blur) with real-time scroll-spy active title updates.
- `.mobile-toc-dropdown`: Floating rounded glass card (`border-radius: 12px`, side margins, `max-height: 45vh`) for rapid in-page navigation.
- `.offcanvas-section-row` & `.offcanvas-toggle-btn`: Accordion header controls inside the mobile drawer with synchronized chevron toggles.
- `.offcanvas-sub-link`: Indented sub-endpoint navigation links with dark-mode method badges and active accent indicators.
- `.endpoint-sandbox-sticky`: Sticky sandbox container pinned at `top: 96px` on screens `≥ 1200px` with constrained viewport height and custom scrolling.
- `.moolre-param-card`: Clean card container for request headers and body/path parameters.
- `.moolre-response-card`: Structured status-code list with colored dot indicators and response schema tables.
- `.code-box-wrapper`: Dark syntax-highlighted code container with rounded corners and copy actions.

---

## License & Support

- **Proprietary Software**: © Pave360. All rights reserved.
- **Developer Portal**: [https://docs.pave360.com](https://docs.pave360.com)
- **Account Sign In**: [https://app.pave360.com/auth/signin](https://app.pave360.com/auth/signin)
- **Support & Inquiries**: Contact the Pave360 engineering team via your account manager or developer support portal.
