import {ListProduto} from '../../../presentation/Controllers/Produto/ListProduto/listProduto'
import {dblistProduto} from '../../../data/useCases/Produto/listProduto/listProduto'
import {listProdutoRepo} from '../../../infra/db/postgres/ProdutoRepository/listProdutoRepository'

export const listProdutoFactory = ()=>{
  const listProdutosInfra = new listProdutoRepo
  const listProdutoData = new dblistProduto(listProdutosInfra)
  const ListProdutoPresentation = new ListProduto(listProdutoData)
  return ListProdutoPresentation
}