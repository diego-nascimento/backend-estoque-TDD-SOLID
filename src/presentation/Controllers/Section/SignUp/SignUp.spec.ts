import {SignUpPresentation} from './SignUp'
import {SignUpUseCase, SignUpEntry} from '../../../../domain/usercases/Section/SignUp'
import { IUser } from '../../../../domain/model/user'
import { httpRequest } from '../../../protocols/http'

const fakeUser: IUser = {
  email: 'fakeemail',
  nome: 'fake name'
}

const makeSlug = () =>{
  class SignUpSlug implements SignUpUseCase{
    async signUp({userName, email, password}: SignUpEntry): Promise<IUser>{
      return Promise.resolve(fakeUser)
    }
  }
  return new SignUpSlug
}

describe('SignUp', ()=>{
  test('Should return 400 if no username is provided', async ()=>{
    const slug = makeSlug()
    const sut = new SignUpPresentation(slug)
    const httpRequest:httpRequest = {
      body:{
        email: 'teste email',
        password: 'teste password'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: nome'})

  })

  test('Should return 400 if no email is provided', async ()=>{
    const slug = makeSlug()
    const sut = new SignUpPresentation(slug)
    const httpRequest:httpRequest = {
      body:{
        nome: 'teste name',
        password: 'teste password'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: email'})

  })

  test('Should return 400 if no password is provided', async ()=>{
    const slug = makeSlug()
    const sut = new SignUpPresentation(slug)
    const httpRequest:httpRequest = {
      body:{
        email: 'teste email',
        nome: 'teste name',
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: password'})
  })

  test('Should return 500 if something goes wrong', async ()=>{
    const slug = makeSlug()
    const sut = new SignUpPresentation(slug)
    const httpRequest:httpRequest = {
      body:{
        email: 'teste email',
        nome: 'teste name',
        password: 'teste password'
      }
    }
    jest.spyOn(slug, 'signUp').mockImplementationOnce(()=>{
      throw new Error('teste')
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('Should return 200 if goes right', async ()=>{
    const slug = makeSlug()
    const sut = new SignUpPresentation(slug)
    const httpRequest:httpRequest = {
      body:{
        email: 'teste email',
        nome: 'teste name',
        password: 'teste password'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      data:{
        email: fakeUser.email,
        nome: fakeUser.nome
      }
    })
  })
})