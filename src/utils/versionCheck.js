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

  // 1. Initial background check
  setTimeout(checkVersion, 3000)

  // 2. Check whenever user focuses or switches back to this tab
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      checkVersion()
    }
  })

  // 3. Periodic check every 5 minutes
  setInterval(checkVersion, 5 * 60 * 1000)

  // 4. Handle Vite chunk preload errors (e.g. if old chunks are purged from S3)
  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault()
    if (!isReloading) {
      isReloading = true
      console.warn('[Pave360] Preload chunk error detected (new deployment). Reloading...')
      window.location.reload()
    }
  })
}
