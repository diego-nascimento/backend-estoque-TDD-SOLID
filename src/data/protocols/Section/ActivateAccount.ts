
export interface ActivateAccountRepository {
  activate(code: string): Promise<boolean>
}