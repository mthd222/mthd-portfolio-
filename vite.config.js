import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Dev-only endpoint the /admin editor posts to. It rewrites src/data/resume.json,
// so content edits never require touching component code. Never part of the build.
function resumeEditorPlugin() {
  return {
    name: 'resume-editor',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__save-resume', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json')
          try {
            const data = JSON.parse(body)
            const required = ['profile', 'stats', 'skillGroups', 'experience', 'projects', 'education']
            for (const key of required) {
              if (!(key in data)) throw new Error(`missing section: ${key}`)
            }
            fs.writeFileSync(
              path.resolve(__dirname, 'src/data/resume.json'),
              JSON.stringify(data, null, 2) + '\n',
            )
            res.end(JSON.stringify({ ok: true }))
          } catch (err) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: String(err.message || err) }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), resumeEditorPlugin()],
})
