import express from 'express'
import { load } from 'ts-dotenv'
import morgan from 'morgan'
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { databaseConnection } from './database/connection'
import { shortenerRoutes } from './routes/api/shortener.routes'
import { redirectorRoutes } from './routes/redirector.routes'
import { authenticationRoutes } from './routes/authentication.routes'

import { getSwaggerOptions } from './swaggerOptions'
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

  const specs = swaggerJsdoc(getSwaggerOptions())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors())

  if (app.get('env') === 'production') {
    app.use(morgan('combined'))
  } else {
    app.use(morgan('dev'))
  }

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
  app.use('/v1/api', shortenerRoutes)
  app.use('/v1/api/user', authenticationRoutes)
  app.use(redirectorRoutes)

  app.get('/', (_, res) => {
    res.json({ message: `Go to ${env.BASE_URL}docs to see the documentation.` })
  })
  app.listen(env.PORT, () => console.log(`Running on port ${env.PORT}`))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startApi()
