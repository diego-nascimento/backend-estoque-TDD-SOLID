
import { getProdutoRepository } from '../../../../data/protocols/Produtos/getProdutoRespository'
import {PrismaClient, IProdutoEntry, IProduto, updateProdutoRepository} from './protocols'

const prisma = new PrismaClient()

export class updateProdutoPostGres implements updateProdutoRepository{
  private readonly getProduto: getProdutoRepository

  constructor(getProduto: getProdutoRepository){
    this.getProduto = getProduto
  }


  async update(produto: IProdutoEntry, id: number):Promise<IProduto>{
    try {
      const teste = await prisma.produto.findUnique({
        where: {
          id: id
        }
      })

      if(!teste){
        throw new Error('Product do not exists')
      }
      const deletePhotos =  prisma.produto.update({
        where:{
          id: id
        },
        data:{
          photos:{
            set: []
          }
        }
      })

      const updateProduto = prisma.produto.update({
        where: {
          id: id
        },
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
      await prisma.$transaction([deletePhotos, updateProduto])
      
      return await this.getProduto.get(id)
    } catch (error) {
      throw new Error(error)
    }
  }
}