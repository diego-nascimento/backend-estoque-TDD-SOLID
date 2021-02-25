import { IPhoto } from "../../../domain/model/Photo";


export interface listPhotoRepository{
  list(): Promise<Array<IPhoto>>
}