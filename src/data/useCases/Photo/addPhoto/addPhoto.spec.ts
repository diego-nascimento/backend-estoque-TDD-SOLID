import {dbAddPhoto} from './addphoto'
import {addPhotoRepository} from '../../../protocols/Photo/addPhotoRepository'
import { IPhotoEntry } from '../../../../domain/usercases/Photo/addPhoto'
import { IPhoto } from '../../../../domain/model/Photo'

const fakePhoto: IPhoto = {
  id: 1,
  url: 'fake url'
}

const fakePhotoEntry: IPhotoEntry ={
  url: 'teste url'
}

const makeSlug = ()=>{
  class slug implements addPhotoRepository{
    add(photo: IPhotoEntry, key: string): Promise<IPhoto>{
      return Promise.resolve(fakePhoto)
    }
  }
  return new slug
}

describe('add Photo', ()=>{
  test('Should throw if add throw', async ()=>{
    const slug = makeSlug()
    const sut = new dbAddPhoto(slug)
    jest.spyOn(slug, 'add').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.handle(fakePhotoEntry, 'photokey')
    await expect(promise).rejects.toThrow()
  })

  test('Should have been called with correct values', async ()=>{
    const slug = makeSlug()
    const sut = new dbAddPhoto(slug)
    const spy = jest.spyOn(slug, 'add')
    await sut.handle(fakePhotoEntry, 'photokey')
    expect(spy).toHaveBeenCalledWith(fakePhotoEntry, 'photokey')
  })

  test('Should return a IPhoto if success', async ()=>{
    const slug = makeSlug()
    const sut = new dbAddPhoto(slug)
    const response = await sut.handle(fakePhotoEntry, 'photokey')
    expect(response).toEqual(fakePhoto)
  })
})