import { ISendMail, SendMailEntry} from "../protocols/sendMail";
import {sendMailHelper} from '../helpers/sendMail'

export class sendMailImplementation implements ISendMail{
  async send(data: SendMailEntry): Promise<boolean>{
    try {
      const Transport = sendMailHelper()
      const response = await Transport.sendMail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        text: data.text
      })
      return true
    } catch (error) {
      throw new Error(error)
    } 
  }
}