import { IPhoto } from '../../../domain/model/Photo';
import {listPhotosUseCase} from '../../../domain/usercases/Photo/listPhoto'
import { listPhotoRepository } from '../../protocols/Photo/ListPhotoRepository';

export class dbListPhoto implements listPhotosUseCase{
  private ListPhotoRepo: listPhotoRepository
  constructor(ListPhotoRepo: listPhotoRepository){
    this.ListPhotoRepo = ListPhotoRepo
  }

  async handle(): Promise<Array<IPhoto>>{
    return await this.ListPhotoRepo.list()
  }
}
