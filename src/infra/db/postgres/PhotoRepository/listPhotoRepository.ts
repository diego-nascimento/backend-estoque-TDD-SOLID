import {PrismaClient, listPhotoRepository, IPhoto} from './protocols'

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