import { StockEntry } from "../../../../domain/usercases/Estoque/AddEstoque";
import { checkAvailableUseCase } from "../../../../domain/usercases/Estoque/CheckAvailable";
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";
import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";


export class checkAvaliable implements Icontrollers{
  private readonly checkAvailableDomain: checkAvailableUseCase

  constructor(checkAvailableDomain: checkAvailableUseCase){
    this.checkAvailableDomain = checkAvailableDomain
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try{
      const requiredField = ['produto', 'quantidade']
        for (const field of requiredField) {
          if(!httpRequest.body[field]){
            return badRequest(Error('Missing param ' + field ) )
          }
        }
        const {produto, quantidade }: StockEntry = httpRequest.body
        const response = await this.checkAvailableDomain.check(produto, quantidade)
        return ok(response)
      } catch (error) {
        return serverError(error)
      }
  }
}