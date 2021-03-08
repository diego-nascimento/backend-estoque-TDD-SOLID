import {PrismaClient} from '@prisma/client'
import { SignUpRepository } from '../../../../data/protocols/Section/signUp'
import { IUser } from '../../../../domain/model/user'

const prisma = new PrismaClient()

export class signUpInfra implements SignUpRepository{

  async signUp(username: string, email: string, password: string, email_hashed: string):Promise<IUser>{
    try {
      const teste = await prisma.usuario.findUnique({
        where:{
          email: email
        }
      })
      if(teste){
        throw new Error('Email já utilizado')
      }
      const response = await prisma.usuario.create({
        data:{
          email,
          nome: username,
          password: password
        }
      })

      await prisma.ativacao_usuario.create({
        data:{
          hashed: email_hashed,
          usuario:{
            connect: {
              id: response.id
            }
          }
        }
      })

      return {
        email: response.email,
        nome: response.nome
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}