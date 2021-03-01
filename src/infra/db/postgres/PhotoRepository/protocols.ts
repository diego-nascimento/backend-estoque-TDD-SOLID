export { IPhoto } from '../../../../domain/model/Photo';
export {PrismaClient} from '@prisma/client'

//add photo
export { IPhotoEntry } from '../../../../domain/usercases/Photo/addPhoto';
export {addPhotoRepository} from '../../../../data/protocols/Photo/addPhotoRepository'

//delete photo
export {deletePhotoRepository} from '../../../../data/protocols/Photo/deletePhotoRepository'

//get Photo
export {getPhotoRepository} from '../../../../data/protocols/Photo/getPhoto'

//list Photos
export {listPhotoRepository} from '../../../../data/protocols/Photo/ListPhotoRepository'

