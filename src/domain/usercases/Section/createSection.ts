
export interface IcreateSectionEntry{
  login: string,
  password: string
}

export interface IcreateSectionReturn{
  token?: string
  status: number
}

export interface ICreateSection{
  createSection(data: IcreateSectionEntry): Promise<IcreateSectionReturn>
}