import {IProduto, PrismaClient, getProdutoRepository, } from './protocols'

const prisma  = new PrismaClient()

export class getProdutoPostGres implements getProdutoRepository{
  async get(produto: number): Promise<IProduto>  {
    try {
      const response = await prisma.produto.findUnique({
        where:{
          id: produto
        },
        include:{
          categoria:{
            include:{
              photos:true
            }
          },
          photos: true
        }
      })
      if (response){
        const Prod: IProduto = {
          description: response?.description,
          id: response?.id,
          name: response?.name,
          resume: response.name,
          preco: response.preco,
          photos: response?.photos.map(photo =>{
            return {
              id: photo.id,
              url: photo.url
            }
          }),
          categorias: response.categoria.map(categoria =>{
            return {
              id: categoria.id,
              name: categoria.name,
              photo: {
                id: categoria.photos?.id,
                url: categoria.photos?.url
              },
            }
          }), 
        }
        return Prod
      }else{
        throw new Error('Produto do not exists')
      }
      
    } catch (error) {
      throw new Error(error)
    }
  }
}