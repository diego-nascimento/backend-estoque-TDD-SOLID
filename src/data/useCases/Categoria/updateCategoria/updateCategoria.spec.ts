import {dbUpdateCategoria} from './updateCategoria'
import {updateCategoriaRepository} from '../../../protocols/Categoria/updateCategoriaRepository'
import { ICategoriaEntry } from '../../../../domain/usercases/Categoria/addCategoria'
import { Icategoria } from '../../../../domain/model/categoria'

const fakeCategoria:Icategoria = {
  id: 1,
  name: 'fake name',
  photo: {
    id: 1,
    url: 'fake url'
  }
}

const makeSlug = ()=>{
  class Slug implements updateCategoriaRepository{
    async update(categoria_id: number, categoria: ICategoriaEntry): Promise<Icategoria>{
      return Promise.resolve(fakeCategoria)
    }
  }
  return new Slug
}

describe('Update Categoria Data', ()=>{
  test('Throws if update throws', async()=>{
    const slug = makeSlug()
    const sut = new dbUpdateCategoria(slug)
    jest.spyOn(slug, 'update').mockImplementationOnce(()=>{
      return Promise.reject(new Error('teste'))
    })
    const categoriaEntry: ICategoriaEntry = {
      name: 'teste name',
      photo: 2
    }
    const promise = sut.handle(1, categoriaEntry)
    await expect(promise).rejects.toThrow()
  })

  test('Update return Categoria if success', async()=>{
    const slug = makeSlug()
    const sut = new dbUpdateCategoria(slug)
    
    const categoriaEntry: ICategoriaEntry = {
      name: 'teste name',
      photo: 2
    }
    const response = await sut.handle(1, categoriaEntry)
    expect(response).toEqual(fakeCategoria)
  })
})