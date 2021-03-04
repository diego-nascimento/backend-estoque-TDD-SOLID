import { checkAvailableRepository } from "../../../../data/protocols/Estoque/ckeckAvailableRepository"
import {PrismaClient} from '@prisma/client'

const prisma  = new PrismaClient()

export class checkAvailableInfra implements checkAvailableRepository{
  async check(produto: number, quantidade: number):Promise<boolean>{
    try {
      const entradas = await prisma.estoque.aggregate({
        sum:{
          quantidade: true
        },
        where:{
          produtoid: produto,
          tipo: 1
        }
      })
      
      const saidas = await prisma.estoque.aggregate({
        sum:{
          quantidade: true
        },
        where:{
          produtoid: produto,
          tipo: 0
        }
      })
      const quantidadeEstoque = entradas.sum.quantidade - saidas.sum.quantidade
      return quantidadeEstoque >= quantidade? true: false
    } catch (error) {
       throw new Error(error)
    } 
  }
}