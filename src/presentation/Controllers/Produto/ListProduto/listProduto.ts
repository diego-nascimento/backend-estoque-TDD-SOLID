import {Icontrollers, ListProdutouseCase, httpRequest, ok, serverError, httpResponse} from './protocols'


export class ListProduto implements Icontrollers{
  private readonly listProdutouseCase: ListProdutouseCase

  constructor(listProdutouseCase: ListProdutouseCase){
    this.listProdutouseCase = listProdutouseCase
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      let page: number = 1
      if(httpRequest.params && httpRequest.params.page !== undefined){
        page = httpRequest.params['page']
      }
      const response = await this.listProdutouseCase.list(page)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}