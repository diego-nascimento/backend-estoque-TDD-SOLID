import {dbdeletePhoto} from './deletePhoto'
import {deletePhotoRepository} from '../../../protocols/Photo/deletePhotoRepository'
import {IdeleteFile} from '../../../../infra/Files/protocols'

const makeDeleteDBSlug = ()=>{
  class DeleteDbSlug implements deletePhotoRepository{
    async delete(photo: number): Promise<string>{
      return Promise.resolve('Fake Key')
    }
  }
  return new DeleteDbSlug
}

const makeDeleteFile = ()=>{
  class DeleteFileSlug implements IdeleteFile{
    delete(fileName: string):boolean{
      return true
    }
  }
  return new DeleteFileSlug
}

describe('Delete Photo Data', ()=>{
  test('Should throw if delete Photo from db throws', async ()=>{
    const slugDB = makeDeleteDBSlug()
    const slugFile = makeDeleteFile()
    const sut = new dbdeletePhoto(slugDB, slugFile)
    jest.spyOn(slugDB, 'delete').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.handle(1)
    await expect(promise).rejects.toThrowError()
  })

  test('Delete from DB Should have been called with correct values', async ()=>{
    const slugDB = makeDeleteDBSlug()
    const slugFile = makeDeleteFile()
    const sut = new dbdeletePhoto(slugDB, slugFile)
    const spy = jest.spyOn(slugDB, 'delete')
    await sut.handle(1)
    expect(spy).toHaveBeenCalledWith(1)
  })

  test('Should throw if delete Photo File throws', async ()=>{
    const slugDB = makeDeleteDBSlug()
    const slugFile = makeDeleteFile()
    const sut = new dbdeletePhoto(slugDB, slugFile)
    jest.spyOn(slugFile, 'delete').mockImplementationOnce(()=>{
      throw new Error()
    })
    const promise = sut.handle(1)
    await expect(promise).rejects.toThrowError()
  })

  test('Delete File Should have been called with correct values', async ()=>{
    const slugDB = makeDeleteDBSlug()
    const slugFile = makeDeleteFile()
    const sut = new dbdeletePhoto(slugDB, slugFile)
    const spy = jest.spyOn(slugFile, 'delete')
    await sut.handle(1)
    expect(spy).toHaveBeenCalledWith('Fake Key')
  })

  test('Should return true if sucess', async ()=>{
    const slugDB = makeDeleteDBSlug()
    const slugFile = makeDeleteFile()
    const sut = new dbdeletePhoto(slugDB, slugFile)
    const response = await sut.handle(1)
    expect(response).toEqual(true)
  })
})