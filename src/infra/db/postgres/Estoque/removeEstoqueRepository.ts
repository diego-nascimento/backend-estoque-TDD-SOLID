import { removeEstoqueRepository } from "../../../../data/protocols/Estoque/removeEstoqueRepository"
import {PrismaClient} from '@prisma/client'
import { checkAvailableInfra } from "./checkAvailableRepository"

const prisma  = new PrismaClient()

export class removeEstoqueInfra implements removeEstoqueRepository{
  private readonly checkAvailability: checkAvailableInfra

  constructor(checkAvailableInfra: checkAvailableInfra){
    this.checkAvailability = checkAvailableInfra
  }

  async remove(produto: number, quantidade: number):Promise<boolean>{
    try {
      if(! await this.checkAvailability.check(produto, quantidade)){
        throw new Error('This amount of itens is not available')
      }
      const response = await prisma.estoque.create({
        data:{
          tipo: 0,
          quantidade: quantidade,
          produto:{
            connect: {
              id: produto
            }
          } 
        }
      })
      return response ? true: false
    } catch (error) {
      throw new Error(error)
    }    
  }
}