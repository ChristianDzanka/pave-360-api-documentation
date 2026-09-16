import { ref } from 'vue'

/**
 * Vue 3 Composable for copying text to the user's clipboard.
 * 
 * Provides:
 * - copiedKey: ref holding the key of currently copied item (for showing temporary "Copied!" feedback)
 * - copyText(text, key): copies string to clipboard
 * - copyActiveTabCode(wrapperId, key): extracts code from the active tab pane and copies it
 */
export function useClipboard(timeout = 2000) {
  const copiedKey = ref(null)

  const copyText = (text, key) => {
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
      copiedKey.value = key
      setTimeout(() => {
        if (copiedKey.value === key) {
          copiedKey.value = null
        }
      }, timeout)
    })
  }

  const copyActiveTabCode = (wrapperId, key) => {
    const wrapper = document.getElementById(wrapperId)
    if (!wrapper) return
    const activePre = wrapper.querySelector('.tab-pane.active pre') || wrapper.querySelector('pre')
    if (!activePre) return
    copyText(activePre.innerText, key)
  }

  return {
    copiedKey,
    copyText,
    copyActiveTabCode
  }
}
