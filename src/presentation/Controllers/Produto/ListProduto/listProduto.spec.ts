import {ListProduto} from './listProduto'
import {ListProdutouseCase} from '../../../../domain/usercases/Produto/listProduto'
import { IProduto } from '../../../../domain/model/produto'
import { httpRequest } from '../../../protocols/http'

const fakeProduto: IProduto = {
  description: 'fake desc',
  id: 1,
  name: 'fake name',
  preco: 25.15,
  resume: 'fake resume',
  photos: [
    {
      id: 1,
      url: 'fake url'
    }
  ],
  categoria: {
    id: 1,
    name: 'fake categoria',
    photo:{
      id: 1,
      url: 'fake url'
    }
  }
}

const fakeArrayProduto: Array<IProduto> = [fakeProduto]

const makeListeProdutoSLug = ()=>{
  class listProdutoSlug implements ListProdutouseCase{
    async list(): Promise<Array<IProduto>> {
      return new Promise(resolve => resolve(fakeArrayProduto))
    }
  } 
  return new listProdutoSlug
}

describe('list Produto', ()=>{
  test('Should return 500 if something goes wrong', async ()=>{
    const ListSlug = makeListeProdutoSLug()
    
    const sut = new ListProduto(ListSlug)
    const httpRequest: httpRequest = {
      params: {
        page: 1
      }
    }
    jest.spyOn(ListSlug, 'list').mockImplementationOnce(()=>{
      throw new Error('teste')
    })

    const response =await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({"Error": "Something went wrong: teste"})
  })

  test('Page should be 1 if no params is provided', async ()=>{
    const ListSlug = makeListeProdutoSLug()
    const sut = new ListProduto(ListSlug)
    const httpRequest: httpRequest = {
    }
    const spy = jest.spyOn(ListSlug, 'list')

    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(1)
    
  })

  test('Page should be 1 if no page params is provided', async ()=>{
    const ListSlug = makeListeProdutoSLug()
    const sut = new ListProduto(ListSlug)
    const httpRequest: httpRequest = {
      params: {
        
      }
    }
    const spy = jest.spyOn(ListSlug, 'list')

    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(1)
    
  })

  test('Page should be 3 page params 3 is provided', async ()=>{
    const ListSlug = makeListeProdutoSLug()
    const sut = new ListProduto(ListSlug)
    const httpRequest: httpRequest = {
      params:{
        page: 3
      }
    }
    const spy = jest.spyOn(ListSlug, 'list')

    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(3)
    
  })

  test('Should return 200 if goes right', async ()=>{
    const ListSlug = makeListeProdutoSLug()
    
    const sut = new ListProduto(ListSlug)
    const httpRequest: httpRequest = {
      params: {
        page: 1
      }
    }
    const response =await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(fakeArrayProduto)
  })
})