import { ICategoriaEntry, Icategoria, PrismaClient, addCategoriaRepository} from './protocols'

const prisma = new PrismaClient()

export class addCategoriaPostGres implements addCategoriaRepository{

  async add(categoria: ICategoriaEntry):Promise<Icategoria> {
    try {
      const result = await  prisma.categoria.create({
        data: {
          name: categoria.name,
          photos:{
            connect: {
              id: categoria.photo
            }
          }
        },
        include:{
          photos: true
        }
      })

      const photo = {
          id: result.photos?.id,
          url: result.photos?.url
        }
      
      

      const newCategoria : Icategoria = {
        id: result.id,
        name: result.name,
        photo
        
      }
      return newCategoria

    } catch (error) {
      throw new Error(error)
    }
   
  }
}