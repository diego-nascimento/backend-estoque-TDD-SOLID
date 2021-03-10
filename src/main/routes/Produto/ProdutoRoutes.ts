import {Router} from 'express'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import {addProdutoFactory, listProdutoFactory, ListProdutoCategoriaFactory, getProdutoFactory, updateProdutoFactory, deleteProdutoFactory, AuthMidwareFactory} from '../factoryProdutocols'
import {adaptMidware} from '../../adapters/expresse-midware-adapter'

const route = Router()

route.post('/produto', adaptMidware(AuthMidwareFactory()), adaptRoutes(addProdutoFactory()))
route.get('/produtos/:page', adaptRoutes(listProdutoFactory()))
route.get('/categoria/produtos/:page',adaptRoutes(ListProdutoCategoriaFactory()))
route.get('/produto/:produto', adaptRoutes(getProdutoFactory()))
route.put('/produto/:id', adaptMidware(AuthMidwareFactory()),adaptRoutes(updateProdutoFactory()))
route.delete('/produto/:id',adaptMidware(AuthMidwareFactory()),  adaptRoutes(deleteProdutoFactory()))

export default route