import {Router} from 'express'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import {addProdutoFactory, listProdutoFactory, ListProdutoCategoriaFactory, getProdutoFactory, updateProdutoFactory, deleteProdutoFactory} from '../factoryProdutocols'



const route = Router()

route.post('/produto', adaptRoutes(addProdutoFactory()))
route.get('/produtos/:page', adaptRoutes(listProdutoFactory()))
route.get('/categoria/produtos/:page',adaptRoutes(ListProdutoCategoriaFactory()))
route.get('/produto/:produto', adaptRoutes(getProdutoFactory()))
route.put('/produto/:id', adaptRoutes(updateProdutoFactory()))
route.delete('/produto/:id', adaptRoutes(deleteProdutoFactory()))

export default route