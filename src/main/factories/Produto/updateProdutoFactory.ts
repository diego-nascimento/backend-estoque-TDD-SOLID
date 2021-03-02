import {dbUpdateProduto, updateProdutoPostGres, updateProdutoPresentation, } from '../protocols'
import {getProdutoPostGres} from '../../../infra/db/postgres/ProdutoRepository/getProdutoRepository'

export const updateProdutoFactory = ()=>{
  const getProdutoInfra= new getProdutoPostGres
  const updateProdutoInfra = new updateProdutoPostGres(getProdutoInfra)
  const updatePRodutoData = new dbUpdateProduto(updateProdutoInfra)
  return new updateProdutoPresentation(updatePRodutoData)
}