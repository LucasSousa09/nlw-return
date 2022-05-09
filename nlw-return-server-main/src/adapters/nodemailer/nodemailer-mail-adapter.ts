import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "82b04762e75079",
      pass: "1da96c9b45f4a8"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <team@feedget.com>',
      to: 'Lucas Rodrigues <lucasrodrigues.sousa09@gmail.com>',
      subject,
      html: body
    })
  }
}
