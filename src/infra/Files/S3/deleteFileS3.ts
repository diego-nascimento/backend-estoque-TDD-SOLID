import {IdeleteFile} from '../protocols'
import dadosacesso from './config/s3';
import aws from 'aws-sdk';
aws.config.update(dadosacesso);
const s3 = new aws.S3()

export class deleteFileS3 implements IdeleteFile{
  delete(filename:string):boolean{
      s3.deleteObject({Bucket: 'loja-tdd', Key: filename}, (error)=>{
        if(error){
          throw new Error('File could not be deleted')
        }
      })
      return true
  }
}

