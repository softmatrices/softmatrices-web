import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-proxy',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res, next) => {
            if (req.method === 'POST') {
              let body = ''
              req.on('data', chunk => {
                body += chunk.toString()
              })
              req.on('end', async () => {
                try {
                  const parsedBody = JSON.parse(body)

                  // Debug logging
                  console.log('Local Proxy Debug: ENV Loaded from', process.cwd())
                  console.log('Local Proxy Debug: Key Present?', !!env.VITE_WEB3FORMS_ACCESS_KEY)

                  if (!env.VITE_WEB3FORMS_ACCESS_KEY) {
                    console.error('Local Proxy Error: VITE_WEB3FORMS_ACCESS_KEY is missing in .env')
                    throw new Error('Server configuration error: Missing Access Key in .env')
                  }

                  const payload = {
                    ...parsedBody,
                    access_key: env.VITE_WEB3FORMS_ACCESS_KEY
                  }

                  const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                  })
                  const data = await response.json()

                  console.log('Local Proxy Debug: Web3Forms Response:', data)

                  res.setHeader('Content-Type', 'application/json')
                  res.statusCode = response.status
                  res.end(JSON.stringify(data))
                } catch (error) {
                  console.error('Local API Proxy Error:', error)
                  res.statusCode = 500
                  res.end(JSON.stringify({
                    success: false,
                    message: `Local Proxy Error: ${error.message}`,
                    stack: error.stack
                  }))
                }
              })
            } else {
              next()
            }
          })
        }
      }
    ],
  }
})
