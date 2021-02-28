
export interface deleteProduto{
  delete(produto: number): Promise<boolean>
}