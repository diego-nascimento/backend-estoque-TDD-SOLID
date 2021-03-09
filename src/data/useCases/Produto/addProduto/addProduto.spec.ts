import {dbAddProduto} from './addProduto'
import {addProdutoRepository} from '../../../protocols/Produtos/addProdutoRepository'
import { IProduto } from '../../../../domain/model/produto'
import { IProdutoEntry } from '../../../../domain/usercases/Produto/addProduto'

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

const fakeProdutoEntry: IProdutoEntry = {
  categoria: 1,
  description: 'test desc',
  name: 'teste name',
  photos: [
    {
      id: 1
    }
  ],
  preco: 12313123,
  resume: 'teste resume'
}

const makeSlug = () =>{
  class slug implements addProdutoRepository{
    async add(produto: IProdutoEntry): Promise<IProduto>{
      return Promise.resolve(fakeProduto)
    }
  }
  return new slug
}

describe('Add Produto Data', ()=>{
  test('Should throw if add throw', async()=>{
    const slug = makeSlug()
    const sut = new dbAddProduto(slug)
    jest.spyOn(slug, 'add').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.add(fakeProdutoEntry)
    await expect(promise).rejects.toThrowError()
  })

  test('Should have been called with correct values', async()=>{
    const slug = makeSlug()
    const sut = new dbAddProduto(slug)
    const spy = jest.spyOn(slug, 'add')
    await sut.add(fakeProdutoEntry)
    expect(spy).toHaveBeenCalledWith(fakeProdutoEntry)
  })

  test('Should return a IProduto object if success', async()=>{
    const slug = makeSlug()
    const sut = new dbAddProduto(slug)
    const response = await sut.add(fakeProdutoEntry)
    expect(response).toEqual(fakeProduto)
  })
})