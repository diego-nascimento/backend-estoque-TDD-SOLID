import { badRequest, httpRequest, httpResponse, Icontrollers, ok, serverError } from "../addProduto/protocols";
import {deleteProduto} from '../../../../domain/usercases/Produto/deleteProduto'

export class deleteProdutoPresentation implements Icontrollers{
  private readonly deleteProdutoData: deleteProduto

  constructor(deleteProdutoData: deleteProduto){
    this.deleteProdutoData = deleteProdutoData
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      if(!httpRequest.params){
        return badRequest(Error('Missing Param: id'))
      }
  
      if(httpRequest.params['id'] === undefined){
        return badRequest(Error('Missing Param: id'))
      }
      const produto:number = parseInt(httpRequest.params.id)
      const response = await this.deleteProdutoData.delete(produto)
      return ok(response)

    } catch (error) {
      return serverError(error)
    }
  }
}