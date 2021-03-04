import {dbAddEstoque, addEstoqueInfra, addEstoque} from '../protocols'

export const addEstoqueFactory = () =>{
  const AddEstoqueInfra = new addEstoqueInfra
  const addEstoqueData = new dbAddEstoque(AddEstoqueInfra)
  return new addEstoque(addEstoqueData)
}

