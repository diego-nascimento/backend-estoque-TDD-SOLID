import {dbGetProduto} from './getProduto'
import {getProdutoRepository} from '../../../protocols/Produtos/getProdutoRespository'
import { IProduto } from '../../../../domain/model/produto'

const fakeProduto: IProduto = {
  id: 1,
 description: 'fake desc',
 name: 'fake name',
 preco: 1223,
 resume: 'fake resume',
 categoria: {
   id: 1,
   name: 'fake name',
   photo:{
     id: 1,
     url: 'fake url'
   }
 },
 photos:[
   {
     id: 1,
     url: 'fake url'
   }
 ]
}

const makeSlug = () =>{
  class slug implements getProdutoRepository{
    async get(produto: number): Promise<IProduto>{
      return Promise.resolve(fakeProduto)
    }
  }
  return new slug
}

describe('Get Produto Data', ()=>{
  test('Should throw if get throw', async()=>{
    const slug = makeSlug()
    const sut = new dbGetProduto(slug)
    jest.spyOn(slug, 'get').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.get(1)
    await expect(promise).rejects.toThrowError()
  })

  test('Should have been called with correct values', async()=>{
    const slug = makeSlug()
    const sut = new dbGetProduto(slug)
    const spy = jest.spyOn(slug, 'get')
    await sut.get(1)
    expect(spy).toHaveBeenCalledWith(1)
  })

  test('Should return a IProduto object if success', async()=>{
    const slug = makeSlug()
    const sut = new dbGetProduto(slug)
    const response = await sut.get(1)
    expect(response).toEqual(fakeProduto)
  })
})