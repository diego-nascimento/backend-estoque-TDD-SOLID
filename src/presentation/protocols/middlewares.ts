import { httpRequest, httpResponse } from "./http";

export interface IMidwares{
  handle(httpRequest: httpRequest): Promise<httpResponse>
}