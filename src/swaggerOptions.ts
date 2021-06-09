import { env } from './index'
import { SwaggerOptions } from 'swagger-ui-express'

export const getSwaggerOptions = (): SwaggerOptions => {
  return {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Url shortener API',
        version: '0.1.0',
        description:
          'An api for short urls',
        contact: {
          name: 'Antonio',
          url: 'https://antoniohnz.me',
          email: 'granviamurcia2@gmail.com'
        }
      },
      servers: [
        {
          url: env.BASE_URL + 'v1/api'
        }
      ]
    },
    apis: ['./docs/**/*.yaml']
  }
}
