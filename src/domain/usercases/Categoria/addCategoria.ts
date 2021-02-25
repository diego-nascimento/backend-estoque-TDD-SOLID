import {Icategoria} from '../../model/categoria'

export interface ICategoriaEntry{
  name: string,
  photo: number
}

export  interface addCategoriauseCase{
  handle (categoria: ICategoriaEntry): Promise<Icategoria>
}
