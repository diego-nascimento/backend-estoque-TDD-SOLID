import { addEstoqueCase } from "../../../../domain/usercases/Estoque/AddEstoque";
import { addEstoqueRepository } from "../../../protocols/Estoque/addEstoqueRepository";


export class dbAddEstoque implements addEstoqueCase{
  private readonly addStockRepo: addEstoqueRepository

  constructor(addStockRepo: addEstoqueRepository){
    this.addStockRepo = addStockRepo
  }
  async add(produto: number, quantidade: number):Promise<boolean>{
    return await this.addStockRepo.add(produto, quantidade)
  }
}