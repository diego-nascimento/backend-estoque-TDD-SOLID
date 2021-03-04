
export interface checkAvailableUseCase{
  check(produto: number, quantidade: number):Promise<boolean>
}