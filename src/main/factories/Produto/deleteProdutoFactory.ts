import {deleteProdutoPostGres, deleteProdutoPresentation, dbDeleteProduto} from '../protocols'

export const deleteProdutoFactory = ()=>{
  const deleteProdutoInfra = new deleteProdutoPostGres
  const deleteProdutoData = new dbDeleteProduto(deleteProdutoInfra)
  return new deleteProdutoPresentation(deleteProdutoData)
}