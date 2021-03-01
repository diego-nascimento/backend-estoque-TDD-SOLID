import {httpResponse, serverError,ok, httpRequest, Icontrollers, badRequest, ListProdutosCategoria} from './protocols'

export class ListProdutoCategoria implements Icontrollers{
  private readonly listProdutoCategoriauseCase: ListProdutosCategoria

  constructor(listProdutoCategoruauseCase: ListProdutosCategoria){
    this.listProdutoCategoriauseCase = listProdutoCategoruauseCase
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      let page = 1
      if(httpRequest.params && httpRequest.params.page !== undefined){
        page = parseInt(httpRequest.params.page)
      }
      if(!httpRequest.body['categoria']){
        return badRequest(Error('Missing param: Categoria'))
      }
      const {categoria} = httpRequest.body

      const response = await this.listProdutoCategoriauseCase.list(categoria, page)
      return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}