import '../../../otel/instrumentation.js' // the first to load

import { Hono } from 'hono'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'

import { cors } from 'hono/cors'
import { requestLogger } from './middlewares/request-logger.js'
import { ticketsRouter } from './tickets/routes/tickets.route.js'
import { parsedEnv } from './utils/env.js'

export const app = new Hono().basePath('/api/v1')

// middlewares
app.use(
  cors({
    origin: [parsedEnv.SHORT_URL_API_SERVICE_BASE_URL],
    // allowHeaders: ['Content-Type', 'Authorization'],
    // allowMethods: ['POST', 'GET', 'OPTIONS'],
    // exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)
app.use(secureHeaders())
app.use(requestId())
app.use(requestLogger())

// routes
app.route('/tickets', ticketsRouter)

app.get('/health-check', (c) => {
  c.status(200)
  return c.json({
    status: 200,
    message: 'The service is healthy 🚀',
    request_id: c.get('requestId'),
  })
})
