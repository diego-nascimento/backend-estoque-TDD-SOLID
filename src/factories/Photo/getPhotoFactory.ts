import {getPhoto, getPhotoPostGres, dbgetPhoto} from '../protocols'

export const getPhotoFactory = ()=>{
  const getPhotoInfra = new getPhotoPostGres
  const getPhotoData = new dbgetPhoto(getPhotoInfra)
  const getPhotoPresentation = new getPhoto(getPhotoData)

  return getPhotoPresentation
}