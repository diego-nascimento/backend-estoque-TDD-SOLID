import {getProdutoPresentation} from './getProduto'
import {getProduto} from '../../../../domain/usercases/Produto/getProduto'
import { IProduto } from '../../../../domain/model/produto'
import { httpRequest } from '../../../protocols/http'
import { serverError } from '../../../helpers/http-helpers'

const fakeProduto:IProduto = {
  categoria: {
    id: 1,
    name: 'fake categoria name',
    photo:{
      id: 1,
      url: 'fake url'
    }
  },
  description: 'fake desc',
  id: 1,
  name: 'fake name',
  photos:[
    {
      id: 1,
      url: 'fake url'
    }
  ],
  resume: 'fake resume'
}

const makegetProdutoSlug = ()=>{
  class getPRodutoSlug implements getProduto{
    async get(produto: number): Promise<IProduto>{
      return new Promise(resolve => resolve(fakeProduto)) 
    }
  }
  return new getPRodutoSlug
}

describe('get Produto', ()=>{
  test('Should return 400 if no params is provided',async ()=>{
    const sut = new getProdutoPresentation(makegetProdutoSlug())
    const httpRequest: httpRequest = {
    
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: produto'})
  })

  test('Should return 400 if no produto is provided',async ()=>{
    const sut = new getProdutoPresentation(makegetProdutoSlug())
    const httpRequest: httpRequest = {
      params:{

      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: produto'})
  })

  test('Should return 500 if something goes wrong', async ()=>{
    const getProdutoSlug = makegetProdutoSlug()
    const sut = new getProdutoPresentation(getProdutoSlug)
    const httpRequest: httpRequest = {
      params:{
        produto: 1
      }
    }
    jest.spyOn(getProdutoSlug, 'get').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: "Something went wrong: teste"})
  })

  test('Should return 200 if goes right',async ()=>{
    const sut = new getProdutoPresentation(makegetProdutoSlug())
    const httpRequest: httpRequest = {
      params:{
        produto: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeProduto)
  })
})