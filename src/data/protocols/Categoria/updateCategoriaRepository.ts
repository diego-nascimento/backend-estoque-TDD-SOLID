import { Icategoria } from "../../../domain/model/categoria";
import { ICategoriaEntry } from "../../../domain/usercases/Categoria/addCategoria";

export interface updateCategoriaRepository {
  update(categoria_id: number, categoria: ICategoriaEntry): Promise<Icategoria>
}