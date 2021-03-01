import { IProduto } from "../../../../domain/model/produto";
import { addProdutouseCase, IProdutoEntry, ProdutoPhotoEntry } from "../../../../domain/usercases/Produto/addProduto";
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";
import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";
import { IPhotoEntry } from "../../Photo/addPhoto/protocols";


export class addProduto implements Icontrollers{
  private addProdutoUSE: addProdutouseCase

  constructor(addProdutoUse: addProdutouseCase){
    this.addProdutoUSE = addProdutoUse
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFields = ['name', 'description', 'resume', 'photos', 'categoria', 'preco']

    for (const field of requiredFields) {
      if(!httpRequest.body[field]){
        return badRequest(Error('Missing Param: ' + field))
      }
    }
    
    const {name, description, resume, preco} = httpRequest.body
    const categoria = parseInt(httpRequest.body.categoria)
    const photosData: Array<number> = httpRequest.body.photos
    const photos: Array<ProdutoPhotoEntry> = photosData.map(id =>{
      return{
        id: id
      }
    })

    const response: IProduto = await this.addProdutoUSE.add({
      name, description, resume, photos, categoria, preco
    })

    return ok(response)
    } catch (error) {
      return serverError(error)
    }
    
  }
}