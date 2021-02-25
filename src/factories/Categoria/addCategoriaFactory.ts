import {addCategoria as addCategoriaPresentation} from '../../presentation/Controllers/Categoria/addCategoria/addCategoria'
import {dbAddCategoria} from '../../data/useCases/Categoria/addCategoria'
import {addCategoriaPostGres} from '../../infra/db/postgres/CategoriaRepository/addCategoriaRepository'


export const addCategoriaFactory = () =>{

  const addCategoriaInfra = new addCategoriaPostGres()
  const addCategoriaData = new dbAddCategoria(addCategoriaInfra)
  const addCategoria = new addCategoriaPresentation(addCategoriaData)
  return addCategoria
}