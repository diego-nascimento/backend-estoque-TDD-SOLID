import {PrismaClient, IProduto, listProdutoCategoriaRepository} from './protocols'

const prisma = new PrismaClient

export class listProdutoCategoriaPostgres implements listProdutoCategoriaRepository{
  async list(categoria: number, page: number): Promise<Array<IProduto>>{
    try {
      const pageNumber = page - 1
      const resultsPerPage: number = 10
      const response = await prisma.produto.findMany({
        skip: resultsPerPage * pageNumber,
        take: resultsPerPage,
        where: {
          categoria: {
            some: {
              id: categoria              
            }
          }
        },
        include:{
          photos: true,
          categoria:{
            include:{
              photos: true
            }
          }
        }
      })
    
      const produtos: Array<IProduto> = response.map((produto):IProduto=>{
        return {
          description: produto.description,
         id: produto.id,
         name: produto.name,
          resume: produto.resume,
          preco: produto.preco,
          categorias: produto.categoria.map(categoria =>{
            return {
              id: categoria.id,
              name: categoria.name,
              photo: {
                id: categoria.photos?.id,
                url: categoria.photos?.url
              },
            }
          }), 
          photos: produto.photos.map(photo =>{
            return {
              id: photo.id,
              url: photo.url
            }
          }) 
        }
      })
      return produtos
    } catch (error) {
      throw new Error(error)
    }
  }
}