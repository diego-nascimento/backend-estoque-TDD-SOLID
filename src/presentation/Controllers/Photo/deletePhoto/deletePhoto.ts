import {Icontrollers, httpRequest, serverError, badRequest, ok, httpResponse, deletePhotoCase} from './protocols'

export class deletePhoto implements Icontrollers{
  private DeletePhotoCase: deletePhotoCase

  constructor(deleteUseCase: deletePhotoCase){
    this.DeletePhotoCase = deleteUseCase
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFields = ['id']

    for (const field of requiredFields) {
      if(!httpRequest.params[field]){
        return badRequest(Error('Missing Param: ' + field))
      }
    }
    const id: number = parseInt(httpRequest.params.id, 10)


    const response = await this.DeletePhotoCase.handle(id)
    return ok(response)
    } catch (error) {
      return serverError(error)
    }
    
  }
}