/**
 * Client-Side Version & Cache Invalidation Helper
 * Ensures users viewing open tabs automatically reload when a new build is deployed to production.
 */

export function initVersionCheck() {
  // Only execute in browser production environments
  if (typeof window === 'undefined' || import.meta.env.DEV) return

  let currentVersion = typeof __APP_BUILD_TIME__ !== 'undefined' ? __APP_BUILD_TIME__ : null
  let isReloading = false

  const checkVersion = async () => {
    if (isReloading) return
    try {
      const response = await fetch(`/version.json?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache'
        }
      })

      if (!response.ok) return
      const data = await response.json()

      if (data && data.version) {
        if (currentVersion && data.version !== currentVersion) {
          isReloading = true
          console.info('[Pave360] New version deployed. Reloading page...')
          window.location.reload()
        } else if (!currentVersion) {
          currentVersion = data.version
        }
      }
    } catch {
      // Ignore network errors (e.g. offline)
    }
  }

  // 1. Event: Vite chunk preload error
  // Fired when a new deployment has deleted old hashed chunks from S3 and the user navigates/interacts.
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault()
    if (!isReloading) {
      isReloading = true
      console.info('[Pave360] Deployment update detected via chunk mismatch. Refreshing to latest version...')
      window.location.reload()
    }
  })

  // 2. Event: Tab visibility change
  // Only checks when a user explicitly returns to the tab after being away.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkVersion()
    }
  })
}
