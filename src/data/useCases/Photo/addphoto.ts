import { IPhoto } from '../../../domain/model/Photo';
import {addPhotoCase, IPhotoEntry} from '../../../domain/usercases/Photo/addPhoto'
import {addPhotoRepository} from '../../protocols/Photo/addPhotoRepository'

export class dbAddPhoto implements addPhotoCase{
  private addPhotoRepo: addPhotoRepository;

  constructor(addPhotoRepo: addPhotoRepository){
    this.addPhotoRepo = addPhotoRepo;
  }

  async handle(photo: IPhotoEntry, key: string): Promise<IPhoto>{
    const response: IPhoto = await this.addPhotoRepo.add(photo, key)
    return response
  }

}