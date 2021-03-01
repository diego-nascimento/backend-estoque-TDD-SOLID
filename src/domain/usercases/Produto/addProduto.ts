import { IProduto } from "../../model/produto";

export interface ProdutoPhotoEntry{
  id:number
}


export interface IProdutoEntry{
  name: string,
  description: string,
  resume: string,
  photos: Array<ProdutoPhotoEntry>
  categoria: number
  preco: number
}

export interface addProdutouseCase{
  add(produto: IProdutoEntry): Promise<IProduto>
}