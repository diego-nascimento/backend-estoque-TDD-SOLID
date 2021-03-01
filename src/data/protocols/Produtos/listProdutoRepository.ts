import { IProduto } from "../../../domain/model/produto";

export interface listProdutoRepository{
  list(page:number):Promise<Array<IProduto>>
}