

export interface CompareEncryptedData{
  compare(value: string, hashedValue: string):Promise<boolean>
}