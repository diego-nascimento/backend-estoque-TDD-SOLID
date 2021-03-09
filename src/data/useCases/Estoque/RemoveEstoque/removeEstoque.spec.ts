import {dbRemoveEstoque} from './removeEstoque'
import {removeEstoqueRepository} from '../../../protocols/Estoque/removeEstoqueRepository'

const makeSlug = ()=>{
  class slug implements removeEstoqueRepository{
    async remove(produto: number, quantidade: number):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('Remove from Stock', ()=>{
  test('Should throws if remove throws', async ()=>{
    const slug = makeSlug()
    const sut = new dbRemoveEstoque(slug)
    jest.spyOn(slug, 'remove').mockImplementationOnce(()=>{
      throw new Error
    })
    const data = {
      produto: 1,
      quantidade :20
    }
    const promise = sut.remove(data.produto, data.quantidade)
    await expect(promise).rejects.toThrow()
  })

  test('Should have been called with correct values', async ()=>{
    const slug = makeSlug()
    const sut = new dbRemoveEstoque(slug)
    const spy = jest.spyOn(slug, 'remove')
    const data = {
      produto: 1,
      quantidade :20
    }
    await sut.remove(data.produto, data.quantidade)
    expect(spy).toHaveBeenCalledWith(data.produto, data.quantidade)
  })

  test('Should return true if success', async ()=>{
    const slug = makeSlug()
    const sut = new dbRemoveEstoque(slug)
    const data = {
      produto: 1,
      quantidade :20
    }
    const response = await sut.remove(data.produto, data.quantidade)
    expect(response).toEqual(true)
  })
  
})