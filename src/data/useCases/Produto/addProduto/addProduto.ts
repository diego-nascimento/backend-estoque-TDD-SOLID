import { IProduto } from "../../../../domain/model/produto";
import { addProdutouseCase, IProdutoEntry } from "../../../../domain/usercases/Produto/addProduto";
import { addProdutoRepository } from "../../../protocols/Produtos/addProdutoRepository";


export class dbAddProduto implements addProdutouseCase{
  private addProdutoRepo : addProdutoRepository

  constructor(addProdutoRepo: addProdutoRepository){
    this.addProdutoRepo = addProdutoRepo
  }

  async add(produto: IProdutoEntry): Promise<IProduto>{
    return await this.addProdutoRepo.add(produto)
  }
}