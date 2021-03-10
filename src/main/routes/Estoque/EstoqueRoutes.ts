import {Router} from 'express'
import {addEstoqueFactory, checkAvailableFactory, removeEstoqueFactory, countEstoqueFactory, AuthMidwareFactory} from '../factoryProdutocols'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import { adaptMidware } from '../../adapters/expresse-midware-adapter'



const route = Router()

route.post('/stock/restock',adaptMidware(AuthMidwareFactory()), adaptRoutes(addEstoqueFactory()))
route.get('/stock/produto', adaptRoutes(checkAvailableFactory()))
route.post('/stock/remove',adaptMidware(AuthMidwareFactory()), adaptRoutes(removeEstoqueFactory()))
route.get('/stock/amount', adaptRoutes(countEstoqueFactory()))



export default route