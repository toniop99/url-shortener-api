import randomstring from 'randomstring'
import { env } from '../index'

export function generateRandomShortenUrl (length: number): string {
  const baseUrl = env.BASE_URL
  const randomPath = randomstring.generate({ length })

  return baseUrl.concat(randomPath)
}

export function generateShortenUrl (shorten: string): string {
  const baseUrl = env.BASE_URL
  return baseUrl.concat(shorten)
}
