import { Icategoria } from '../../../../domain/model/categoria';
import { ICategoriaEntry } from '../../../../domain/usercases/Categoria/addCategoria';
import {updateCategoriaCase} from '../../../../domain/usercases/Categoria/updateCategoria'
import {updateCategoriaRepository} from '../../../protocols/Categoria/updateCategoriaRepository'

export class dbUpdateCategoria implements  updateCategoriaCase{
  private updateCategoriaRepo: updateCategoriaRepository

  constructor(updateCategoriaRepo: updateCategoriaRepository){
    this.updateCategoriaRepo = updateCategoriaRepo
  }

  async handle(categoria_id: number, categoria: ICategoriaEntry): Promise<Icategoria>{
    return await this.updateCategoriaRepo.update(categoria_id, categoria)
  }
}