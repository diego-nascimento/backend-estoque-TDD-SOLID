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
          categoriaId: categoria
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
        categoria: {
            id: produto.categoria.id,
            name: produto.categoria.name,
            photo: {
              id: produto.categoria.photos?.id,
              url: produto.categoria.photos?.url
          },
        },
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