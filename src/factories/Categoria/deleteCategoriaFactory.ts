import {deleteCategoria, deleteCategoriaRepo, dbDeleteCategoria} from '../protocols'

export const deleteCategoriaFactory = () =>{
  const deleteCategoriaInfra = new deleteCategoriaRepo
  const deleteCategoriaData = new dbDeleteCategoria(deleteCategoriaInfra)
  const deleteCategoriaPresentation = new deleteCategoria(deleteCategoriaData)

  return deleteCategoriaPresentation
}