import {addCategoriaPostGres, dbAddCategoria, addCategoria} from '../protocols'




export const addCategoriaFactory = () =>{

  const addCategoriaInfra = new addCategoriaPostGres()
  const addCategoriaData = new dbAddCategoria(addCategoriaInfra)
  const addCategoriaPresentation = new addCategoria(addCategoriaData)
  return addCategoriaPresentation
}