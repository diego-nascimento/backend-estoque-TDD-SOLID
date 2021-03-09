import { IUser } from '../../../../domain/model/user'
import {ICreateSection, IcreateSectionEntry, IcreateSectionReturn} from '../../../../domain/usercases/Section/createSection'
import { CompareEncryptedData } from '../../../../infra/Encrypt/Protocols/compareEncryptedData'
import { generateJWT } from '../../../../infra/JsonWebToken/protocols/generate'
import { IsearchUser } from '../../../protocols/Section/searchUser'

export class createSectionData implements ICreateSection{
  private readonly searchUser: IsearchUser
  private readonly checkPassword: CompareEncryptedData
  private readonly generateJWT: generateJWT

  constructor(searchUser: IsearchUser, checkPassword: CompareEncryptedData, generate: generateJWT){
    this.searchUser = searchUser
    this.checkPassword = checkPassword
    this.generateJWT = generate
  }
  async createSection(data: IcreateSectionEntry): Promise<IcreateSectionReturn>{
     const user:  IUser = await this.searchUser.search(data.login)
     if(!user.password || ! await this.checkPassword.compare(data.password, user.password)){
       throw new Error('User or password do not exists')
     }
     const token = this.generateJWT.generate(data.login)
     return {
       token
     }
  }
}