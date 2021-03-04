import {deleteCategoria} from './deleteCategoria'
import {deleteCategoriauseCase} from '../../../../domain/usercases/Categoria/deleteCategoria'
import {serverError } from '../addCategoria/protocols'

const makedeleteCategoriauseCase = ()=>{
  class deleteCategoriauseCaseSlug implements deleteCategoriauseCase{
    async handle(categoria_id: number): Promise<boolean>{
      return await new Promise(resolve => resolve(true))
    }
  }
  return new deleteCategoriauseCaseSlug
}

describe('delete Categoria', ()=>{
  test('should return 400 if no id is provided', async ()=>{
    const sut = new deleteCategoria(makedeleteCategoriauseCase())
    const httpRequest = {
      params:{
        
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing param id'})
  })

  test('should return 500 if something goes wrong', async ()=>{
    const sut = new deleteCategoria(makedeleteCategoriauseCase())
    const httpRequest = {
      params:{
        id: '2'
      }
    }

    const servererror = serverError(Error('teste'))

    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(servererror)))

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('should return 200 if goes ok', async ()=>{
    const sut = new deleteCategoria(makedeleteCategoriauseCase())
    const httpRequest = {
      params:{
        id: '3'
      }
    }
    
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(true)
  })
})