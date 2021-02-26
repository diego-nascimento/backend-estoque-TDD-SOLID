import {getPhotoRepository} from './protocols'
import {PrismaClient} from '@prisma/client'
import { IPhoto } from '../../../../domain/model/Photo'

const Prisma = new PrismaClient()

export class getPhotoPostGres implements getPhotoRepository{
  async get(photo: number): Promise<IPhoto>{
   try {
    
    const response = await Prisma.photo.findUnique({
      where:{
        id: photo
      }
    })
    if(!response){
      throw new Error('Photo provided do not exists')  
    }
    const photoGet: IPhoto = {
      id: response?.id,
      url: response?.url
    }
    return photoGet
   } catch (error) {
     throw new Error(error)
   }
  }
}