import { IProduto } from '../../../../domain/model/produto';
import {listProdutoCategoriaRepository} from '../../../protocols/Produtos/listProdutoCategoriaRepository'
import {ListProdutosCategoria} from '../../../../domain/usercases/Produto/listProdutos-Categoria'


export class dbListProdutoCategoria implements ListProdutosCategoria{
  private readonly listProdutoCatRepo: listProdutoCategoriaRepository

  constructor(listProdutoCatRepo: listProdutoCategoriaRepository){
    this.listProdutoCatRepo = listProdutoCatRepo
  }

  async list(categoria: number, page: number): Promise<Array<IProduto>>{
    return this.listProdutoCatRepo.list(categoria, page)
  }
}