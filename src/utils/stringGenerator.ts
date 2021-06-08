import randomstring from 'randomstring'
import { env } from 'src/index'

export function generateRandomString (length: number): string {
  const baseUrl = env.BASE_URL
  const randomPath = randomstring.generate({ length })

  return baseUrl.concat(randomPath)
}
