import { Client, Pool, types, type ConnectionConfig } from 'pg'
import { parsedEnv } from '../../utils/env.js'
import logger from '../../utils/logger.js'

// bigint custom parser
types.setTypeParser(20, (input) => BigInt(input))

const config: ConnectionConfig = {
  host: parsedEnv.DB_HOST,
  user: parsedEnv.DB_USER,
  password: parsedEnv.DB_PASSWORD,
  database: parsedEnv.DB_NAME,
  query_timeout: 3000,
}

export const db = new Client(config)
export const pool = new Pool({ ...config, max: 25, min: 5 })

try {
  await db.connect()
} catch (error) {
  logger.error('Error connecting Database!!!', error)
  process.exit(1)
}
