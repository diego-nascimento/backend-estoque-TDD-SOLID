import {IsearchUser} from '../../../../data/protocols/Section/searchUser'
import {PrismaClient} from '@prisma/client'
import { IUser } from '../../../../domain/model/user'

const prisma = new PrismaClient()

export class searchUserPostGres implements IsearchUser{
  async search(login: string): Promise<IUser>{
    try {
      const user = await prisma.usuario.findFirst({
        where:{
          email: login
        },select:{
          id: true,
          email: true,
          nome: true,
          password: true,
          active: true
        }
      })
      if(!user){
        throw new Error('User or password do not exists')
      }

      if(user.active === false){
        throw new Error('User not active')
      }
      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}
