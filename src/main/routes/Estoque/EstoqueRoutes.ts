import {Router} from 'express'
import {addEstoqueFactory, checkAvailableFactory, removeEstoqueFactory, countEstoqueFactory} from '../factoryProdutocols'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'



const route = Router()

route.post('/stock/restock', adaptRoutes(addEstoqueFactory()))
route.get('/stock/produto', adaptRoutes(checkAvailableFactory()))
route.post('/stock/remove', adaptRoutes(removeEstoqueFactory()))
route.get('/stock/amount', adaptRoutes(countEstoqueFactory()))



export default route