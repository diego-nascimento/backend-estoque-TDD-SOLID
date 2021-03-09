import {deletePhotoCase} from '../../../../domain/usercases/Photo/deletePhoto'
import { IdeleteFile } from '../../../../infra/Files/protocols'
import { deletePhotoRepository } from '../../../protocols/Photo/deletePhotoRepository'

export class dbdeletePhoto implements deletePhotoCase{
  private deletePhotoRepo : deletePhotoRepository
  private DeleteFile: IdeleteFile


  constructor(deletePhotoRepo: deletePhotoRepository, deleteFile: IdeleteFile){
    this.deletePhotoRepo = deletePhotoRepo
    this.DeleteFile = deleteFile
  }

  async handle(photo: number): Promise<boolean>{
    const key = await this.deletePhotoRepo.delete(photo)
    return await this.DeleteFile.delete(key)
  }
}