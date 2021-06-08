import { env } from '../../../index'
import { generateShortenUrl, generateRandomShortenUrl } from '../../stringGenerator'
import { ReceivedUrlShortener } from '../../types'
import { isBoolean, isIntegerNumber, isString, isUrl } from '../../cheks/basicTypeChecks'

const parseOriginal = (originalFromRequest: any): string => {
  if (!isUrl(originalFromRequest)) {
    throw new Error('Incorrect or missing original url.')
  }

  return originalFromRequest
}

const parseShorten = (shortenFromRequest: any): string => {
  if (shortenFromRequest === null || shortenFromRequest === undefined) {
    return generateRandomShortenUrl(env.GENERATED_PATH_LENGTH)
  }

  if (isUrl(shortenFromRequest)) {
    throw new Error('Incorrect shorten url.')
  }

  if (!isString(shortenFromRequest)) {
    throw new Error('Incorrect shorten url.')
  }

  return generateShortenUrl(shortenFromRequest)
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
    shorten: parseShorten(object.shorten),
    active: parseActive(object.active),
    clicks: parseClicks(object.clicks)
  }

  return receivedUrlShortener
}
