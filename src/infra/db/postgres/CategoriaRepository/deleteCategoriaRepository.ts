import { serverError } from '../../../../presentation/helpers/http-helpers'
import {deleteCategoriaRepository,  PrismaClient} from './protocols'

const prisma = new PrismaClient()

export class deleteCategoriaRepo implements deleteCategoriaRepository{
  async delete(categoria_id: number): Promise<boolean>{
    try {
      const teste = await prisma.categoria.findUnique({
        where: {
          id: categoria_id
        }
      })
      if(!teste){
        throw new Error('Provided category do not exist')
      }
      const response = await prisma.categoria.delete({
        where:{
          id: categoria_id
        }
      })
      return response? true: false
    
    } catch (error) {
      throw new Error(error)
    }
   
  }
}