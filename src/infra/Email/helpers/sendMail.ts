import nodemailer from 'nodemailer'

export const sendMailHelper = () =>{
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "003ab971c28de1",
      pass: "0ad07a25bfdaf3"
    }
  });
}