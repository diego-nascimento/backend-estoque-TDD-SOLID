import {dbDeleteCategoria} from './deleteCategoria'
import {deleteCategoriaRepository} from '../../../protocols/Categoria/deleteCategoriaRepository'

const makeSlug = ()=>{
  class deleteCategoriaSlug implements deleteCategoriaRepository{
    async delete(categoria_id: number):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new deleteCategoriaSlug
}

describe('delete Categoria', () =>{
  test('Throws if delete throws', async ()=>{
    const slug = makeSlug()
    const sut = new dbDeleteCategoria(slug)
    jest.spyOn(slug, 'delete').mockImplementationOnce(()=>{
      return Promise.reject(new Error('teste'))
    })

    const promise = sut.handle(1)
    await expect(promise).rejects.toThrow()
  })

  test('delete return true if success', async ()=>{
    const slug = makeSlug()
    const sut = new dbDeleteCategoria(slug)
    
    const response  = await sut.handle(1)
    expect(response).toBe(true)
  })
})