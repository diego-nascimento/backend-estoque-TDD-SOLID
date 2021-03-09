import {ActivateAccountUseCase} from '../../../../domain/usercases/Section/ActivationAccount'
import { ActivateAccountRepository } from '../../../protocols/Section/ActivateAccount'

export class ActivateAccount implements ActivateAccountUseCase{
  private readonly ActivateAccountRepo: ActivateAccountRepository

  constructor(activateAccountRepo: ActivateAccountRepository){
    this.ActivateAccountRepo = activateAccountRepo
  }

  
  async activate(code: string): Promise<boolean>{
    try {
      return await this.ActivateAccountRepo.activate(code)
    } catch (error) {
      throw new Error(error)
    }
  }
}