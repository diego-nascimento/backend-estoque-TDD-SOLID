import {ActivateAccount, ActivateAccountDB, ActivateControllerPresentation} from '../protocols'

export const ActivateAccountFactory =  ()=>{
  const ActivateAccountInfra = new ActivateAccountDB
  const ActivateAccountData = new ActivateAccount(ActivateAccountInfra)
  return new ActivateControllerPresentation(ActivateAccountData)
}