import {Icontrollers, badRequest, deleteCategoriauseCase, httpRequest,httpResponse, ok, serverError} from './protocols'

export class deleteCategoria implements Icontrollers{
  private deleteCategoriaUse: deleteCategoriauseCase

  constructor(deleteCategoriaUse: deleteCategoriauseCase){
    this.deleteCategoriaUse = deleteCategoriaUse
  }
  async handle(httpRequest: httpRequest):Promise<httpResponse>{
    try {
      if(!httpRequest.params['id']){
        return badRequest(Error('Missing param id'))
      }
      const categoria: number = parseInt(httpRequest.params.id)
      const response: boolean = await this.deleteCategoriaUse.handle(categoria)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  } 
}