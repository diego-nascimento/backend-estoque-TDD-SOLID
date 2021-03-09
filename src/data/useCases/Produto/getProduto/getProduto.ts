import {getProdutoRepository} from '../../../protocols/Produtos/getProdutoRespository'
import {getProduto} from '../../../../domain/usercases/Produto/getProduto'
import { IProduto } from '../../../../domain/model/produto'

export class dbGetProduto implements getProduto{
  private readonly getProdutoRepository: getProdutoRepository
  
  constructor(getProdutoRepo: getProdutoRepository){
    this.getProdutoRepository = getProdutoRepo
  }
  async get(produto: number): Promise<IProduto> {
    return this.getProdutoRepository.get(produto)
  }
}