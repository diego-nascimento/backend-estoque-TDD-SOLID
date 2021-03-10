import {NextFunction, Request, Response} from 'express'
import { httpRequest, httpResponse } from '../../presentation/protocols/http'
import { IMidwares } from '../../presentation/protocols/middlewares'

export const adaptMidware =  (midware: IMidwares) =>{
  return async (req: Request, res: Response, next: NextFunction)=>{
    const httpRequest: httpRequest = {
     headers: req.headers
    }
    const httpResp: httpResponse = await midware.handle(httpRequest)
    if(httpResp.statusCode === 200){
      next()
    }else{
      res.status(httpResp.statusCode).json(httpResp.body)
    }
  }
}