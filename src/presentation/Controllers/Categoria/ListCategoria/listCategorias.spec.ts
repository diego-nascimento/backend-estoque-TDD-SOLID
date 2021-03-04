
import {ListCategorias} from '../../../../domain/usercases/Categoria/ListCategorias'
import { Icategoria } from '../../../../domain/model/categoria'
import {ListCategoria} from './listCategorias'
import { httpRequest, serverError } from '../addCategoria/protocols'

const fakeCategoria: Icategoria = {
  id: 1,
  name: 'fake name',
  photo: {
    id: 1,
    url: 'fake url'
  }
}

const fakeArray: Array<Icategoria> = [
  fakeCategoria
]

const makeListCategoriasUsecaseSlug = ()=>{
  class listCategoriasSlug implements ListCategorias{
    async handle(): Promise<Array<Icategoria>>{
      return new Promise(resolve => resolve(fakeArray))
    }
  }
  return new listCategoriasSlug
}

describe('List Categorias', ()=>{
  test('Should return 500 if something goes wrong', async ()=>{
    const sut = new ListCategoria(makeListCategoriasUsecaseSlug())
    const servererror = serverError(Error('teste'))
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(servererror)))
    const httpRequest: httpRequest = {}
    const response =await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error:"Something went wrong: teste"})
  })

  test('Should return 200 if goes right', async ()=>{
    const sut = new ListCategoria(makeListCategoriasUsecaseSlug())
    const httpRequest: httpRequest = {}
    const response =await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(fakeArray)
  })
})