import {IProduto, PrismaClient, IProdutoEntry, addProdutoRepository} from './protocols'

const prisma  = new PrismaClient()

export class addProdutoPostGres implements addProdutoRepository{
  async add(produto: IProdutoEntry): Promise<IProduto>{
    try {
      const response = await prisma.produto.create({
        data:{
          name: produto.name,
          description: produto.description,
          resume: produto.resume,
          preco: produto.preco,
          categoria:{
            connect: produto.categorias 
          },
          photos:{
            connect: produto.photos
          }
        },include:{
          photos: true,
          categoria: {
            include:{
              photos: true
            }
          },
        }
      })

      const newProduto: IProduto ={
        description: response.description,
        id: response.id,
        name: response.name,
        preco: response.preco,
        resume: response.resume,
        categorias: response.categoria.map(categoria =>{
          return {
            id: categoria.id,
            name: categoria.name,
            photo: {
              id: categoria.photos?.id,
              url: categoria.photos?.url
            },
          }
        }), 
        photos: response.photos.map(photo =>{
          return {
            id: photo.id,
            url: photo.url
          }
        }) 
      }
      return newProduto
    } catch (error) {
      throw new Error(error)
    }
  }
}