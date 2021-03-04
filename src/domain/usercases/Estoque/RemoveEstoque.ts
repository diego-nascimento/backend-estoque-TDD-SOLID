

export interface removeEstoqueUseCase{
  remove(produto: number, quantidade: number):Promise<boolean>
}