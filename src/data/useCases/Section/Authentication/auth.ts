import { IAuth } from "../../../../domain/usercases/Section/Authentication";
import {IverifyToken} from '../../../../infra/JsonWebToken/protocols/verify'
import {IsearchUser} from '../../../../data/protocols/Section/searchUser'
import { IUser } from "../../../../domain/model/user";

export class AuthenticationData implements IAuth{
  private readonly verifyToken: IverifyToken
  private readonly searchUser: IsearchUser

  constructor(verifyToken:IverifyToken, searchUser:IsearchUser){
    this.verifyToken = verifyToken
    this.searchUser = searchUser
  }
  async auth(access_code: string): Promise<IUser>{
    const decoded = this.verifyToken.verify(access_code)
    
    const user:IUser = await this.searchUser.search(decoded)
    return {
      email: user.email,
      nome: user.nome
    }
  }
}