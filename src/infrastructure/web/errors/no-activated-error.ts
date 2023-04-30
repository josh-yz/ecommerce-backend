export class NoActivated extends Error {
    constructor () {
      super('You need to activate your account.')
      this.name = 'You need to activate your account'
    }
  }