import { IUser } from "../../../../domain/model/user";
import { SignUpEntry, SignUpUseCase } from "../../../../domain/usercases/Section/SignUp";
import { ISendMail, SendMailEntry } from "../../../../infra/Email/protocols/sendMail";
import { IencryptData } from "../../../../infra/Encrypt/Protocols/encryptData";
import { SignUpRepository } from "../../../protocols/Section/signUp";


export class SignUp implements SignUpUseCase{
  private readonly signUpRepository: SignUpRepository
  private readonly encryptData : IencryptData
  private readonly sendEmail: ISendMail

  

  constructor(signUpRepository: SignUpRepository, encryptData: IencryptData, sendMail: ISendMail){
    this.signUpRepository = signUpRepository
    this.encryptData = encryptData
    this.sendEmail = sendMail
  }

  async signUp({userName, email, password}: SignUpEntry): Promise<IUser>{
    /*Criptografando senha para Salvar no banco*/
    const password_hash = await this.encryptData.encrypt(password)
    /*----------*/

    /*Criptografando o email para ser usado como codigo de ativação*/
    const email_hash = await this.encryptData.encrypt(email)
    /*-----------*/

    /*Salvando no banco*/
    const response =  await this.signUpRepository.signUp(userName, email, password_hash, email_hash)
    /*--------*/

    /*Enviando Email*/
    const message:SendMailEntry = {
      from: 'contato@store.com',
      subject: 'Account Verification',
      text: 'Verify Account: ' + 'http://localhost:8081/email_confirmation/?code='+email_hash ,
      to: email,
    }
    this.sendEmail.send(message)
    /*---------*/
    
    return {
      email: response.email,
      nome: response.nome
    }
  }
}