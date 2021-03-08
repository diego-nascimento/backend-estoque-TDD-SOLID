import { Icategoria } from '../../../../domain/model/categoria'
import { ICategoriaEntry } from '../../../../domain/usercases/Categoria/addCategoria'
import { addCategoriaRepository } from '../../../protocols/Categoria/addCategoriaRepository'
import {dbAddCategoria} from './addCategoria'

const fakeCategoria: Icategoria = {
  id: 1,
  name: 'fake name',
  photo:{
    id: 1,
    url: 'fake url'
  }
}

const categoriaEntry: ICategoriaEntry = {
  name: 'teste name',
  photo: 2
}

const makeSlug = ()=>{
  class addCategoriaSlug implements addCategoriaRepository{
    async add(categoria: ICategoriaEntry): Promise<Icategoria>{
      return Promise.resolve(fakeCategoria)
    }
  }
  return new addCategoriaSlug
}

describe('Add Categoria Data', ()=>{
  test('Throw if add throws', async ()=>{
    const slug  = makeSlug()
    const sut = new dbAddCategoria(slug)
    jest.spyOn(slug, 'add').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const promise  =  sut.handle(categoriaEntry)
    await expect(promise).rejects.toThrow()
  })

  test('return User if success', async ()=>{
    const slug  = makeSlug()
    const sut = new dbAddCategoria(slug)
    
    const response  = await sut.handle(categoriaEntry)
    expect(response).toEqual(fakeCategoria)
  })
})