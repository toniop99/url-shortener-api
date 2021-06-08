export const isString = (value: string): boolean => {
  return typeof value === 'string'
}

export const isNumber = (value: number): boolean => {
  return typeof value === 'number' || !isNaN(value)
}

export const isIntegerNumber = (value: number): boolean => {
  if (isNumber(value)) return Number.isInteger(+value)

  return false
}

export const isUrl = (value: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

  return !!pattern.test(value)
}

export const isBoolean = (value: boolean): boolean => {
  return typeof value === 'boolean'
}
