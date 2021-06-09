import { env } from '../../../index'
import { generateShortenUrl, generateRandomShortenUrl } from '../../stringGenerator'
import { NonSensitiveUser, ReceivedUrlShortener, UrlShortener } from '../../types'
import { isBoolean, isString, isUrl } from '../../cheks/basicTypeChecks'

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

export const toReceivedUrlShortener = (object: any, user: NonSensitiveUser): ReceivedUrlShortener => {
  const receivedUrlShortener: ReceivedUrlShortener = {
    original: parseOriginal(object.original),
    shorten: parseShorten(object.shorten),
    active: parseActive(object.active),
    clicks: 0,
    creator: user._id!
  }

  return receivedUrlShortener
}

export const toSendUrlShortenerList = (objects: any[]): UrlShortener[] => {
  return objects.map(object => {
    const urlSortener: UrlShortener = {
      original: object.original,
      shorten: object.shorten,
      clicks: object.clicks,
      active: object.active,
      creator: object.creator
    }
    return urlSortener
  })
}
