import { Icategoria } from "./categoria";
import { IPhoto } from "./Photo";

export interface IProduto{
  id: number,
  name: string,
  description: string,
  resume: string
  photos: Array<IPhoto>
  categoria: Icategoria
  preco: number
}