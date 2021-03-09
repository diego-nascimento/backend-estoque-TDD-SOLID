import {dbUpdateProduto} from './updateProduto'
import {updateProdutoRepository} from '../../../protocols/Produtos/updateProdutoRepository'
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
  class slug implements updateProdutoRepository{
    async update(produto: IProdutoEntry, id: number): Promise<IProduto>{
      return Promise.resolve(fakeProduto)
    }
  }
  return new slug
}

describe('Update Produto Data', ()=>{
  test('Should throw if update throw', async()=>{
    const slug = makeSlug()
    const sut = new dbUpdateProduto(slug)
    jest.spyOn(slug, 'update').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.update(fakeProdutoEntry, 1)
    await expect(promise).rejects.toThrowError()
  })

  test('Should have been called with correct values', async()=>{
    const slug = makeSlug()
    const sut = new dbUpdateProduto(slug)
    const spy = jest.spyOn(slug, 'update')
    await sut.update(fakeProdutoEntry, 1)
    expect(spy).toHaveBeenCalledWith(fakeProdutoEntry, 1)
  })

  test('Should return a IProduto object if success', async()=>{
    const slug = makeSlug()
    const sut = new dbUpdateProduto(slug)
    const response = await sut.update(fakeProdutoEntry, 1)
    expect(response).toEqual(fakeProduto)
  })
})