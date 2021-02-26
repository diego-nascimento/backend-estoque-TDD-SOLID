import { IPhoto } from "../../../domain/model/Photo";
import { getPhotouseCase } from "../../../domain/usercases/Photo/getPhoto";
import { getPhotoRepository } from "../../protocols/Photo/getPhoto";


export class dbgetPhoto implements getPhotouseCase{
  private getPhotoRepo: getPhotoRepository

  constructor(getPhotoRepo: getPhotoRepository){
    this.getPhotoRepo = getPhotoRepo
  }

  async get(photo: number): Promise<IPhoto>{
    return await this.getPhotoRepo.get(photo)
  }
}