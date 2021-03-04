import {ListProdutoCategoria} from './listProdutoCategoria'
import {ListProdutosCategoria} from '../../../../domain/usercases/Produto/listProdutos-Categoria'
import { IProduto } from '../../../../domain/model/produto'
import { httpRequest } from '../../../protocols/http'

const fakeProduto: IProduto ={
  description: 'fake desc',
  id: 1,
  name: 'fake name',
  resume: 'fake resume',
  preco: 1.5, 
  categoria: {
    id: 1,
    name: 'fake cat',
    photo:{
      id: 1,
      url: 'fake url'
    }
  },
  photos: [
    {
      id: 1,
      url: 'fake url'
    }
  ]
}

const fakeProdutoArray =[fakeProduto]

const makeListCategoriaSlug = () =>{
  class ListProdutosCategoriaSlug implements ListProdutosCategoria{
    async list(categoria: number, page: number):Promise<Array<IProduto>>{
      return new Promise(resolve => resolve(fakeProdutoArray))
    }
  }
  return new ListProdutosCategoriaSlug
}

describe('Listar Produtos de uma categoria especifica', ()=>{
  test('Should return 400 if no categoria is provided',async ()=>{
    const sut = new ListProdutoCategoria(makeListCategoriaSlug())
    const httpRequest: httpRequest = {
      body: {
       
      },
      params: {
        page: 2
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing param: Categoria'})
  })

  test('Should return 500 if something goes wrong', async ()=>{
    const ProdutoCategoriaSlug = makeListCategoriaSlug()
    const sut = new ListProdutoCategoria(ProdutoCategoriaSlug)
    const httpRequest: httpRequest = {
      body: {
       categoria: 1
      },
      params: {
        page: 2
      }
    }
    jest.spyOn(ProdutoCategoriaSlug, 'list').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('Should return 200 if goes ok', async ()=>{
    const ProdutoCategoriaSlug = makeListCategoriaSlug()
    const sut = new ListProdutoCategoria(ProdutoCategoriaSlug)
    const httpRequest: httpRequest = {
      body: {
       categoria: 1
      },
      params: {
        page: 2
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(fakeProdutoArray)
  })
})