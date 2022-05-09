import { MailAdapter, SendMailData } from '../mail-adapter'

import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'DeuRuim')

  export class SendGridMailAdapter implements MailAdapter {
      async sendMail({subject, body}: SendMailData){
        
        const message = {
            to: 'lucasrodrigues.sousa09@gmail.com',
            from: 'lucasrodrigues.sousa09@gmail.com',
            subject,
            html: body,
        }
        try{
            await sgMail.send(message)
        }
        catch(err){
            console.log({err})
        }
      }
  }