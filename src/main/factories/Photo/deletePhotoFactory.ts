import {deletePhoto, deletePhotoPostGres, dbdeletePhoto} from '../protocols'
import {deleteFileS3} from '../../../infra/Files/S3/deleteFileS3'

export const deletePhotoFactory = ()=>{
  const deleteFileUtil = new deleteFileS3
  const deletePhotoInfra = new deletePhotoPostGres()
  const deletePhotoData = new dbdeletePhoto(deletePhotoInfra, deleteFileUtil)
  const deletePhotoPresentation = new deletePhoto(deletePhotoData)

  return deletePhotoPresentation

}