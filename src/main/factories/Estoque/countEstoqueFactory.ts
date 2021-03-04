import {countEstoque, countEstoqueInfra, dbCountEstoque} from '../protocols'


export const countEstoqueFactory = () =>{
  const countEstoqueInf = new countEstoqueInfra
  const countEstoqueData= new dbCountEstoque(countEstoqueInf)
  return new countEstoque(countEstoqueData)
}