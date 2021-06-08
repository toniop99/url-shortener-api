import { env } from 'src/index'
import { generateRandomString } from 'src/utils/stringGenerator'
import { ReceivedUrlShortener } from 'src/utils/types'
import { isBoolean, isIntegerNumber, isString, isUrl } from 'src/utils/cheks/basicTypeChecks'

const parseOriginal = (originalFromRequest: any): string => {
  if (!isUrl(originalFromRequest)) {
    throw new Error('Incorrect or missing original url.')
  }

  return originalFromRequest
}

const parseActive = (activeFromRequest: any): boolean => {
  if (isString(activeFromRequest)) {
    if (activeFromRequest === 'true') {
      return true
    } else if (activeFromRequest === 'false') {
      return false
    } else {
      throw new Error('Incorrect or missing active property')
    }
  }

  if (!isBoolean(activeFromRequest)) {
    throw new Error('Incorrect or missing active property')
  }

  return activeFromRequest
}

const parseClicks = (clicksFromRequest: any): number => {
  if (!isIntegerNumber(clicksFromRequest)) {
    throw new Error('The url clicks parameter must be an integer number.')
  }

  if (clicksFromRequest < 0) {
    throw new Error('The url clicks parameter must be bigger or equal than zero.')
  }

  return clicksFromRequest
}

export const toReceivedUrlShortener = (object: any): ReceivedUrlShortener => {
  const receivedUrlShortener: ReceivedUrlShortener = {
    original: parseOriginal(object.original),
    shorten: isString(object.shorten) ? object.shorten : generateRandomString(env.GENERATED_PATH_LENGTH),
    active: parseActive(object.active),
    clicks: parseClicks(object.clicks)
  }

  return receivedUrlShortener
}
