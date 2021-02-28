import { IProduto } from "../../model/produto";
import { IProdutoEntry } from "./addProduto";

export interface updateProduto{
  update(produto: IProdutoEntry):Promise<IProduto>
}