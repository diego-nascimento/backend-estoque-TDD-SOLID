import {dbListProdutoCategoria} from './listProdutoCategoria'
import {listProdutoCategoriaRepository} from '../../../protocols/Produtos/listProdutoCategoriaRepository'
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

const FakeListProduto: Array<IProduto> = [
  fakeProduto
]

const makeSlug = () =>{
  class slug implements listProdutoCategoriaRepository{
    async list(categoria: number, page: number): Promise<Array<IProduto>>{
      return Promise.resolve(FakeListProduto)
    }
  }
  return new slug
}

describe('List Produto from specfic category Data', ()=>{
  test('Should throw if get throw', async()=>{
    const slug = makeSlug()
    const sut = new dbListProdutoCategoria(slug)
    jest.spyOn(slug, 'list').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.list(1, 1)
    await expect(promise).rejects.toThrowError()
  })

  test('Should have been called with correct values', async()=>{
    const slug = makeSlug()
    const sut = new dbListProdutoCategoria(slug)
    const spy = jest.spyOn(slug, 'list')
    await sut.list(1, 1)
    expect(spy).toHaveBeenCalledWith(1, 1)
  })

  test('Should return a array of IProduto objects if success', async()=>{
    const slug = makeSlug()
    const sut = new dbListProdutoCategoria(slug)
    const response = await sut.list(1, 1)
    expect(response).toEqual(FakeListProduto)
  })
})