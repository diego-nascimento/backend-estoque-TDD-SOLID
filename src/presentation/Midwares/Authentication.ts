import { IAuth } from "../../domain/usercases/Section/Authentication";
import { forbidden, ok, serverError } from "../helpers/http-helpers";
import { httpRequest, httpResponse } from "../protocols/http";
import { IMidwares } from "../protocols/middlewares";

export class Auth implements IMidwares{
  private readonly authentication: IAuth

  constructor(authentication: IAuth){
    this.authentication = authentication
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const access_code = httpRequest.headers['x-access-token']
    if(access_code){
      const response = await this.authentication.auth(access_code)
      if(response){
        return ok(response);
      }
    }
    return forbidden()
    } catch (error) {
      return forbidden()
    }
    
  }
}