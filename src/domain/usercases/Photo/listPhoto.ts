import { IPhoto } from "../../model/Photo";


export interface listPhotosUseCase{
  handle(): Promise<Array<IPhoto>>
}