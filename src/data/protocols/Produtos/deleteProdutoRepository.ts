
export interface deleteProdutoRepository{
  delete(produto: number): Promise<boolean>
}