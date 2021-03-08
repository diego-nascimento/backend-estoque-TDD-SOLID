import { Icontrollers } from "../../../protocols/controllers";
import { httpRequest, httpResponse } from "../../../protocols/http";
import {SignUpUseCase, SignUpEntry} from '../../../../domain/usercases/Section/SignUp'
import { badRequest, ok, serverError } from "../../../helpers/http-helpers";


export class SignUpPresentation implements Icontrollers{
  private readonly SignUpUseCase: SignUpUseCase

  constructor(signUpUseCase: SignUpUseCase){
    this.SignUpUseCase = signUpUseCase
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requiredFields = ['nome', 'password', 'email']
      for (const field of requiredFields) {
        if(!httpRequest.body[field]){
          return badRequest(Error('Missing Param: ' + field))
        }
      }
      const data :SignUpEntry = {
        email: httpRequest.body.email,
        password: httpRequest.body.password,
        userName: httpRequest.body.nome
      }
      const response = await this.SignUpUseCase.signUp(data)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}