import {removeEstoque} from './removeEstoque'
import {removeEstoqueUseCase} from '../../../../domain/usercases/Estoque/RemoveEstoque'
import { httpRequest } from '../../../protocols/http'

const makeSlug = () =>{
  class slug implements removeEstoqueUseCase{
    async remove(produto: number, quantidade: number): Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('Remove from Stock', ()=>{
  test('Should return 400 if not produto is provided',async ()=>{
    const slug = makeSlug()
    const sut = new removeEstoque(slug)

    const httpRequest: httpRequest = {
      body:{
        quantidade: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error:'Bad Request: Missing param produto'})
  })

  test('Should return 400 if not quantidade is provided',async ()=>{
    const slug = makeSlug()
    const sut = new removeEstoque(slug)

    const httpRequest: httpRequest = {
      body:{
        produto: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error:'Bad Request: Missing param quantidade'})
  })

  test('Should return 500 remove throws',async ()=>{
    const slug = makeSlug()
    const sut = new removeEstoque(slug)

    const httpRequest: httpRequest = {
      body:{
        produto: 1,
        quantidade: 20
      }
    }
    jest.spyOn(slug, 'remove').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('Should return 200 if succeeds',async ()=>{
    const slug = makeSlug()
    const sut = new removeEstoque(slug)

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