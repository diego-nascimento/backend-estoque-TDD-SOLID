import {Router} from 'express'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import {addProdutoFactory} from '../factoryProdutocols'

const route = Router()

route.post('/produto', adaptRoutes(addProdutoFactory()))

export default route