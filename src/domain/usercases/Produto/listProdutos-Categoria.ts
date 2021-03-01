import { IProduto } from "../../model/produto";

export interface ListProdutosCategoria{
  list(categoria: number, page: number): Promise<Array<IProduto>>
}