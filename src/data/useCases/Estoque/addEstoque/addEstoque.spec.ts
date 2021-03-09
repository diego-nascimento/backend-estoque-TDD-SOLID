import {dbAddEstoque} from './addEstosque'
import {addEstoqueRepository} from '../../../protocols/Estoque/addEstoqueRepository'

const makeSlug = ()=>{
  class slug implements addEstoqueRepository{
    add(produto: number, quantidade: number):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('add to Stock', ()=>{
  test('throw if add throws', async ()=>{
    const slug = makeSlug()
    const sut = new dbAddEstoque(slug)
    jest.spyOn(slug, 'add').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.add(1, 2)
    await expect(promise).rejects.toThrow()
  })

  test('return true if success', async ()=>{
    const slug = makeSlug()
    const sut = new dbAddEstoque(slug)
    
    const response = await sut.add(1, 2)
    expect(response).toEqual(true)
  })
})