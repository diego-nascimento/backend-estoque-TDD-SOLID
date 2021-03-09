import { CountEstoque } from "../../../../domain/usercases/Estoque/AmoutEstoque";
import { countEstoqueRepository } from "../../../protocols/Estoque/countEstoqueRepository";


export class dbCountEstoque implements CountEstoque{
  private countEstoque: countEstoqueRepository

  constructor(countEstoqueRepo: countEstoqueRepository){
    this.countEstoque = countEstoqueRepo
  }

  async Count(produto:number):Promise<number>{
    return this.countEstoque.count(produto)
  }
}