
import { httpRequest, httpResponse, Icontrollers, ok, serverError, listPhotosUseCase } from "./protocols";


export class ListPhotos implements Icontrollers{
  private ListPhotoUseCase : listPhotosUseCase

  constructor(ListPhotoUseCase: listPhotosUseCase){
    this.ListPhotoUseCase = ListPhotoUseCase
  }
  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const response = await this.ListPhotoUseCase.handle()
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}