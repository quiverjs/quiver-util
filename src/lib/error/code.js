export const errorToStatusCode = err => {
  const { statusCode } = err

  if(typeof(statusCode) === 'number' &&
     (statusCode|0) === statusCode &&
     statusCode >=400 &&
     statusCode < 600)
  {
    return statusCode
  }

  if(typeof(statusCode) === 'string' &&
     /^[45]\d\d$/.test(statusCode))
  {
    return parseInt(statusCode)
  }

  return 500
}
