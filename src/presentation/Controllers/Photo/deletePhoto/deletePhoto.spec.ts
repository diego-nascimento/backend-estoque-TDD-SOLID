import {deletePhoto} from './deletePhoto'
import {deletePhotoCase} from '../../../../domain/usercases/Photo/deletePhoto'
import { httpRequest } from '../../../protocols/http'
import { serverError } from '../../../helpers/http-helpers'




const makeDeletePhotoCase = ()=>{
  class deletePhotoCaseSlug implements deletePhotoCase{
    async handle(photo: number): Promise<boolean>{
    return await new Promise(resolve => resolve(true))
    }
  }
  return new deletePhotoCaseSlug
}






describe('deletePhoto', ()=>{
  test('shoudl return 400 if no photo param is provided', async ()=>{
    const sut = new deletePhoto(makeDeletePhotoCase())
    const httpRequest: httpRequest = {
      params:{
        
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: id'})
  })

  test('shoudl return 500 if photo could not be deleted', async ()=>{
    const sut = new deletePhoto(makeDeletePhotoCase())
    const httpRequest: httpRequest = {
      params:{
        id: 1
      }
    }
    const servererror = serverError(Error('teste'))
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(servererror)))

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('should return 200 if photo is deleted', async ()=>{

    const sut = new deletePhoto(makeDeletePhotoCase())
    const httpRequest: httpRequest = {
      params:{
        id: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(true)
  })

  
  test('should return 500 if file could not be deleted', async ()=>{
    const deletePhotoCaseSlug = makeDeletePhotoCase()
    const sut = new deletePhoto(deletePhotoCaseSlug)
    const httpRequest: httpRequest = {
      params:{
        id: 1
      }
    }  
    jest.spyOn(deletePhotoCaseSlug, 'handle').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: "Something went wrong: teste"})
  })

})


