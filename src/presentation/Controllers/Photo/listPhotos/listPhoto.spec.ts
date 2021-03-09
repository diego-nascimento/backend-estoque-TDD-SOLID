import {ListPhotos} from './listPhoto'
import {listPhotosUseCase} from '../../../../domain/usercases/Photo/listPhoto'
import { httpRequest, IPhoto, serverError } from '../addPhoto/protocols'

const fakePhoto = {
  id: 2,
  url: 'fake url'
}
const fakeArray: Array<IPhoto> = [
  fakePhoto
]

const makeListPhotoSlug =() =>{
  class listPhotoUseCAseSlug implements listPhotosUseCase{
    async handle(): Promise<Array<IPhoto>>{
      
      return await new Promise(resolve =>resolve(fakeArray))
    }
  }

  return new listPhotoUseCAseSlug
}

describe('List Photo', ()=>{
  test('Should return 500 if something goes wrong', async ()=>{
    const slug = makeListPhotoSlug()
    const sut = new ListPhotos(slug)
    jest.spyOn(slug, 'handle').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const httpRequest: httpRequest = {}

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({ Error: 'Something went wrong: teste' })
  })

  test('Should return 200 if something goes wrong', async ()=>{
    const sut = new ListPhotos(makeListPhotoSlug())
    
    const httpRequest: httpRequest = {}

    const response = await sut.handle(httpRequest)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(fakeArray)
  })
})