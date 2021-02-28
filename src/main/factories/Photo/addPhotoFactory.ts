import {addPhotoPostGres, dbAddPhoto, addPhoto} from '../protocols'


export const addPhotoFactory = () =>{
  const addPhotoInfra = new addPhotoPostGres()
  const addPhotoData = new dbAddPhoto(addPhotoInfra);
  const addPhophotoPresentation = new addPhoto(addPhotoData)
  return addPhophotoPresentation
}