import {checkAvaliable} from './checkAvailable'
import {checkAvailableUseCase} from '../../../../domain/usercases/Estoque/CheckAvailable'
import { httpRequest } from '../../../protocols/http'

const makeSlug = ()=>{
  class slug implements checkAvailableUseCase{
    async check(produto: number, quantidade: number):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('Check Available', ()=>{
  test('Should return 400 if no produto is provided', async ()=>{
    const slug = makeSlug()
    const sut = new checkAvaliable(slug)

    const httpRequest: httpRequest = {
      body:{
        quantidade: 20
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error:'Bad Request: Missing param produto'})
  })

  test('Should return 400 if no quantidade is provided', async ()=>{
    const slug = makeSlug()
    const sut = new checkAvaliable(slug)

    const httpRequest: httpRequest = {
      body:{
        produto: 1,
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error:'Bad Request: Missing param quantidade'})
  })

  test('Should return 500 handle throws', async ()=>{
    const slug = makeSlug()
    const sut = new checkAvaliable(slug)

    const httpRequest: httpRequest = {
      body:{
        produto: 1,
        quantidade: 20
      }
    }

    jest.spyOn(slug, 'check').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('Should return 200 and booelan in body when succeeds', async ()=>{
    const slug = makeSlug()
    const sut = new checkAvaliable(slug)

    const httpRequest: httpRequest = {
      body:{
        produto: 1,
        quantidade: 20
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(true)
  })
})

