import { removeEstoqueUseCase } from "../../../domain/usercases/Estoque/RemoveEstoque";
import { removeEstoqueRepository } from "../../protocols/Estoque/removeEstoqueRepository";


export class dbRemoveEstoque implements removeEstoqueUseCase{
  private readonly removeEstoqueRepo: removeEstoqueRepository

  constructor(removeEstoqueRepo: removeEstoqueRepository){
    this.removeEstoqueRepo = removeEstoqueRepo
  }
  async remove(produto: number, quantidade: number): Promise<boolean>{
    return await this.removeEstoqueRepo.remove(produto, quantidade)
  }
}