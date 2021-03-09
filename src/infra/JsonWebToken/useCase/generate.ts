import { generateJWT } from "../protocols/generate";
import jwt from 'jsonwebtoken'
import 'dotenv'

const secret = process.env.SECRET

export class GenerateJWT implements generateJWT{
  generate(value: string):string{
    return jwt.sign({id: value}, '12q3w1ew23q1e21qw13e1q23w1e2q13e15qw4e545q6e46q46we64q4we4qw56e46qw4e',{expiresIn: '1d'} )
  }
}