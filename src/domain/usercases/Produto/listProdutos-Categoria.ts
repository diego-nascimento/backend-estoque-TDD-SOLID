import { IProduto } from "../../model/produto";

export interface ListProdutosCategoria{
  list(categoria: number): Promise<Array<IProduto>>
}