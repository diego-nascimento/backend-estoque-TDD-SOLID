
export interface checkAvailableRepository{
  check(produto: number, quantidade: number):Promise<boolean>
}