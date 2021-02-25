import {deletePhotoCase} from '../../../domain/usercases/Photo/deletePhoto'
import { deletePhotoRepository } from '../../protocols/Photo/deletePhotoRepository'

export class dbdeletePhoto implements deletePhotoCase{
  private deletePhotoRepo : deletePhotoRepository

  constructor(deletePhotoRepo: deletePhotoRepository){
    this.deletePhotoRepo = deletePhotoRepo
  }

  async handle(photo: number): Promise<boolean>{
    return await this.deletePhotoRepo.delete(photo)
  }
}