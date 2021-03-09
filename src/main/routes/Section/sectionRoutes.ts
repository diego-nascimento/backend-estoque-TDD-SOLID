import {Router} from 'express'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import {signUpFactory, ActivateAccountFactory, createSectionFactory} from '../factoryProdutocols'

const route = Router()

route.post('/signup', adaptRoutes(signUpFactory()))
route.get('/email_confirmation', adaptRoutes(ActivateAccountFactory()))
route.post('/signin', adaptRoutes(createSectionFactory()))


export default route