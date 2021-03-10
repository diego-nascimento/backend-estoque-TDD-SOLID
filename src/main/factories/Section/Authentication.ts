import {Auth, AuthenticationData} from '../protocols'
import {searchUserPostGres} from '../../../infra/db/postgres/Section/SearchUser'
import {verify} from '../../../infra/JsonWebToken/useCase/verify'



export const AuthMidwareFactory = () =>{
  const search = new searchUserPostGres()
  const verifyToken = new verify()
  const AuthData = new AuthenticationData(verifyToken, search)
  return new Auth(AuthData)
}