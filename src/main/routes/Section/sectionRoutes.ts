import {Router} from 'express'
import { adaptRoutes } from '../../adapters/expresse-route-adapter'
import {signUpFactory, ActivateAccountFactory, createSectionFactory, AuthMidwareFactory} from '../factoryProdutocols'

const route = Router()

route.post('/signup', adaptRoutes(signUpFactory()))
route.get('/email_confirmation', adaptRoutes(ActivateAccountFactory()))
route.post('/signin', adaptRoutes(createSectionFactory()))
route.get('/auth', adaptRoutes(AuthMidwareFactory()))

export default route