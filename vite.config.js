import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const BUILD_ID = Date.now().toString()

function versionPlugin() {
  return {
    name: 'version-generator',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify(
          {
            version: BUILD_ID,
            builtAt: new Date().toISOString()
          },
          null,
          2
        )
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), versionPlugin()],
  define: {
    __APP_BUILD_TIME__: JSON.stringify(BUILD_ID)
  }
})
