import {Request, Response} from 'express'
import { Icontrollers } from '../../presentation/protocols/controllers'
import { httpRequest, httpResponse } from '../../presentation/protocols/http'

export const adaptRoutes =  (controller: Icontrollers) =>{
  return async (req: Request, res: Response)=>{
    const httpRequest: httpRequest = {
      body: req.body,
      file: req.file,
      params: req.params,
      query: req.query,
      headers: req.headers
    }
    const httpResp: httpResponse = await controller.handle(httpRequest)
    return res.status(httpResp.statusCode).json(httpResp.body)
  }
  

}