import {deletePhoto} from './deletePhoto'
import {deletePhotoCase} from '../../../../domain/usercases/Photo/deletePhoto'
import { httpRequest } from '../../../protocols/http'
import { serverError } from '../../../helpers/http-helpers'

import {dbgetPhoto} from '../../../../factories/protocols'
import { IPhoto } from '../addPhoto/protocols'
import { getPhotoRepository } from '../../../../data/protocols/Photo/getPhoto'
import { IdeleteFile } from '../../../../util/protocols'
import { deleteFile } from '../../../../util/deleteFile'


const makeDeletePhotoCase = ()=>{
  class deletePhotoCaseSlug implements deletePhotoCase{
    async handle(photo: number): Promise<boolean>{
    return await new Promise(resolve => resolve(true))
    }
  }
  return new deletePhotoCaseSlug
}

const fakePhoto: IPhoto ={
  id: 1,
  url: 'fake url'
}


const makegetPhotoRepo = ()=>{
  class getPhotoRepoSlug implements getPhotoRepository{
    async get(photo: number): Promise<IPhoto>{

      return new Promise(resolve=> resolve(fakePhoto))
    }
  }
  return new getPhotoRepoSlug
}

const makedeleteFileSlug = ()=>{
  class deleteFileSlug implements IdeleteFile{
    delete(fileName: string): boolean{

      return true
    }
  }
  return new deleteFileSlug
}



describe('deletePhoto', ()=>{
  test('shoudl return 400 if no photo param is provided', async ()=>{
    const getPhotoInfra = makegetPhotoRepo()
    const getPhotoData = new dbgetPhoto(getPhotoInfra)
    const deleteFile = makedeleteFileSlug()
    jest.spyOn(deleteFile, 'delete').mockReturnValueOnce(true)
    const sut = new deletePhoto(makeDeletePhotoCase(), getPhotoData, deleteFile)
    const httpRequest: httpRequest = {
      params:{
        
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: id'})
  })

  test('shoudl return 500 if photo could not be deleted', async ()=>{
    const getPhotoInfra = makegetPhotoRepo()
    const getPhotoData = new dbgetPhoto(getPhotoInfra)
    const deleteFile = makedeleteFileSlug()
    jest.spyOn(deleteFile, 'delete').mockReturnValueOnce(true)
    const sut = new deletePhoto(makeDeletePhotoCase(), getPhotoData, deleteFile)
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
    const getPhotoInfra = makegetPhotoRepo()
    const getPhotoData = new dbgetPhoto(getPhotoInfra)
    const deleteFile = makedeleteFileSlug()
    jest.spyOn(deleteFile, 'delete').mockReturnValueOnce(true)
    const sut = new deletePhoto(makeDeletePhotoCase(), getPhotoData, deleteFile)
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
    const getPhotoInfra = makegetPhotoRepo()
    const getPhotoData = new dbgetPhoto(getPhotoInfra)
    const deleteFile = makedeleteFileSlug()
    jest.spyOn(deleteFile, 'delete').mockReturnValueOnce(false)
    const sut = new deletePhoto(makeDeletePhotoCase(), getPhotoData, deleteFile)
    const httpRequest: httpRequest = {
      params:{
        id: 1
      }
    }
    
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: "Something went wrong: Arquivo não conseguiu ser deletado"})
  })

})


