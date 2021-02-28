import { IProduto } from "../../model/produto";

export interface getProduto{
  get(produto: number):Promise<IProduto>
}