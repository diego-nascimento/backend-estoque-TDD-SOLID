import {addCategoriaPostGres, dbAddCategoria, addCategoriaPresentation} from '../protocols'




export const addCategoriaFactory = () =>{

  const addCategoriaInfra = new addCategoriaPostGres()
  const addCategoriaData = new dbAddCategoria(addCategoriaInfra)
  const addCategoria = new addCategoriaPresentation(addCategoriaData)
  return addCategoria
}