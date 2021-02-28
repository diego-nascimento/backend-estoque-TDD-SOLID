import { IProduto } from "../../model/produto";

export interface ListProduto{
  list():Promise<Array<IProduto>>
}