import {removeEstoque, removeEstoqueInfra, dbRemoveEstoque, checkAvailableInfra} from '../protocols'


export const removeEstoqueFactory =  () =>{
  const checkAvailable = new checkAvailableInfra
  const removeEstoqueInf = new removeEstoqueInfra(checkAvailable)
  const removeEstoqueData = new dbRemoveEstoque(removeEstoqueInf)
  return new removeEstoque(removeEstoqueData)
}