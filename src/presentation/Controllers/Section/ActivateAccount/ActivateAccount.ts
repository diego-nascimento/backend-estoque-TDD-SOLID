import { ActivateAccountUseCase } from "../../../../domain/usercases/Section/ActivationAccount";
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";
import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";


export class ActivateControllerPresentation implements Icontrollers{
  private readonly ActivateACcountData: ActivateAccountUseCase

  constructor(activateAccount: ActivateAccountUseCase){
    this.ActivateACcountData = activateAccount
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFields = ['code']
      for (const field of requiredFields) {
        if(!httpRequest.query || !httpRequest.query[field]){
          return badRequest(Error('Missing Param: ' + field))
        }
      }
     
    const code = httpRequest.query.code
    const response = await this.ActivateACcountData.activate(code)
    if(!response){
      throw new Error('Error on activating Account')
    }
    return ok(response)
    } catch (error) {
      return serverError(error)
    }

  }
}