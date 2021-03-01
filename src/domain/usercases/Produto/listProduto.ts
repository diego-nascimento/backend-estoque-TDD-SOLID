import { IProduto } from "../../model/produto";

export interface ListProdutouseCase{
  list(page: number):Promise<Array<IProduto>>
}