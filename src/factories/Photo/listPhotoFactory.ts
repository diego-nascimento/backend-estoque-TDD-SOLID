import {ListPhotos, listPhotoPostGres, dbListPhoto} from '../protocols'

export const ListPhotoFactory = () =>{
  const ListPhotoInfra= new listPhotoPostGres
  const ListPhotoData = new dbListPhoto(ListPhotoInfra)
  const ListPhotoPresentation  = new ListPhotos(ListPhotoData)

  return ListPhotoPresentation
}