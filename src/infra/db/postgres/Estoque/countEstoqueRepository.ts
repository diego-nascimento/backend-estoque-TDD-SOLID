import { countEstoqueRepository } from "../../../../data/protocols/Estoque/countEstoqueRepository"
import {PrismaClient} from '@prisma/client'

const prisma  = new PrismaClient()

export class countEstoqueInfra implements countEstoqueRepository{
  

  async count (produto: number):Promise<number>{
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
      return entradas.sum.quantidade - saidas.sum.quantidade
    } catch (error) {
      throw new Error(error)
    }    
  }
}