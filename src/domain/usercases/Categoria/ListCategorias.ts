import { Icategoria } from "../../model/categoria";

export interface ListCategorias {
  handle(): Promise<Array<Icategoria>>
}