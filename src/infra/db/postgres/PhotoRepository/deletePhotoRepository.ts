import {PrismaClient, deletePhotoRepository, IdeleteFile} from './protocols'

const Prisma = new PrismaClient()

export class deletePhotoPostGres implements deletePhotoRepository{
  private DeleteFile: IdeleteFile

  constructor(deleteFile: IdeleteFile){
    this.DeleteFile = deleteFile
  }
  async delete(photo: number): Promise<boolean>{
   try {
    const teste = await Prisma.photo.findUnique({
      where: {
        id: photo
      }
    })

    if(!teste){
      throw new Error('Photo do not exist')
    }

    this.DeleteFile.delete(teste.key)
    const response = await Prisma.photo.delete({
      where: {
        id: photo
      }
    })
    
    return response ? true: false
   } catch (error) {
     throw new Error(error)
   }
  }
}