import { IUser } from "../../model/user";



export interface IAuth{
  auth(access_code: string):Promise<IUser>
}