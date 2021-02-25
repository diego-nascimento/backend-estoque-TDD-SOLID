import { httpRequest, httpResponse } from "./http";

export interface Icontrollers{
  handle(httpRequest: httpRequest): Promise<httpResponse>
}