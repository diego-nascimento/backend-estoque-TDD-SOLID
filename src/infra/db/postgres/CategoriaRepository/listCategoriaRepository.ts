import { Icategoria, PrismaClient, ListCategoriasRepository} from './protocols'

const prisma = new PrismaClient()

export class listCategoriaPostGres implements ListCategoriasRepository{

  async List():Promise<Array<Icategoria>>{
    const result = await prisma.categoria.findMany({
      include:{
        photos: true
      }
    })
    const response: Array<any> = result.map(categoria =>{
      const {id, name} = categoria
      const photo = {
          id: categoria.photos?.id,
          url: categoria.photos?.url
        }
      
      return {
        id,  name, photo
      }
    })
    return response
  }
}