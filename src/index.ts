import express from 'express'
import { databaseConnection } from './database/connection'
import { shortenerRoutes } from './routes/api/shortener.routes'
import { redirectorRoutes } from './routes/redirector.routes'
import { authenticationRoutes } from './routes/authentication.routes'
import { load } from 'ts-dotenv'

export const env = load({
  PORT: Number,
  KEY: String,
  BASE_URL: String,
  GENERATED_PATH_LENGTH: Number,
  DB_USERNAME: String,
  DB_PASSWORD: String,
  DB_NAME: String
})

async function startApi (): Promise<void> {
  await databaseConnection()
  const app = express()

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use('/v1/api', shortenerRoutes)
  app.use(authenticationRoutes)
  app.use(redirectorRoutes)

  app.get('/', (_, res) => {
    res.json({ message: 'Base Path' })
  })
  app.listen(env.PORT, () => console.log(`Running on port ${env.PORT}`))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startApi()
