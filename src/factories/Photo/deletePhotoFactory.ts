import {deletePhoto, deletePhotoPostGres, dbdeletePhoto} from '../protocols'

export const deletePhotoFactory = ()=>{
  const deletePhotoInfra = new deletePhotoPostGres
  const deletePhotoData = new dbdeletePhoto(deletePhotoInfra)
  const deletePhotoPresentation = new deletePhoto(deletePhotoData)

  return deletePhotoPresentation

}