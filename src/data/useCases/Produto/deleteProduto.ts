import {deleteProduto} from '../../../domain/usercases/Produto/deleteProduto'
import {deleteProdutoRepository} from '../../protocols/Produtos/deleteProdutoRepository'

export class dbDeleteProduto implements deleteProduto{
  private readonly deleteProdutoRepo: deleteProdutoRepository

  constructor(deleteProdutoRepo:deleteProdutoRepository){
    this.deleteProdutoRepo = deleteProdutoRepo
  }

  async delete(produto: number):Promise<boolean>{
    return await this.deleteProdutoRepo.delete(produto)
  }
}