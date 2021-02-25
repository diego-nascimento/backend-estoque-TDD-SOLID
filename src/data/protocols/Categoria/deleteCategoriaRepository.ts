

export interface deleteCategoriaRepository{
  delete(categoria_id: number): Promise<boolean>
}