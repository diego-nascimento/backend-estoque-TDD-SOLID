import { IProduto } from '../../../../domain/model/produto';
import {ListProdutouseCase} from '../../../../domain/usercases/Produto/listProduto'
import { listProdutoRepository } from '../../../protocols/Produtos/listProdutoRepository';

export class dblistProduto implements ListProdutouseCase {
  private readonly listProdutoRepo: listProdutoRepository

  constructor(listProdutoRepo: listProdutoRepository){
    this.listProdutoRepo = listProdutoRepo
  }
  async list(page:number):Promise<Array<IProduto>>{
    return this.listProdutoRepo.list(page)
  }
}