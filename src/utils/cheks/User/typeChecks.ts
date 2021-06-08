import { ReceivedUser } from 'src/utils/types'
import { isString } from '../basicTypeChecks'

const parseUsername = (usernameFromRequest: any): string => {
  if (!isString(usernameFromRequest)) {
    throw new Error('Username must be a string.')
  }

  return usernameFromRequest
}

const parsePassword = (passwordFromRequest: any): string => {
  if (!isString(passwordFromRequest)) {
    throw new Error('Password must be a string.')
  }

  return passwordFromRequest
}

export const toReceivedUser = (object: any): ReceivedUser => {
  const receivedUser: ReceivedUser = {
    username: parseUsername(object.username),
    password: parsePassword(object.password)
  }

  return receivedUser
}
