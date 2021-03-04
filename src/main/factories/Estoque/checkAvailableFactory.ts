import {checkAvailableInfra, checkAvaliable, dbCheckAvailable} from '../protocols'

export const checkAvailableFactory = ()=>{
  const CheckAvailableInfra = new checkAvailableInfra
  const checkAvailableData = new dbCheckAvailable(CheckAvailableInfra)
  return new checkAvaliable(checkAvailableData)
}