import { addEstoqueRepository } from "../../../../data/protocols/Estoque/addEstoqueRepository"
import {PrismaClient} from '@prisma/client'

const prisma  = new PrismaClient()

export class addEstoqueInfra implements addEstoqueRepository{
  async add(produto: number, quantidade: number):Promise<boolean>{
    const response = await prisma.estoque.create({
      data:{
        quantidade: quantidade,
        tipo: 1,
        produto:{
          connect:{
            id: produto
          }
        }
      }
    })

    return response? true: false
  }
}