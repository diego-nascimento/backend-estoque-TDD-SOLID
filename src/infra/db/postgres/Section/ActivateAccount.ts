import { ActivateAccountRepository } from "../../../../data/protocols/Section/ActivateAccount";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export class ActivateAccountDB implements ActivateAccountRepository{
  async activate(code: string): Promise<boolean>{
    try {
      const response = await prisma.ativacao_usuario.findFirst({
        where:{
          hashed: code
        },
      })
      if(!response){
        throw new Error('Error validating Account')
      }
      const result = await prisma.usuario.update({
        where: {
          id: response.usuarioId
        },
        data:{
          active: true
        }
      })
      await prisma.ativacao_usuario.delete({
        where:{
          id: response.id
        }
      })
      return result && true
    } catch (error) {
      throw new Error(error)
    }
  }
}