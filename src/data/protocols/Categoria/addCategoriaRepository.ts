import { Icategoria } from "../../../domain/model/categoria";
import { ICategoriaEntry } from "../../../domain/usercases/Categoria/addCategoria";

export interface addCategoriaRepository{
  add(categoria: ICategoriaEntry): Promise<Icategoria>
}

