import {dbCountEstoque} from './countEstoque'
import {countEstoqueRepository} from '../../../protocols/Estoque/countEstoqueRepository'

const makeSlug = () =>{
  class slug implements countEstoqueRepository{
    async count(produto: number): Promise<number>{
      return Promise.resolve(15)
    }
  }
  return new slug
}

describe('Count Stock', ()=>{
  test('throw if count throws', async ()=>{
    const slug = makeSlug()
    const sut = new dbCountEstoque(slug)

    jest.spyOn(slug, 'count').mockImplementationOnce(()=>{
      throw new Error()
    })

    const promise = sut.Count(1)
    await expect(promise).rejects.toThrow()
  })

  test('Check Should be called with correct value', async ()=>{
    const slug = makeSlug()
    const sut = new dbCountEstoque(slug)
    const spy = jest.spyOn(slug, 'count')
    await sut.Count(1)
    expect(spy).toHaveBeenCalledWith(1)
  })

  test('Should return a number if success', async ()=>{
    const slug = makeSlug()
    const sut = new dbCountEstoque(slug)
    const response = await sut.Count(1)
    expect(response).toEqual(15)
  })
})