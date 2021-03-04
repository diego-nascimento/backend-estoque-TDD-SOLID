export interface countEstoqueRepository{
  count(produto: number): Promise<number>
}