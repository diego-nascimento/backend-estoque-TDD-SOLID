import { checkAvailableUseCase } from '../../../domain/usercases/Estoque/CheckAvailable';
import {checkAvailableRepository} from '../../protocols/Estoque/ckeckAvailableRepository'

export class dbCheckAvailable implements checkAvailableUseCase{
  private checkAvailableRepo: checkAvailableRepository

  constructor(checkAvailableRepo: checkAvailableRepository){
    this.checkAvailableRepo = checkAvailableRepo
  }

  async check(produto: number, quantidade: number):Promise<boolean>{
    return this.checkAvailableRepo.check(produto, quantidade)
  }
}