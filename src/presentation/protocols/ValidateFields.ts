import { httpRequest } from "./http";

export interface IValidadeField{
  validate(data: httpRequest):Promise<boolean> 
}