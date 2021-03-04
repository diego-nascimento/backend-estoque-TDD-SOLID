import {deleteProdutoPresentation} from './deleteProduto'
import {deleteProduto} from '../../../../domain/usercases/Produto/deleteProduto'
import { httpRequest } from '../../../protocols/http'

const makeDeleteProdutoSlug = ()=>{
  class deleteProdutoSlug implements deleteProduto{
    async delete(produto: number):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new deleteProdutoSlug
}


describe('Delete Produto', ()=>{
  test('Shoudl return 400 if no id is provided', async ()=>{
    const deleteProdutoSlug = makeDeleteProdutoSlug()
    const sut = new deleteProdutoPresentation(deleteProdutoSlug)
    const httpRequest:httpRequest ={
      params:{
        
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: id'})
  })

  test('Shoudl return 400 if no params is provided', async ()=>{
    const deleteProdutoSlug = makeDeleteProdutoSlug()
    const sut = new deleteProdutoPresentation(deleteProdutoSlug)
    const httpRequest:httpRequest ={
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: id'})
  })

  test('Shoudl return 500 if something throws', async ()=>{
    const deleteProdutoSlug = makeDeleteProdutoSlug()
    const sut = new deleteProdutoPresentation(deleteProdutoSlug)
    const httpRequest:httpRequest ={
      params:{
        id: 1
      }
    }
    jest.spyOn(deleteProdutoSlug, 'delete').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('Shoudl return 200 if works', async ()=>{
    const deleteProdutoSlug = makeDeleteProdutoSlug()
    const sut = new deleteProdutoPresentation(deleteProdutoSlug)
    const httpRequest:httpRequest ={
      params:{
        id: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(true)
  })
})