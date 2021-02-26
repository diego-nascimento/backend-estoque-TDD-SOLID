import {deletePhoto, deletePhotoPostGres, dbdeletePhoto} from '../protocols'
import {getPhotoPostGres, dbgetPhoto} from '../protocols'
import {deleteFile} from '../../util/deleteFile'

export const deletePhotoFactory = ()=>{
  const deletePhotoInfra = new deletePhotoPostGres
  const deletePhotoData = new dbdeletePhoto(deletePhotoInfra)
  const getPhotoInfra = new getPhotoPostGres
  const getPhotoData = new dbgetPhoto(getPhotoInfra)
  const deleteFileUtil = new deleteFile
  const deletePhotoPresentation = new deletePhoto(deletePhotoData, getPhotoData, deleteFileUtil)

  return deletePhotoPresentation

}