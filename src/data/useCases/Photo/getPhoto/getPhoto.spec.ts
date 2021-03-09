import {dbgetPhoto} from './getPhoto'
import {getPhotoRepository} from '../../../protocols/Photo/getPhoto'
import { IPhoto } from '../../../../domain/model/Photo'

const fakePhoto: IPhoto = {
  id: 1,
  url: 'fake url'
}

const makeSlug = () =>{
  class slug implements getPhotoRepository{
    async get(photo: number): Promise<IPhoto>{
      return Promise.resolve(fakePhoto)
    }
  }
  return new slug
}

describe('Get Especific Photo', ()=>{
  test('Should throw if get Throws', async()=>{
    const slug = makeSlug()
    const sut = new dbgetPhoto(slug)
    jest.spyOn(slug, 'get').mockImplementationOnce(()=>{
      throw new Error
    })
    const promise = sut.get(1)
    await expect(promise).rejects.toThrowError()
  })

  test('Should call get with correct values', async()=>{
    const slug = makeSlug()
    const sut = new dbgetPhoto(slug)
    const spy = jest.spyOn(slug, 'get')
    await sut.get(1)
    expect(spy).toHaveBeenCalledWith(1)
  })

  test('Should return a IPhoto Object if success', async()=>{
    const slug = makeSlug()
    const sut = new dbgetPhoto(slug)
    const response = await sut.get(1)
    expect(response).toEqual(fakePhoto)
  })
})