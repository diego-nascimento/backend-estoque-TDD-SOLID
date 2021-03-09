import { IUser } from "../../../domain/model/user";
import { IcreateSectionEntry } from "../../../domain/usercases/Section/createSection";


export interface IsearchUser {
  search(login: string): Promise<IUser>
}