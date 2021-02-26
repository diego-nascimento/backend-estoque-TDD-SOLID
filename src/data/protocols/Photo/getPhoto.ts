import { IPhoto } from "../../../domain/model/Photo";

export interface getPhotoRepository{
  get(photo: number): Promise<IPhoto>
}