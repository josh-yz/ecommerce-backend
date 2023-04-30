export class ErrorAuth extends Error {
    constructor () {
      super('The email or password entered is not recognized..')
      this.name = 'The email or password entered is not recognized.'
    }
  }