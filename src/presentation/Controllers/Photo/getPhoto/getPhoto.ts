import { getPhotouseCase } from "../../../../domain/usercases/Photo/getPhoto";
import { badRequest, httpRequest, httpResponse, Icontrollers, ok, serverError } from "../addPhoto/protocols";


export class getPhoto implements Icontrollers{
  private getPhotouseCase: getPhotouseCase

  constructor(getPhotouseCase: getPhotouseCase){
    this.getPhotouseCase = getPhotouseCase
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      if(httpRequest.params.id === undefined){
        return badRequest(Error('Missing Param: id'))
       }
       const id: number = parseInt(httpRequest.params.id)
       const response = await this.getPhotouseCase.get(id)
       return ok(response)
    } catch (error) {
      return serverError(error)
    }
    
  }
}