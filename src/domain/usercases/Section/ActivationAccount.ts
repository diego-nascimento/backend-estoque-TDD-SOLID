export interface ActivateAccountUseCase{
  activate(code: string): Promise<boolean>
}