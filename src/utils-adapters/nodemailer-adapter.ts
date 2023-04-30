import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { IMailProvider, IMessage } from '../infrastructure/web/interfaces/mail-provider'


export class MailProvider implements IMailProvider {
  private readonly transporter: Mail
  constructor () {            
    this.transporter = nodemailer.createTransport({
      host: process.env.HOSTNAME,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASS
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: true
      }
    })
  }

  async sendMail (message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.body

    })
  }
}
