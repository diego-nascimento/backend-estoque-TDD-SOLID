import {updateCategoria, updateCategoriaPostGres, dbUpdateCategoria} from '../protocols'

export const  updateCategoriaFactory = () =>{
  const updateCategoriaInfra = new updateCategoriaPostGres
  const updateCategoriaData = new dbUpdateCategoria(updateCategoriaInfra)
  const updateCategoriaPresentation = new updateCategoria(updateCategoriaData);
  return updateCategoriaPresentation
}