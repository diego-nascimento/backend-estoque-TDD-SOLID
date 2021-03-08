import {Router} from 'express'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import {signUpFactory, ActivateAccountFactory} from '../factoryProdutocols'



const route = Router()

route.post('/signup', adaptRoutes(signUpFactory()))
route.get('/email_confirmation', adaptRoutes(ActivateAccountFactory()))


export default route