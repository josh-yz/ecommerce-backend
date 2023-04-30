export interface IAddress {
    email: string
    name: string
  }
  
  export interface IMessage {
    to: IAddress
    from: IAddress
    subject: string
    body: string
    template?: any
  }
  
  export interface IMessageResponse {
    _id: string
    to: IAddress
    from: IAddress
    subject: string
    body: string
    template?: any
  }
  export interface IMailProvider {
    sendMail: (message: IMessage) => Promise<void>
  }
  