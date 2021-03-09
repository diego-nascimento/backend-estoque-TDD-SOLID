import {PrismaClient, deletePhotoRepository, IdeleteFile} from './protocols'

const Prisma = new PrismaClient()

export class deletePhotoPostGres implements deletePhotoRepository{
  
  async delete(photo: number): Promise<string>{
   try {
    const teste = await Prisma.photo.findUnique({
      where: {
        id: photo
      }
    })

    if(!teste){
      throw new Error('Photo do not exist')
    }

    const response = await Prisma.photo.delete({
      where: {
        id: photo
      }
    })
    
    return response.key
   } catch (error) {
     throw new Error(error)
   }
  }
}