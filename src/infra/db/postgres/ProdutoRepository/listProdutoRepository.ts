import { listProdutoRepository } from "../../../../data/protocols/Produtos/listProdutoRepository";
import { IProduto } from "../../../../domain/model/produto";
import {PrismaClient} from '@prisma/client'
import { IPhoto } from "../../../../domain/model/Photo";

const prisma= new PrismaClient()

export class listProdutoRepo implements listProdutoRepository{
  async list(page: number):Promise<Array<IProduto>>{
    const pageNumber = page - 1
    try {
    const resultsPerPage: number = 10
    const response = await prisma.produto.findMany({
      skip: resultsPerPage * pageNumber,
      take: resultsPerPage,
      include: {
        photos: true,
        categoria: {
          include:{
            photos: true
          }
        }
      }
    })
    const produtos: Array<IProduto> = response.map(produto =>{
      return {
        description: produto.description,
        id: produto.id,
        name: produto.name,
        preco: produto.preco,
        resume: produto.resume,
        categoria:{
          id: produto.categoria.id,
          name: produto.categoria.name,
          photo: {
            id: produto.categoria.photos?.id,
            url: produto.categoria.photos?.url
          }
        },
        photos: produto.photos.map((photo):IPhoto =>{
          return {
            id: photo.id,
            url: photo.url
          }
        })
      }
    })
    return produtos
    } catch (error) {
      throw new Error(error)
    }
  }
}