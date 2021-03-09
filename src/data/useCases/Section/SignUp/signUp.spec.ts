import {SignUp} from './signUp'
import {IencryptData} from '../../../../infra/Encrypt/Protocols/encryptData'
import {ISendMail} from '../../../../infra/Email/protocols/sendMail'
import {SendMailEntry} from '../../../../infra/Email/protocols/sendMail'
import {SignUpRepository} from '../../../protocols/Section/signUp'
import { IUser } from '../../../../domain/model/user'
import {SignUpEntry} from '../../../../domain/usercases/Section/SignUp'



const fakeUser: IUser = {
  email: 'fake email',
  nome: 'fake nome'
}

const fakeUserEntry: SignUpEntry ={
  email: 'teste email',
  password: 'teste password',
  userName: 'test name'
}

const makeSlugEncrypt = ()=>{
  class slugEncrypt implements IencryptData{
    async encrypt(value: string): Promise<string>{
      return Promise.resolve('Fake Encrypted data')
    }
  }
  return new slugEncrypt
}


const makeSlugSendMail = ()=>{
  class slugMail implements ISendMail{
    send(data: SendMailEntry):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slugMail
}


const makeSignUpSlug = () =>{
  class signUpSlug implements SignUpRepository{
    async signUp(login: string, email: string, password: string, email_hash: string): Promise<IUser>{
      return Promise.resolve(fakeUser)
    }
  }
  return new signUpSlug
}

describe('SignUp', ()=>{
  test('Should throw if encrypt throws', async ()=>{
    const encSlug = makeSlugEncrypt()
    const MailSlug = makeSlugSendMail()
    const signUpSlug = makeSignUpSlug()
    const sut = new SignUp(signUpSlug, encSlug, MailSlug)
    jest.spyOn(encSlug, 'encrypt').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.signUp(fakeUserEntry)
    await expect(promise).rejects.toThrowError()
  })

  test('Should Encrypt to have been called with correct values', async ()=>{
    const encSlug = makeSlugEncrypt()
    const MailSlug = makeSlugSendMail()
    const signUpSlug = makeSignUpSlug()
    const sut = new SignUp(signUpSlug, encSlug, MailSlug)
    const spy = jest.spyOn(encSlug, 'encrypt')
    await sut.signUp(fakeUserEntry)
    expect(spy).toHaveBeenCalledWith(fakeUserEntry.password)
    expect(spy).toHaveBeenCalledWith(fakeUserEntry.email)
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('Should throw if SendMail throws', async ()=>{
    const encSlug = makeSlugEncrypt()
    const MailSlug = makeSlugSendMail()
    const signUpSlug = makeSignUpSlug()
    const sut = new SignUp(signUpSlug, encSlug, MailSlug)
    jest.spyOn(MailSlug, 'send').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.signUp(fakeUserEntry)
    await expect(promise).rejects.toThrowError()
  })

  test('Should send to have been called with correct values', async ()=>{
    const encSlug = makeSlugEncrypt()
    const MailSlug = makeSlugSendMail()
    const signUpSlug = makeSignUpSlug()
    const sut = new SignUp(signUpSlug, encSlug, MailSlug)
    const spy = jest.spyOn(MailSlug, 'send')
    await sut.signUp(fakeUserEntry)
    expect(spy).toHaveBeenCalledWith({
      from: "contato@store.com", 
      subject: "Account Verification", 
      text: "Verify Account: http://localhost:8081/email_confirmation/?code=Fake Encrypted data",
      to: "teste email"})
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if signUp throws', async ()=>{
    const encSlug = makeSlugEncrypt()
    const MailSlug = makeSlugSendMail()
    const signUpSlug = makeSignUpSlug()
   
    const sut = new SignUp(signUpSlug, encSlug, MailSlug)
    
    jest.spyOn(signUpSlug, 'signUp').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.signUp(fakeUserEntry)
    await expect(promise).rejects.toThrowError()
  })

  test('Should signUp have been called with correct values', async ()=>{
    const encSlug = makeSlugEncrypt()
    const MailSlug = makeSlugSendMail()
    const signUpSlug = makeSignUpSlug()
   
    const sut = new SignUp(signUpSlug, encSlug, MailSlug)
    
    const spy = jest.spyOn(signUpSlug, 'signUp')
    await sut.signUp(fakeUserEntry)
    expect(spy).toHaveBeenCalledWith(fakeUserEntry.userName, fakeUserEntry.email, 'Fake Encrypted data', 'Fake Encrypted data')
  })

  test('Should return true if success', async ()=>{
    const encSlug = makeSlugEncrypt()
    const MailSlug = makeSlugSendMail()
    const signUpSlug = makeSignUpSlug()
   
    const sut = new SignUp(signUpSlug, encSlug, MailSlug)
    
    const response = await sut.signUp(fakeUserEntry)
    expect(response).toEqual({email: fakeUser.email, nome: fakeUser.nome})
  })
})