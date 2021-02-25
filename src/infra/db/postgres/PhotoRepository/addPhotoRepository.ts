import { IPhoto } from '../../../../domain/model/Photo';
import { IPhotoEntry } from '../../../../domain/usercases/Photo/addPhoto';
import {addPhotoRepository} from './protocols'
import {PrismaClient} from '@prisma/client'

const Prisma = new PrismaClient()

export class addPhotoPostGres implements addPhotoRepository{
  async add(photo: IPhotoEntry): Promise<IPhoto>{

    const result = await Prisma.photo.create({
      data:photo
    })
    const response: IPhoto = {
      id: result.id,
      url: result.url,
    }
    return response
  }
}