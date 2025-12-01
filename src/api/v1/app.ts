import { Hono } from "hono"
import { requestId } from "hono/request-id"
import { ticketsRouter } from "./tickets/routes/tickets.route.js"

export const app = new Hono().basePath("/api/v1")

// middlewares
app.use("*", requestId())
// app.use(logger())

app.get("/", (c) => {
  c.status(200)
  return c.json({
    key: "value",
    request_id: c.get("requestId"),
  })
})

// routes
app.route("/tickets", ticketsRouter)

app.get("/health-check", (c) => {
  c.status(200)
  return c.json({
    status: 200,
    message: "The service is healthy 🚀",
    request_id: c.get("requestId"),
  })
})
