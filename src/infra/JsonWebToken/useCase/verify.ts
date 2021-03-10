import {IverifyToken} from '../protocols/verify'
import jwt from 'jsonwebtoken'

export class verify implements IverifyToken{
  verify(token: string):string{
    try {
      const decoded = jwt.verify(token, '12q3w1ew23q1e21qw13e1q23w1e2q13e15qw4e545q6e46q46we64q4we4qw56e46qw4e') 
      const user: string = decoded.toString()

      return user
    } catch (error) {
      throw new Error('Token Invalid')
    }
  }
}