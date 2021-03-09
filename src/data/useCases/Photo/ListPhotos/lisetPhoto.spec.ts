import {dbListPhoto} from './listPhoto'
import {listPhotoRepository} from '../../../protocols/Photo/ListPhotoRepository'
import { IPhoto } from '../../../../domain/model/Photo'

const fakePhoto: IPhoto = {
  id: 1,
  url: 'fake url'
}

const fakeListPhotos: Array<IPhoto> = [
  fakePhoto, fakePhoto
]
const makeSlug = ()=>{
  class slug implements listPhotoRepository{
    async list(): Promise<Array<IPhoto>>{
      return Promise.resolve(fakeListPhotos)
    }
  }
  return new slug
}

describe('List Photos', ()=>{
  test('Should throws if list Throws', async ()=>{
    const slug = makeSlug()
    const sut = new dbListPhoto(slug)
    jest.spyOn(slug, 'list').mockImplementationOnce(()=>{
      throw new Error
    })

    const promise = sut.handle()
    await expect(promise).rejects.toThrowError()
  })

  test('Should return a List photo if list successed ', async ()=>{
    const slug = makeSlug()
    const sut = new dbListPhoto(slug)
    const response = await sut.handle()
     expect(response).toEqual(fakeListPhotos)
  })
})