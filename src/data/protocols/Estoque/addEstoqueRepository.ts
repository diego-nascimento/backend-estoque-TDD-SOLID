

export interface addEstoqueRepository{
  add(produto: number, quantidade: number):Promise<boolean>
}