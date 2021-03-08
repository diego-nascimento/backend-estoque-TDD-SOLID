import {deleteCategoriauseCase} from '../../../../domain/usercases/Categoria/deleteCategoria'
import {deleteCategoriaRepository} from  '../../../protocols/Categoria/deleteCategoriaRepository'

export class dbDeleteCategoria implements deleteCategoriauseCase{
  private deleteCategoriaDB : deleteCategoriaRepository

  constructor(deleteCategoriaDB: deleteCategoriaRepository){
    this.deleteCategoriaDB = deleteCategoriaDB
  }

  async handle(categoria_id: number): Promise<boolean>{
    return await this.deleteCategoriaDB.delete(categoria_id)
  }
}