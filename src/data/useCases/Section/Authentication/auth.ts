import { IAuth } from "../../../../domain/usercases/Section/Authentication";
import {IverifyToken} from '../../../../infra/JsonWebToken/protocols/verify'
import {IsearchUser} from '../../../../data/protocols/Section/searchUser'

export class AuthenticationData implements IAuth{
  private readonly verifyToken: IverifyToken
  private readonly searchUser: IsearchUser

  constructor(verifyToken:IverifyToken, searchUser:IsearchUser){
    this.verifyToken = verifyToken
    this.searchUser = searchUser
  }
  async auth(access_code:string):Promise<boolean>{
    const decoded = this.verifyToken.verify(access_code)
    const user = this.searchUser.search('teste')
    return user? true: false
  }
}