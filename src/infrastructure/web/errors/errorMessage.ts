export class ErrorMessage extends Error {
    constructor (paramName: string) {
      super(`${paramName}`)
      this.name = `ErrorMessage: ${paramName}`
    }
  }
  