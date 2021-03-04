
export interface StockEntry{
  produto: number,
  quantidade: number
}

export interface addEstoqueCase{
  add(produto: number, quantidade: number):Promise<boolean>
}