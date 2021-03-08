import { Icategoria } from '../../../../domain/model/categoria';
import {ListCategorias} from '../../../../domain/usercases/Categoria/ListCategorias'
import {ListCategoriasRepository} from '../../../protocols/Categoria/listCategoriaRepository'


export class dbListCategoria implements ListCategorias{
  private ListCategoriaRepo: ListCategoriasRepository

  constructor(ListCategoriaRepo: ListCategoriasRepository){
    this.ListCategoriaRepo = ListCategoriaRepo;
  }

  async handle(): Promise<Array<Icategoria>>{
    return await this.ListCategoriaRepo.List()
  }
}