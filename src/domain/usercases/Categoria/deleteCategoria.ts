export interface deleteCategoriauseCase{
  handle(categoria_id: number): Promise<boolean>
}