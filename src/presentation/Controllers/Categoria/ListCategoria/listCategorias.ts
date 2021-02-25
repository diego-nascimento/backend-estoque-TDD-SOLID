import { serverError } from '../addCategoria/protocols';
import {Icontrollers, httpResponse, httpRequest, ListCategorias, ok} from './protocols'

export class ListCategoria implements Icontrollers{
  private listCategoriaUseCase: ListCategorias

  constructor(listCategoriaUseCase: ListCategorias){
    this.listCategoriaUseCase = listCategoriaUseCase
  }

  async handle(httpRequest: httpRequest):Promise<httpResponse>{
    try {
      const response = await this.listCategoriaUseCase.handle();
      return ok(response);
    } catch (error) {
      return serverError(error)
    }
    
  }
}