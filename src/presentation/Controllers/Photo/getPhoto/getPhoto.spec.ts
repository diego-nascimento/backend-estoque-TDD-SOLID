import {getPhoto} from './getPhoto'
import {getPhotouseCase} from '../../../../domain/usercases/Photo/getPhoto'
import { httpRequest, IPhoto, serverError } from '../addPhoto/protocols'

const fakePhoto : IPhoto = {
  id: 1,
  url: 'fake url'
}

const makegetPhotouseCase = ()=>{
  class getPhotouseCaseSlug implements getPhotouseCase{
    async get(photo: number): Promise<IPhoto>{
      return new Promise(resolve=> resolve(fakePhoto))
    }
  }
  return new getPhotouseCaseSlug
}

describe('getPhoto', ()=>{
  test('Should return 400 if no id is provided', async ()=>{
    const sut = new getPhoto(makegetPhotouseCase())
    const httpRequest: httpRequest = {
      params:{

      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({"Error": "Bad Request: Missing Param: id"})
  })

  test('Should return 500 is something goes wrong',async ()=>{
    const slug = makegetPhotouseCase()
    const sut = new getPhoto(slug)
    jest.spyOn(slug, 'get').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const httpRequest: httpRequest = {
      params:{
        id: 2
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({"Error": "Something went wrong: teste"})
  })

  test('Should return 200 if goes right', async ()=>{
    const sut = new getPhoto(makegetPhotouseCase())
    const httpRequest: httpRequest = {
      params:{
        id: 2
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(fakePhoto)
  })
})