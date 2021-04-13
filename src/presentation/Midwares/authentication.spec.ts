import {Auth} from './Authentication'
import {IAuth} from '../../domain/usercases/Section/Authentication'
import { httpRequest } from '../protocols/http'

const makeslug = ()=>{
  class slug implements IAuth{
    async auth (access_code:string):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('Authentication', ()=>{
  test('Should return 400 if no access_token is provided', async () =>{
    const slug = makeslug()
    const sut = new Auth(slug)

    const httpRequest:httpRequest ={
      headers:{

      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({"Error": "Access Denied"})
  })

})