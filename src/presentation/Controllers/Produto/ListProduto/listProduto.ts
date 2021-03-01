import { addProdutouseCase } from "../../../../domain/usercases/Produto/addProduto";
import { ok, serverError } from "../../../helpers/http-helpers";
import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";
import {ListProdutouseCase} from '../../../../domain/usercases/Produto/listProduto'


export class ListProduto implements Icontrollers{
  private readonly listProdutouseCase: ListProdutouseCase

  constructor(listProdutouseCase: ListProdutouseCase){
    this.listProdutouseCase = listProdutouseCase
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      let page:number = 1
      if(httpRequest.params && httpRequest.params.page !== undefined){
        page = httpRequest.params['page']
      }
      const response = await this.listProdutouseCase.list(page)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}