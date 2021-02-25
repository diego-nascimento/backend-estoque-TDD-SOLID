import { Icategoria } from "../../model/categoria";
import { ICategoriaEntry } from "./addCategoria";


export interface updateCategoriaCase{
  handle(categoria_id: number, categoria: ICategoriaEntry): Promise<Icategoria>
}