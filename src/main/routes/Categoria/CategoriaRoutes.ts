import {Router} from 'express'
import {ListCategoriaFactory, addCategoriaFactory, deleteCategoriaFactory, updateCategoriaFactory} from '../factoryProdutocols'
import {adaptRoutes} from '../../adapters/expresse-route-adapter'

const route = Router()

route.post('/categoria', adaptRoutes(addCategoriaFactory()))
route.get('/categorias', adaptRoutes(ListCategoriaFactory()))
route.put('/categoria/:id', adaptRoutes(updateCategoriaFactory()))
route.delete('/categoria/:id', adaptRoutes(deleteCategoriaFactory()))

export default route