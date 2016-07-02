const $errorCode = Symbol('@errorCode')
const $errorMessage = Symbol('@errorMessage')
const $errorDetails = Symbol('@errorDetails')

export let error = (errorCode, errorMessage, details) =>
  new ServerError(errorCode, errorMessage, details)

class ServerError extends Error {
  constructor(errorCode=500, errorMessage='Internal Error', details={}) {
    super(errorMessage)

    this[$errorCode] = errorCode
    this[$errorMessage] = errorMessage
    this[$errorDetails] = details
  }

  get name() {
    return 'ServerError'
  }

  get code() {
    return this[$errorCode]
  }

  get message() {
    return this[$errorMessage]
  }

  get details() {
    return this[$errorDetails]
  }

  format() {
    return `[Error ${this.code}: ${this.message}]\n${this.stack}`
  }

  inspect() {
    return this.format()
  }
}
