import { IProduto } from "../../../domain/model/produto";

export interface listProdutoCategoriaRepository{
  list(categoria: number, page: number): Promise<Array<IProduto>>
}