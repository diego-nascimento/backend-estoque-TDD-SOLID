
export interface SendMailEntry{
  from: string,
  to: string,
  subject: string,
  text: string
}

export interface ISendMail{
  send(data: SendMailEntry):Promise<boolean>
}