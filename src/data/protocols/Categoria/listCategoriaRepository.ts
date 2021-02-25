import { Icategoria } from "../../../domain/model/categoria";

export interface ListCategoriasRepository{
  List(): Promise<Array<Icategoria>>
}