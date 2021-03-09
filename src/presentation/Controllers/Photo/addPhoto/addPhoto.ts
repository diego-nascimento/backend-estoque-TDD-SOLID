import {addPhotoCase ,IPhoto, badRequest,httpRequest, httpResponse, ok, serverError, Icontrollers} from './protocols'

export class addPhoto implements Icontrollers{
  private PhotoUseCase: addPhotoCase

  constructor(photoUseCase: addPhotoCase){
    this.PhotoUseCase = photoUseCase;
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      if(!httpRequest.file){
        return badRequest(Error('Nenhum arquivo foi enviado'))
      }else{
        const requiredFields = ['location'] 
        for (const field of requiredFields) {
          if(httpRequest.file[field] === undefined){
            return badRequest(Error('Nenhum arquivo foi enviado'))
          }
        }
      }
    const url = httpRequest.file.location
    const key: string = httpRequest.file.key
    const response: IPhoto = await this.PhotoUseCase.handle({
      url,
    }, key)
    return ok(response)
    } catch (error) {
      return serverError(error)
    }
    
  }
}