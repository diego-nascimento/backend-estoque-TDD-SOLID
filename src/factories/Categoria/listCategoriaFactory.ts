import {listCategoriaPostGres} from '../../infra/db/postgres/CategoriaRepository/listCategoriaRepository'
import {dbListCategoria} from '../../data/useCases/Categoria/ListCategoria'
import {ListCategoria} from '../../presentation/Controllers/Categoria/ListCategoria/listCategorias'

export const ListCategoriaFactory=() =>{
  const listCategoriaInfra = new listCategoriaPostGres();
  const ListCategoriaData = new dbListCategoria(listCategoriaInfra)
  const ListCategoriaPresentation = new ListCategoria(ListCategoriaData)
  return ListCategoriaPresentation
}