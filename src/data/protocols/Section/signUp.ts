import { IUser } from "../../../domain/model/user";


export interface SignUpRepository{
  signUp(login: string, email: string, password: string, email_hash: string): Promise<IUser>
}