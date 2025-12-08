import '../../../otel/instrumentation.js' // the first to load

import { Hono } from 'hono'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'

import { requestLogger } from './middlewares/request-logger.js'
import { ticketsRouter } from './tickets/routes/tickets.route.js'

export const app = new Hono().basePath('/api/v1')

// middlewares
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
