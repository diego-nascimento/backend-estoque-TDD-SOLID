import {addEstoque} from './addEstoque'
import {addEstoqueCase} from '../../../../domain/usercases/Estoque/AddEstoque'
import { httpRequest } from '../../../protocols/http'

const makeAddEstroqueSlug = () =>{
  class addEstoqueSlug implements addEstoqueCase{
    add(produto: number, quantidade: number):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new addEstoqueSlug
}

describe('Restock Product', ()=>{
  test('Should return 400 if no produto is provided', async ()=>{
    const addEstoqueSlug = makeAddEstroqueSlug()
    const sut = new addEstoque(addEstoqueSlug)

    const httpRequest: httpRequest = {
      body:{
        quantidade: 200
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error:'Bad Request: Missing param produto'})
  })

  test('Should return 400 if no quantidade is provided', async ()=>{
    const addEstoqueSlug = makeAddEstroqueSlug()
    const sut = new addEstoque(addEstoqueSlug)

    const httpRequest: httpRequest = {
      body:{
        produto: 1,
        
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing param quantidade'})
  })

  test('Should return 500 if something goes wrong', async ()=>{
    const addEstoqueSlug = makeAddEstroqueSlug()
    const sut = new addEstoque(addEstoqueSlug)

    const httpRequest: httpRequest = {
      body:{
        produto: 1,
        quantidade: 200
      }
    }

    jest.spyOn(addEstoqueSlug, 'add').mockImplementationOnce(()=>{
      throw new Error('teste')
    })

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('Should return 200 if goes well', async ()=>{
    const addEstoqueSlug = makeAddEstroqueSlug()
    const sut = new addEstoque(addEstoqueSlug)
    const httpRequest: httpRequest = {
      body:{
        produto: 1,
        quantidade: 200
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(true)
  })
})