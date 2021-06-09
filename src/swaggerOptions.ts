import { env } from './index'
import { SwaggerOptions } from 'swagger-ui-express'

export const getSwaggerOptions = (): SwaggerOptions => {
  return {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Url shortener - API',
        version: '0.1.0',
        description:
          'A simple api to use shortened urls and other interesting stuff',
        contact: {
          name: 'Antonio',
          url: 'https://antoniohnz.me',
          email: 'granviamurcia2@gmail.com'
        },
        license: {
          name: 'MIT',
          url: 'https://opensource.org/licenses/MIT'
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
