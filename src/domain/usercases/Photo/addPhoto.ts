import {IPhoto} from '../../model/Photo'

export interface IPhotoEntry{
  url: string
}

export interface addPhotoCase{
  handle(photo: IPhotoEntry): Promise<IPhoto>
}