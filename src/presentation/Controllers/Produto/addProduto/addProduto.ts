import { ProdutoCategoriasEntry } from '../../../../domain/usercases/Produto/addProduto'
import {IProduto, badRequest, httpRequest, ok, serverError, Icontrollers, ProdutoPhotoEntry, addProdutouseCase,httpResponse } from './protocols'


export class addProduto implements Icontrollers{
  private addProdutoUSE: addProdutouseCase

  constructor(addProdutoUse: addProdutouseCase){
    this.addProdutoUSE = addProdutoUse
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFields = ['name', 'description', 'resume', 'photos', 'categorias', 'preco']

    for (const field of requiredFields) {
      if(!httpRequest.body[field]){
        return badRequest(Error('Missing Param: ' + field))
      }
    }
    
      const { name, description, resume, preco } = httpRequest.body
      const categoriasData: Array<number> = httpRequest.body.categorias;

    const categorias: Array<ProdutoCategoriasEntry> = categoriasData.map(id =>{
      return{
        id: id
      }
    })
    const photosData: Array<number> = httpRequest.body.photos
    const photos: Array<ProdutoPhotoEntry> = photosData.map(id =>{
      return{
        id: id
      }
    })

    const response: IProduto = await this.addProdutoUSE.add({
      name, description, resume, photos, categorias, preco
    })

    return ok(response)
    } catch (error) {
      return serverError(error)
    }
    
  }
}