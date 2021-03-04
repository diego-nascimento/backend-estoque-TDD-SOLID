import { removeEstoqueRepository } from "../../../../data/protocols/Estoque/removeEstoqueRepository";
import { StockEntry } from "../../../../domain/usercases/Estoque/AddEstoque";
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";
import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";

export class removeEstoque implements Icontrollers{
  private readonly addEstoqueData: removeEstoqueRepository

  constructor(addEstoqueData: removeEstoqueRepository){
    this.addEstoqueData = addEstoqueData
  }
  
  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredField = ['produto', 'quantidade']
      for (const field of requiredField) {
        if(!httpRequest.body[field]){
          return badRequest(Error('Missing param ' + field ) )
        }
      }
      const {produto, quantidade }: StockEntry = httpRequest.body
      const response = await this.addEstoqueData.remove(produto, quantidade)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}