import {deleteProdutoRepository, PrismaClient} from './protocols'

const prisma = new PrismaClient()

export class deleteProdutoPostGres implements deleteProdutoRepository{
  async delete(produto: number):Promise<boolean>{
    try {
      const response = await prisma.produto.delete({
        where: {
          id: produto
        }
      })
      return response? true: false
    } catch (error) {
      throw new Error(error)
    }
  }
}