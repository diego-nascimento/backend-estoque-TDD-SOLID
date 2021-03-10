import {Router} from 'express'
import {ListPhotoFactory, addPhotoFactory, deletePhotoFactory, getPhotoFactory, AuthMidwareFactory} from '../factoryProdutocols'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import {adaptMidware} from '../../adapters/expresse-midware-adapter'
import multerConfig from '../../midwares/multer'
import multer from 'multer'


const route = Router()


route.post('/photo',multer(multerConfig).single('photo'), adaptMidware(AuthMidwareFactory()),  adaptRoutes( addPhotoFactory()))
route.delete('/photo/:id',adaptMidware(AuthMidwareFactory()), adaptRoutes( deletePhotoFactory()))
route.get('/photos', adaptRoutes( ListPhotoFactory()))
route.get('/photo/:id', adaptRoutes(getPhotoFactory()))

export default route