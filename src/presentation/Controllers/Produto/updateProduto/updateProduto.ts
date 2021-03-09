import { badRequest, httpRequest, httpResponse, Icontrollers, IProduto, ok, serverError } from "../addProduto/protocols";
import {updateProduto} from '../../../../domain/usercases/Produto/updateProduto'
import { IProdutoEntry, ProdutoPhotoEntry } from "../../../../domain/usercases/Produto/addProduto";


export class updateProdutoPresentation implements Icontrollers{
  private readonly updateProdutoUseCase: updateProduto

  constructor(updateProdutoUseCase: updateProduto){
    this.updateProdutoUseCase = updateProdutoUseCase
  }
  
  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredParams = ['name', 'description', 'preco', 'resume', 'categoria', 'photos']

    for (const param of requiredParams) {
      if(!httpRequest.body[param]){
        return badRequest(Error('Missing Param: ' + param))
      }
    }

    if(!httpRequest.params){
      return badRequest(Error('Missing Param: id'))
    }

    if(httpRequest.params['id'] === undefined){
      return badRequest(Error('Missing Param: id'))
    }

    const id: number = parseInt(httpRequest.params.id)
    const {name, description, preco, resume, categoria} = httpRequest.body
    const photosData: Array<number> = httpRequest.body.photos
    const photos: Array<ProdutoPhotoEntry> = photosData.map(id =>{
      return{
        id: id
      }
    })

    const produto: IProdutoEntry = {
      categoria,
      description,
      name, 
      preco, 
      resume,
      photos
    }

    const response: IProduto = await this.updateProdutoUseCase.update(produto, id)
    return ok(response);
    
    } catch (error) {
      return serverError(error)
    }
  }
}