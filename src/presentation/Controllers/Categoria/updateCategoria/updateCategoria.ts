import {Icontrollers, badRequest, httpRequest, ok, serverError, httpResponse, updateCategoriaCase} from './protocols'


export class updateCategoria implements Icontrollers{
  private updateCategoriauseCase : updateCategoriaCase

  constructor(updateCategoriauseCase : updateCategoriaCase){
    this.updateCategoriauseCase = updateCategoriauseCase;
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse> {
   try {
    const fieldRequired = ['name', 'photo']
    for (const field of fieldRequired) {
      if(!httpRequest.body[field]){
        return badRequest(Error('Parametros faltando: ' + field))
      }
    }

    if(!httpRequest.params){
      return badRequest(Error('Parametros faltando: id'))
    }

    if(httpRequest.params['id'] === undefined){
      return badRequest(Error('Parametros faltando: id'))
    }

    const {name, photo} = httpRequest.body
    const categoria_id: number =  parseInt(httpRequest.params.id, 10);

    const response = await this.updateCategoriauseCase.handle(categoria_id, {name, photo})
    return ok(response)
   } catch (error) {
     return serverError(error)
   }
  }
}