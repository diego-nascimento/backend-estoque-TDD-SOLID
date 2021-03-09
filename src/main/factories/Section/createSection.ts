import {createSectionData, createSectionPresentation, searchUserPostGres} from '../protocols'
import {GenerateJWT} from '../../../infra/JsonWebToken/useCase/generate'
import {decryptData} from '../../../infra/Encrypt/useCases/compareEncryptedDataImp'

export const createSectionFactory = () =>{
  const searchUserInfra = new searchUserPostGres()
  const generateInfra = new GenerateJWT()
  const comparePassword = new decryptData()
  const createSectionD = new createSectionData(searchUserInfra, comparePassword, generateInfra)
  return new createSectionPresentation(createSectionD)
}