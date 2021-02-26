import { IProduto } from "../../../domain/model/produto";
import { IProdutoEntry } from "../../../domain/usercases/Produto/addProduto";

export interface addProdutoRepository{
  add(produto: IProdutoEntry): Promise<IProduto>
}