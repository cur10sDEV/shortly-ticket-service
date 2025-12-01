import { serve } from '@hono/node-server'
import { parsedEnv } from './api/utils/env.js'
import { app } from './api/v1/app.js'

serve(
  {
    fetch: app.fetch,
    port: parsedEnv.APP_PORT || 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
