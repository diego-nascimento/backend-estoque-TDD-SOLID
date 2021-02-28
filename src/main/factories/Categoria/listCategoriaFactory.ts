import {dbListCategoria, ListCategoria, listCategoriaPostGres} from '../protocols'

export const ListCategoriaFactory=() =>{
  const listCategoriaInfra = new listCategoriaPostGres();
  const ListCategoriaData = new dbListCategoria(listCategoriaInfra)
  const ListCategoriaPresentation = new ListCategoria(ListCategoriaData)
  return ListCategoriaPresentation
}