import {dbAddProduto, addProduto, addProdutoPostGres} from '../protocols'

export const addProdutoFactory = ()=>{
  const addProdutoInfra = new addProdutoPostGres
  const addProdutoData = new dbAddProduto(addProdutoInfra)
  const addProdutoPresentation = new addProduto(addProdutoData)

  return addProdutoPresentation
}