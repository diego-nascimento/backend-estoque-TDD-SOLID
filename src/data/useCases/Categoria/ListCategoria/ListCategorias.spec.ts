import { Icategoria } from '../../../../domain/model/categoria'
import { ListCategoriasRepository } from '../../../protocols/Categoria/listCategoriaRepository'
import {dbListCategoria} from './ListCategoria'

const fakeCategoria: Icategoria = {
  id: 1,
  name: 'fake name',
  photo: {
    id: 1,
    url: 'fake url'
  }
}
const fakeListCategoria = [
  fakeCategoria
]

const makeListCatSlug = ()=>{
  class slug implements ListCategoriasRepository{
    async List():Promise<Array<Icategoria>>{
      return Promise.resolve(fakeListCategoria)
    }
  }
  return new slug
}

describe('List Categorias Data', ()=>{
  test('Throws if list Throws', async ()=>{
    const slug = makeListCatSlug()
    const sut = new dbListCategoria(slug)
    jest.spyOn(slug, 'List').mockImplementationOnce(()=>{
      return Promise.reject(new Error('teste'))
    })
    const promise = sut.handle()
    await expect(promise).rejects.toThrow()
  })

  test('Return a Categoria List if success', async ()=>{
    const slug = makeListCatSlug()
    const sut = new dbListCategoria(slug)
    const response = await  sut.handle()
    expect(response).toEqual(fakeListCategoria)
  })
})