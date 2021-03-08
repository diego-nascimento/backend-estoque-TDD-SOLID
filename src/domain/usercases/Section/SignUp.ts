import { IUser } from "../../model/user";

export interface SignUpEntry{
  email: string,
  userName: string,
  password: string
}

export interface SignUpUseCase{
  signUp({userName, email, password}: SignUpEntry): Promise<IUser>
}