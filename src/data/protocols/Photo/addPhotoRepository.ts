import { IPhoto } from "../../../domain/model/Photo";
import { IPhotoEntry } from "../../../domain/usercases/Photo/addPhoto";

export interface addPhotoRepository{
  add(photo: IPhotoEntry): Promise<IPhoto>
}