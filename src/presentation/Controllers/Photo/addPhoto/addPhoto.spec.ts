import { IPhoto } from '../../../../domain/model/Photo'
import {addPhotoCase, IPhotoEntry} from '../../../../domain/usercases/Photo/addPhoto'
import { httpRequest } from '../../../protocols/http'
import {addPhoto} from './addPhoto'

const makeaddPhotoCase = () =>{
  class addPhotoCaseSlug implements addPhotoCase{
    async handle(photo: IPhotoEntry): Promise<IPhoto>{
      const fakePhoto: IPhoto = {
        id: 1,
        url: 'fake url'
      }
      return await new Promise(resolve => resolve(fakePhoto))
    }
  }
  return new addPhotoCaseSlug
}

describe('add Photo', ()=>{

  test('should return 400 if file is not provided', async () => {
    const sut = new addPhoto(makeaddPhotoCase())
    const httpRequest: httpRequest = {
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect (response.body).toEqual({Error: 'Bad Request: Nenhum arquivo foi enviado'})
  })

  test('should return 400 if location is not provided', async () => {
    const sut = new addPhoto(makeaddPhotoCase())
    const httpRequest: httpRequest = {
      file:{
        
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect (response.body).toEqual({Error: 'Bad Request: Nenhum arquivo foi enviado'})
  })

  test('should return 200 photo is created', async () => {
    const sut = new addPhoto(makeaddPhotoCase())
    
    const httpRequest: httpRequest = {
      file: {
        location: 'filename teste',
        key: 'keyteste'
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect (response.body).toEqual({
      id: 1,
      url: 'fake url'
    })
  })
})