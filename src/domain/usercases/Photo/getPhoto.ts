import { IPhoto } from "../../model/Photo";

export interface getPhotouseCase{
  get(photo: number): Promise<IPhoto>
}