import OverviewDoc from '../components/OverviewDoc.vue'
import MessagingDoc from '../components/MessagingDoc.vue'
import UssdDoc from '../components/UssdDoc.vue'
import AuthEndpointsDoc from '../components/AuthEndpointsDoc.vue'
import PlaygroundDoc from '../components/PlaygroundDoc.vue'
import DiagnosticsDoc from '../components/DiagnosticsDoc.vue'

/**
 * Categories group our documentation sections into logical buckets.
 */
export const categories = [
  'Getting Started',
  'Endpoints',
  'Developer Tools'
]

/**
 * All sections available in the documentation.
 * Each section has:
 * - id: unique string identifier used for navigation
 * - title: human-readable name shown in sidebar
 * - category: links this section to one of the categories above
 * - icon: Bootstrap icon class
 * - component: the Vue component that renders when this section is active
 * - submenus: array of anchor targets on the page for "On this page" TOC
 */
export const sections = [
  {
    id: 'overview',
    title: 'Overview',
    category: 'Getting Started',
    icon: 'bi-book',
    component: OverviewDoc,
    submenus: [
      { id: 'overview', title: 'API Overview', icon: 'bi-book' },
      { id: 'base-url', title: 'Base Service Endpoint', icon: 'bi-globe' },
      { id: 'base-url-props', title: 'Base URL Properties', icon: 'bi-sliders' },
      { id: 'authentication', title: 'Authentication', icon: 'bi-key' },
      { id: 'key-properties', title: 'API Key Properties', icon: 'bi-table' },
      { id: 'response-format', title: 'Response Envelope', icon: 'bi-box' },
      { id: 'rate-limiting', title: 'Rate Limits & Retries', icon: 'bi-speedometer2' },
      { id: 'security-guidelines', title: 'Security Guidelines', icon: 'bi-shield-check' }
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging',
    category: 'Endpoints',
    icon: 'bi-chat-dots',
    component: MessagingDoc,
    submenus: [
      { id: 'sms-guidelines', title: 'SMS Guidelines', icon: 'bi-info-circle' },
      { id: 'sms-send', title: 'SMS', icon: 'bi-chat-left-text', method: 'POST' },
      { id: 'sms-campaign', title: 'Bulk SMS', icon: 'bi-chat-dots', method: 'POST' },
      { id: 'sms-status', title: 'SMS Status', icon: 'bi-bar-chart-line', method: 'GET' },
      { id: 'voice-guidelines', title: 'Voice Audio Specs', icon: 'bi-file-earmark-music' },
      { id: 'voice-send', title: 'Voice', icon: 'bi-mic', method: 'POST' },
      { id: 'voice-status', title: 'Voice Status', icon: 'bi-graph-up', method: 'GET' }
    ]
  },
  {
    id: 'ussd',
    title: 'USSD',
    category: 'Endpoints',
    icon: 'bi-phone',
    component: UssdDoc,
    submenus: [
      { id: 'ussd-overview', title: 'USSD Architecture', icon: 'bi-diagram-2' },
      { id: 'ussd-session', title: 'Session Callback', icon: 'bi-terminal', method: 'POST' },
      { id: 'ussd-push', title: 'USSD Push', icon: 'bi-send', method: 'POST' },
      { id: 'ussd-response', title: 'Response Formats', icon: 'bi-file-code' },
      { id: 'ussd-best-practices', title: 'Session Timers & Rules', icon: 'bi-stopwatch' }
    ]
  },
  {
    id: 'auth-endpoints',
    title: 'Authentication',
    category: 'Endpoints',
    icon: 'bi-shield-lock',
    component: AuthEndpointsDoc,
    submenus: [
      { id: 'otp-security', title: 'OTP Security & Fraud', icon: 'bi-shield-check' },
      { id: 'otp-send', title: 'Send OTP', icon: 'bi-shield-lock', method: 'POST' },
      { id: 'otp-verify', title: 'Verify OTP', icon: 'bi-check-circle', method: 'POST' }
    ]
  },
  {
    id: 'playground',
    title: 'Playground',
    category: 'Developer Tools',
    icon: 'bi-tools',
    component: PlaygroundDoc,
    submenus: [
      { id: 'sandbox', title: 'API Sandbox Console', icon: 'bi-terminal' },
      { id: 'sandbox-config', title: 'Console Configuration', icon: 'bi-sliders' },
      { id: 'sandbox-response', title: 'Live Output Response', icon: 'bi-display' }
    ]
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics',
    category: 'Developer Tools',
    icon: 'bi-code-square',
    component: DiagnosticsDoc,
    submenus: [
      { id: 'system-codes', title: 'System & Custom Codes', icon: 'bi-code-square' },
      { id: 'code-categories', title: 'Response Categories', icon: 'bi-grid-fill' },
      { id: 'codes-table', title: 'Code Reference Table', icon: 'bi-table' },
      { id: 'troubleshooting-guide', title: 'Troubleshooting Guide', icon: 'bi-tools' }
    ]
  }
]
