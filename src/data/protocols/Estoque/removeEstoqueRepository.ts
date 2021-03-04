

export interface removeEstoqueRepository{
  remove(produto: number, quantidade: number):Promise<boolean>
}