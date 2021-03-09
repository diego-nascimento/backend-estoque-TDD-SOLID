import {dbDeleteProduto} from './deleteProduto'
import {deleteProdutoRepository} from '../../../protocols/Produtos/deleteProdutoRepository'
import { IProduto } from '../../../../domain/model/produto'
import { IProdutoEntry } from '../../../../domain/usercases/Produto/addProduto'



const makeSlug = () =>{
  class slug implements deleteProdutoRepository{
    async delete(produto: number): Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('Delete Produto Data', ()=>{
  test('Should throw if delete throw', async()=>{
    const slug = makeSlug()
    const sut = new dbDeleteProduto(slug)
    jest.spyOn(slug, 'delete').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.delete(1)
    await expect(promise).rejects.toThrowError()
  })

  test('Should have been called with correct values', async()=>{
    const slug = makeSlug()
    const sut = new dbDeleteProduto(slug)
    const spy = jest.spyOn(slug, 'delete')
    await sut.delete(1)
    expect(spy).toHaveBeenCalledWith(1)
  })

  test('Should return true if success', async()=>{
    const slug = makeSlug()
    const sut = new dbDeleteProduto(slug)
    const response = await sut.delete(1)
    expect(response).toEqual(true)
  })
})