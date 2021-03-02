import { IProduto } from "../../../domain/model/produto";
import { IProdutoEntry } from "../../../domain/usercases/Produto/addProduto";

export interface updateProdutoRepository{
  update(produto: IProdutoEntry, id: number):Promise<IProduto>
}