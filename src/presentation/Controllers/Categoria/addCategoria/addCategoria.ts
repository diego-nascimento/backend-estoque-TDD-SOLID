import {Icontrollers, ok, httpRequest, httpResponse, addCategoriauseCase, serverError, badRequest} from './protocols'


export class addCategoria implements Icontrollers {
  private CategoriaUseCases: addCategoriauseCase;

  constructor(useCases: addCategoriauseCase ){
    this.CategoriaUseCases = useCases;
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFiles = ['name', 'photo']

    for (const field of requiredFiles) {
      if (!httpRequest.body[field]) {
        return badRequest( Error('Parametros faltando: ' + field))
      }
    }
    
    const {name, photo} = httpRequest.body
    const categoria = await this.CategoriaUseCases.handle({
      name, photo: photo
    })

    return ok(categoria)
    } catch (error) {
      return serverError(error)
    }
    
  }
}