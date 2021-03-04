import { addEstoqueRepository } from "../../../../data/protocols/Estoque/addEstoqueRepository";
import { StockEntry } from "../../../../domain/usercases/Estoque/AddEstoque";
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";
import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";

export class addEstoque implements Icontrollers{
  private readonly addEstoqueData: addEstoqueRepository

  constructor(addEstoqueData: addEstoqueRepository){
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
      const response = await this.addEstoqueData.add(produto, quantidade)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}