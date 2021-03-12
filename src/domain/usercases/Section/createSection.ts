import { IUser } from "../../model/user";

export interface IcreateSectionEntry{
  login: string,
  password: string
}

export interface IcreateSectionReturn{
  token?: string
  status: number
  user?: IUser
}

export interface ICreateSection{
  createSection(data: IcreateSectionEntry): Promise<IcreateSectionReturn>
}