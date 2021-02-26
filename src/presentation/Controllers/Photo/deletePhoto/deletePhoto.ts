import { getPhotouseCase } from '../../../../domain/usercases/Photo/getPhoto'
import { deleteFile } from '../../../../util/deleteFile'
import { IdeleteFile } from '../../../../util/protocols'
import { IPhoto } from '../addPhoto/protocols'
import {Icontrollers, httpRequest, serverError, badRequest, ok, httpResponse, deletePhotoCase} from './protocols'

export class deletePhoto implements Icontrollers{
  private DeletePhotoCase: deletePhotoCase
  private getPhotouseCase: getPhotouseCase
  private DeleteFile: IdeleteFile

  constructor(deleteUseCase: deletePhotoCase, getPhotouseCase: getPhotouseCase, deleteFile: IdeleteFile){
    this.DeletePhotoCase = deleteUseCase
    this.getPhotouseCase = getPhotouseCase
    this.DeleteFile = deleteFile
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFields = ['id']

    for (const field of requiredFields) {
      if(!httpRequest.params[field]){
        return badRequest(Error('Missing Param: ' + field))
      }
    }
    const id: number = parseInt(httpRequest.params.id, 10)
    const photo:IPhoto = await this.getPhotouseCase.get(id)
    if(photo.url !== undefined){
      const fileName = photo.url
      if(!this.DeleteFile.delete(fileName)){
        return serverError(Error('Arquivo não conseguiu ser deletado'))
      }
      
    }
    
    const response = await this.DeletePhotoCase.handle(id)
    return ok(response)
    } catch (error) {
      return serverError(error)
    }
    
  }
}