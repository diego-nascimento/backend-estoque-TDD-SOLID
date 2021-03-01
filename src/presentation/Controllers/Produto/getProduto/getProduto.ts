import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";
import {getProduto} from '../../../../domain/usercases/Produto/getProduto'
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";

export class getProdutoPresentation implements Icontrollers{
  private readonly getProdutouseCcase: getProduto

  constructor (getProdutouseCase: getProduto){
    this.getProdutouseCcase = getProdutouseCase
  }

  async handle(httpRequest: httpRequest):Promise<httpResponse>{
    try {
      if(!httpRequest.params){
        return badRequest(Error('Missing Param: produto'))
      }
      if(httpRequest.params.produto === undefined){
       return badRequest(Error('Missing Param: produto'))
      }
      const produto = parseInt(httpRequest.params.produto)
      const response = await this.getProdutouseCcase.get(produto)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}