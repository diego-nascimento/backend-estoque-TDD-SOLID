import { Icategoria } from '../../../../domain/model/categoria'
import {addCategoriauseCase, ICategoriaEntry} from '../../../../domain/usercases/Categoria/addCategoria'
import {addCategoriaRepository} from '../../../protocols/Categoria/addCategoriaRepository'


export class dbAddCategoria implements addCategoriauseCase{
  private addCategoriaDB: addCategoriaRepository;

  constructor(addCategoriaDB: addCategoriaRepository){
    this.addCategoriaDB = addCategoriaDB;
  }

  async handle(categoria: ICategoriaEntry):Promise<Icategoria>{
      const response : Icategoria = await this.addCategoriaDB.add(categoria);
      return response
  }
}