import {signUpInfra, SignUp, SignUpPresentation} from '../protocols' 
import {encrypt} from '../../../infra/Encrypt/useCases/encryptDataImp'
import {sendMailImplementation} from '../../../infra/Email/userCase/sendMail'

export const signUpFactory = ()=>{
  const signUpInf = new signUpInfra()
  const encryptData = new encrypt()
  const sendMail = new sendMailImplementation()
  const signUpData = new SignUp(signUpInf, encryptData, sendMail)
  return new SignUpPresentation(signUpData)
}