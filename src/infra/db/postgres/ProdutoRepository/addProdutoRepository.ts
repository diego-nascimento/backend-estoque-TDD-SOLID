import { dbAddProduto } from "../../../../data/useCases/Produto/addProduto";
import { IProduto } from "../../../../domain/model/produto";
import {PrismaClient} from '@prisma/client'
import { IProdutoEntry } from "../../../../domain/usercases/Produto/addProduto";
import { addProdutoRepository } from "../../../../data/protocols/Produtos/addProdutoRepository";

const prisma  = new PrismaClient()

export class addProdutoPostGres implements addProdutoRepository{
  async add(produto: IProdutoEntry): Promise<IProduto>{
    try {
      const response = await prisma.produto.create({
        data:{
          name: produto.name,
          description: produto.description,
          resume: produto.resume,
          photos:{
            connect: produto.photos
          }
        },include:{
          photos: true
        }
      })
      
      const newProduto: IProduto ={
        description: response.description,
        id: response.id,
        name: response.name,
        resume: response.resume,
        photos: response.photos.map(photo =>{
          return {
            id: photo.id,
            url: photo.url
          }
        }) 
      }
      return newProduto
    } catch (error) {
      throw new error
    }
  }
}