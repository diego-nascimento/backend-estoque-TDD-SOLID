import {Router} from 'express'
import {ListPhotoFactory, addPhotoFactory, deletePhotoFactory, getPhotoFactory} from '../factoryProdutocols'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'

import multerConfig from '../../midwares/multer'
import multer from 'multer'


const route = Router()


route.post('/photo',multer(multerConfig).single('photo'),  adaptRoutes( addPhotoFactory()))
route.delete('/photo/:id', adaptRoutes( deletePhotoFactory()))
route.get('/photos', adaptRoutes( ListPhotoFactory()))
route.get('/photo/:id', adaptRoutes(getPhotoFactory()))

export default route