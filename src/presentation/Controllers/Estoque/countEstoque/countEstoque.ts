import { StockEntry } from "../../../../domain/usercases/Estoque/AddEstoque";
import { CountEstoque } from "../../../../domain/usercases/Estoque/AmoutEstoque";
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";
import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";


export class countEstoque implements Icontrollers{
  private readonly countEstoqueDomain: CountEstoque

  constructor(countEstoqueDomain: CountEstoque){
    this.countEstoqueDomain = countEstoqueDomain
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try{
      const requiredField = ['produto']
        for (const field of requiredField) {
          if(!httpRequest.body[field]){
            return badRequest(Error('Missing param ' + field ) )
          }
        }
        const {produto }: StockEntry = httpRequest.body
        const response = await this.countEstoqueDomain.Count(produto)
        return ok(response)
      } catch (error) {
        return serverError(error)
      }
  }
}