import { timeStamp } from 'console';
import express from 'express'
import route from './routes'

class server{
  public server;
  constructor(){
    this.server = express()
    this.midwares()
    this.routes()
  }

  midwares(){
    this.server.use(express.json())
  }

  routes(){
    this.server.use(route)
  }
}

export default new server().server;