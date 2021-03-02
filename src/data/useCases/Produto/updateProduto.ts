import { IProduto } from '../../../domain/model/produto';
import { IProdutoEntry } from '../../../domain/usercases/Produto/addProduto';
import {updateProduto} from '../../../domain/usercases/Produto/updateProduto'
import { updateProdutoRepository } from '../../protocols/Produtos/updateProdutoRepository';

export class dbUpdateProduto implements updateProduto{
  private readonly updateProdutoRepo: updateProdutoRepository

  constructor(updateProdutoRepository: updateProdutoRepository){
    this.updateProdutoRepo = updateProdutoRepository;
  }
  
  async update(produto: IProdutoEntry, id: number):Promise<IProduto>{
    return await this.updateProdutoRepo.update(produto, id)
  }
}