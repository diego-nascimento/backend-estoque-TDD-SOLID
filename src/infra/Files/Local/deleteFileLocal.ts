import fs from 'fs';
import {IdeleteFile} from '../protocols'
import path from 'path'

export class deleteFile implements IdeleteFile{
  delete(fileName: string): boolean{
    try {
      fs.unlinkSync(path.resolve(__dirname, '..', 'uploads', fileName))
      return true
    } catch (error) {
      throw new Error(error)
    }
  }

}

