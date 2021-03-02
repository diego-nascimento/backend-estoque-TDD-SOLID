import {IPhoto, IPhotoEntry, PrismaClient, addPhotoRepository} from './protocols'

const Prisma = new PrismaClient()

export class addPhotoPostGres implements addPhotoRepository{
  async add(photo: IPhotoEntry, key: string): Promise<IPhoto>{
    try {
      const result = await Prisma.photo.create({
        data:{
          url: photo.url,
          key: key
        }
      })
      const response: IPhoto = {
        id: result.id,
        url: result.url,
      }
      return response
    } catch (error) {
      throw new Error(error)
    }
    
  }
}