import {PrismaClient, listProdutoRepository, IProduto, IPhoto} from './protocols'

const prisma= new PrismaClient()

export class listProdutoRepo implements listProdutoRepository{
  async list(page: number):Promise<Array<IProduto>>{
    const pageNumber = page - 1
    try {
    const resultsPerPage: number = 10
    const response = await prisma.produto.findMany({
      skip: resultsPerPage * pageNumber,
      take: resultsPerPage,
      include: {
        photos: true,
        categoria: {
          include:{
            photos: true
          }
        }
      }
    })
    const produtos: Array<IProduto> = response.map(produto =>{
      return {
        description: produto.description,
        id: produto.id,
        name: produto.name,
        preco: produto.preco,
        resume: produto.resume,
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
        photos: produto.photos.map((photo):IPhoto =>{
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