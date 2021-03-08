import { CompareEncryptedData } from "../Protocols/compareEncryptedData";
import bcrypt from 'bcryptjs'

export class decryptData implements CompareEncryptedData{
  async compare(value: string, hashedValue: string): Promise<boolean>{
    try {
      return await bcrypt.compare(value, hashedValue)
    } catch (error) {
      throw new Error(error)
    }
  }
}