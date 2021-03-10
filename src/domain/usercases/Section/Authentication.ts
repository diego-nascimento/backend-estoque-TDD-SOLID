


export interface IAuth{
  auth(access_code: string):Promise<boolean>
}