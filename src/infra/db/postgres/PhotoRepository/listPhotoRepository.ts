import {listPhotoRepository} from './protocols'
import {PrismaClient} from '@prisma/client'
import { IPhoto } from '../../../../domain/model/Photo'

const prisma = new PrismaClient()

export class listPhotoPostGres implements listPhotoRepository{
  async list(): Promise<Array<IPhoto>>{
   try {
    const response = prisma.photo.findMany()
    return response
   } catch (error) {
     throw new Error(error)
   }
  }
}