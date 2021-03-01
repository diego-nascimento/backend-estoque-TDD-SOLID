import {getProdutoPostGres} from '../../../infra/db/postgres/ProdutoRepository/getProdutoRepository'
import {dbGetProduto} from '../../../data/useCases/Produto/getProduto'
import {getProdutoPresentation} from '../../../presentation/Controllers/Produto/getProduto/getProduto'

export const getProdutoFactory = ()=>{
  const getProdutoInfra = new getProdutoPostGres
  const getProdutoData = new dbGetProduto(getProdutoInfra)
  const getProdutoPres = new getProdutoPresentation(getProdutoData)
  return getProdutoPres
}