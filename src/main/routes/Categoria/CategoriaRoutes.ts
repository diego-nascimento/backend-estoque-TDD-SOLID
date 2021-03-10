import {Router} from 'express'
import {ListCategoriaFactory, addCategoriaFactory, deleteCategoriaFactory, updateCategoriaFactory} from '../factoryProdutocols'
import {adaptRoutes} from '../../adapters/expresse-route-adapter'
import { adaptMidware } from '../../adapters/expresse-midware-adapter'
import { AuthMidwareFactory } from '../../factories/Section/Authentication'

const route = Router()

route.post('/categoria',adaptMidware(AuthMidwareFactory()), adaptRoutes(addCategoriaFactory()))
route.get('/categorias', adaptRoutes(ListCategoriaFactory()))
route.put('/categoria/:id',adaptMidware(AuthMidwareFactory()), adaptRoutes(updateCategoriaFactory()))
route.delete('/categoria/:id', adaptMidware(AuthMidwareFactory()),adaptRoutes(deleteCategoriaFactory()))

export default route