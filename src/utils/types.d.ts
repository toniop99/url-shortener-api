export interface UrlShortener {
  original: string
  shorten?: string
  clicks: number
  active: boolean
  creator: string
}
export type ReceivedUrlShortener = UrlShortener

export interface User {
  _id?: string
  username: string
  password: string
}

export type DatabaseUser = Omit<User, '_id'>
export type ReceivedUser = Omit<User, '_id'>
export type NonSensitiveUser = Omit<User, 'password'>

export interface jwtDecoded {
  id: string
  iat: number
  exp: number
}

export type jwtDecodedData = Omit<jwtDecoded, 'iat' | 'exp'>
