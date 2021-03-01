import { IProduto } from "../../../domain/model/produto";


export interface getProdutoRepository {
  get(produto: number): Promise<IProduto>
}