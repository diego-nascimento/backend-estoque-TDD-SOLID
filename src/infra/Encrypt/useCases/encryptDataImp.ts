import { IencryptData } from "../Protocols/encryptData";
import bcrypt from 'bcryptjs'


export class encrypt implements IencryptData{
  async encrypt(value: string): Promise<string>{
    try {
      const response = await bcrypt.hash(value, 10);
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}