import { ICategoriaEntry, Icategoria, PrismaClient, updateCategoriaRepository} from './protocols'

const prisma = new PrismaClient()

export class updateCategoriaPostGres implements updateCategoriaRepository{

  async update(categoria_id: number, categoria: ICategoriaEntry):Promise<Icategoria> {
    try {
      const teste = await prisma.categoria.findUnique({
        where:{
          id: categoria_id
        }
      })

      if(!teste){
        throw new Error('Selected Category not exists')
      }

     const response =  await prisma.categoria.update({
       where: {
         id: categoria_id
       },
       data:{
         name: categoria.name,
         photoId: categoria.photo
         
       },
       include:{
         photos: true
       }
     })

     const categoriaUpdated: Icategoria = {
       id: response.id,
       name: response.name,
       photo: {
         id: response.photos?.id,
         url: response.photos?.url
       }
     }
     return categoriaUpdated

    } catch (error) {
      throw new Error(error)
    }
   
  }
}