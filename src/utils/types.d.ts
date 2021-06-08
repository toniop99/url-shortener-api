export interface UrlShortener {
  original: string
  shorten?: string
  clicks: number
  active: boolean
}
export type ReceivedUrlShortener = UrlShortener

export interface User {
  username: string
  password: string
}

export type ReceivedUser = User
export type NonSensitiveUser = Omit<User, 'password'>

export interface jwtDecoded {
  id: string
  iat: number
  exp: number
}

export type jwtDecodedData = Omit<jwtDecoded, 'iat' | 'exp'>
