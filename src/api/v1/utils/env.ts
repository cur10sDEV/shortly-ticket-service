import z from 'zod'

const envSchema = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().min(1000).max(64000),
  DB_USER: z.string().min(1).max(64),
  DB_PASSWORD: z.string().min(1).max(128),
  DB_NAME: z.string().min(1).max(128),
  APP_PORT: z.coerce.number().min(1000).max(64000),
  OTEL_SERVICE_NAME: z.string().min(1),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.url().min(1),
})

type ENV = z.infer<typeof envSchema>

export let parsedEnv: ENV

try {
  parsedEnv = envSchema.parse(process.env)
} catch (error) {
  /* eslint-disable no-console */
  console.error('Invalid Environment Variables!!!', error)
  process.exit(1)
}
